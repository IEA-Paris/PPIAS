import fs from 'fs'
import parseMD from 'parse-md'
import { filterAndMerge, insertDocuments } from '../utils/contentUtilities'

export default async (authors = [], articles, content) => {
  try {
    const chalk = require('chalk')

    let authorsDocuments = await content('authors', { deep: true })
      // .only(['slug']) //TODO complete with only required fields
      .fetch()
    console.log(
      'LAVILLE",',
      authors.find((author) => author.lastname.toUpperCase() === 'LAVILLE')
    )
    console.log('authors1: ', authors.length)

    // extract the authors from articles with backlink
    const { first, second } = filterAndMerge(authors, authorsDocuments)

    // TODO: come up with a global approach for non destructive merge,
    // that could explicitely removed papers that were published but are not anymore
    // or X other reason why it should be marked as from this author anymore)
    console.log(
      'LAVILLE2",',
      first.find((author) => author.lastname.toUpperCase() === 'LAVILLE')
    )
    authorsDocuments = [...(first || []), ...(second || [])]

    authorsDocuments = authorsDocuments.map((item) => {
      delete item.createdAt

      const authorArticles = item?.articles.filter((article) =>
        articles.find((art) => !(art.slug === article && art.published))
      )

      // /!\ TOFIX: this is a hack to get the text from the markdown file, should be done in a better way
      const fileContents = item.path
        ? fs.readFileSync('content' + item.path + '.md', 'utf8')
        : false
      const { content } = fileContents ? parseMD(fileContents) : false

      return {
        ...item,
        text: content || false,
        firstname: (item.firstname && item.firstname.trim()) || '',
        lastname: (item.lastname && item.lastname.trim()) || '',
        exerpt: item.text?.length ? item.text.slice(0, 350) : '',
        // replace the titles and institutions array of object by an array of arrays (prismjs related?)
        positions_and_institutions:
          item.positions_and_institutions &&
          Object.keys(item.positions_and_institutions).map((el) => {
            return item.positions_and_institutions[el]
          }),
        // check that authors have at least one published paper
        active: !!authorArticles,
        articles: authorArticles || [],
      }
    })
    // Make a csv formated export to copy paste//UTILS
    /*   let csvString = 'firstname; lastname; articles... \n'
  authorsDocs.map((author) => {
    csvString =
      csvString +
      `${author.firstname};${author.lastname}; ${
        author.articles
          ? author.articles.map((article) => article + ';\n;;')
          : ';\n'
      }\n`
    return true
  }) 
  console.log(csvString)
  */

    insertDocuments(authorsDocuments, 'authors', ['lastname', 'firstname'])
    console.log(
      `${chalk.green('✔')}  Inserted ${
        authorsDocuments.length
      } new author documents`
    )

    return authors
  } catch (error) {
    console.log('error during mergeAndInsertAuthors: ', error)
  }
}
