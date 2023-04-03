import fs from 'fs'
import parseMD from 'parse-md'
import { filterAndMerge, insertDocuments } from '../utils/contentUtilities'

export default async (authors, content) => {
  const chalk = require('chalk')
  let authorsDocuments = await content('authors', { deep: true })
    // .only(['slug']) //TODO complete with only required fields
    .fetch()
  // extract the authors from articles with backlink
  const firstPass = filterAndMerge(authors, authorsDocuments)
  let articleAuthors = firstPass.first
  authorsDocuments = firstPass.second
  // TODO: come up with a global approach for non destructive merge,
  // that could explicitely removed papers that were published but are not anymore
  // or X other reason why it should be marked as from this author anymore)
  const secondPass = filterAndMerge(articleAuthors, articleAuthors)
  articleAuthors = secondPass.first

  authorsDocuments = [...authorsDocuments, ...secondPass.second]
  authorsDocuments = authorsDocuments
    .map((item) => {
      if (item.lastname === 'Lahlou') console.log(item)
      delete item.createdAt
      // replace the titles and institutions array of object by an array of arrays (prismjs related?)
      return {
        ...item,
        firstname: (item.firstname && item.firstname.trim()) || '',
        lastname: (item.lastname && item.lastname.trim()) || '',
        // check that authors have at least one published paper
        exerpt: item.text?.length ? item.text.slice(0, 350) : '',
        positions_and_institutions:
          item.positions_and_institutions &&
          Object.keys(item.positions_and_institutions).map((el) => {
            return item.positions_and_institutions[el]
          }),
      }
    })
    .filter((item) => item?.articles?.length)
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
  console.log('authorsDocuments: ', authorsDocuments)
  /* insertDocuments(authorsDocuments, 'authors', ['lastname', 'firstname']) */
  console.log(`${chalk.green('✔')}  Inserted new author documents`)

  return authors
}
