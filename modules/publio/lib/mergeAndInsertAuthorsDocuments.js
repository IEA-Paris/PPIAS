import fs from 'fs'
import parseMD from 'parse-md'
import { filterAndMerge, insertDocuments } from '../utils/contentUtilities'

export default async (authors = [], articles, content) => {
  try {
    const chalk = require('chalk')

    const authorsDocuments = await content('authors', { deep: true }).fetch()

    const { first, second } = filterAndMerge(authors, authorsDocuments)


    const updatedAuthorsDocuments = [...(first || []), ...(second || [])].map(
      (item) => {
        delete item.createdAt

        const authorArticles = item?.articles.filter((article) =>
          articles.find((art) => !(art.slug === article && art.published))
        )

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
          positions_and_institutions:
            item.positions_and_institutions &&
            Object.values(item.positions_and_institutions),
          active: !!authorArticles,
          articles: authorArticles || [],
        }
      }
    )

    insertDocuments(updatedAuthorsDocuments, 'authors', [
      'lastname',
      'firstname',
    ])
    console.log(
      `${chalk.green('✔')}  Inserted ${
        updatedAuthorsDocuments.length
      } new author documents`
    )

    return authors
  } catch (error) {
    console.log('error during mergeAndInsertAuthors: ', error)
  }
}
