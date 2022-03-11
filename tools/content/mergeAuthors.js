import fs from 'fs'
import parseMD from 'parse-md'
import {
  mergeDeep,
  insertDocuments,
  writePrintRoutes,
} from '../lib/contentUtilities'
const filterAndMerge = (first, second) => {
  first = first.filter((author) => {
    // does it have a reference?
    if (author.reference && author.reference.length) {
      // is it matching an existing doc?
      const referencedDocIndex = second.findIndex(
        (doc) =>
          doc.path ===
          author.reference.split('/').slice(1).join('/').split('.')[0]
      )
      if (author.lastname === 'Galonnier')
        // if so we merge them and remove the related articleAuthor
        second[referencedDocIndex] = mergeDeep(
          second[referencedDocIndex],
          author
        )
      return false
    }
    return true
  })

  first = first.filter((author) => {
    if (!author.social_channels)
      if (author?.social_channels?.orcid_id) {
        // does it have an orcid?
        // is it matching an existing doc?
        const referencedDocIndex = second.findIndex(
          (doc) =>
            author.social_channels.orcid_id === doc.social_channels.orcid_id
        )
        // if so we merge them and remove the related articleAuthor
        second[referencedDocIndex] = mergeDeep(
          second[referencedDocIndex],
          author
        )
        return false
      }
    return true
  })

  first = first.filter((author) => {
    // does it have the same firstname/lastname than a doc author?
    const referencedDocIndex = second.findIndex((doc) => {
      return (
        author.firstname.trim().toLowerCase() ===
          doc.firstname.trim().toLowerCase() &&
        author.lastname.trim().toLowerCase() ===
          doc.lastname.trim().toLowerCase()
      )
    })

    // if so we merge them and remove the related articleAuthor
    if (referencedDocIndex > -1) {
      second[referencedDocIndex] = mergeDeep(second[referencedDocIndex], author)
      return false
    }
    return true
  })
  // remove the authors document that match no article
  /* second = second.filter((author) => !author.reference) */
  return { first, second }
}

export default async (content) => {
  const chalk = require('chalk')
  const { $content } = require('@nuxt/content')

  // fetch all authors documents
  let authorsDocs = await $content('authors', { deep: true }).fetch()
  const categories = await $content('categories', { deep: true }).fetch()
  // and all the authors defined in the articles frontmatter
  const articles = await $content('articles', { deep: true })
    .where({ published: true })
    .only([
      'slug',
      'path',
      'authors',
      'language',
      'article_title',
      'date',
      'tags',
      'years',
      'category_1',
      'category_2',
    ])
    .fetch()
  // we use this opportunity to get the dynamic routes for pdf-printing all the articles
  writePrintRoutes(articles)
  // extract the authors from articles with backlink
  let articleAuthors = articles
    .map((article) =>
      article.authors.map((author) => {
        return {
          ...author,
          articles: [article.slug],
          tags: article.tags,
          years: [article.years],
          category: [
            ...(article.category_1 ? [article.category_1] : []),
            ...(article.category_2 ? [article.category_2] : []),
          ].flat(),
          language: [article.language],
        }
      })
    )
    .flat()
  // include the document body from the original document to avoid a round trip md <> JSON AST
  authorsDocs = authorsDocs.map((doc) => {
    const fileContents = fs.readFileSync('content' + doc.path + '.md', 'utf8')
    const { content } = parseMD(fileContents)
    return {
      ...doc,
      text: content || false,
    }
  })
  const firstPass = filterAndMerge(articleAuthors, authorsDocs)
  articleAuthors = firstPass.first
  authorsDocs = firstPass.second

  const secondPass = filterAndMerge(articleAuthors, articleAuthors)
  articleAuthors = secondPass.first

  authorsDocs = [...authorsDocs, ...secondPass.second]
  // replace the titles and institutions array of object by an array of arrays (prismjs related?)
  authorsDocs = authorsDocs.map((item) => {
    console.log('item: ', item.text)
    return {
      ...item,
      exerpt: item.text?.length ? item.text.slice(0, 350) : '',
      titles_and_institutions:
        item.titles_and_institutions &&
        Object.keys(item.titles_and_institutions).map((el) => {
          return item.titles_and_institutions[el]
        }),
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
  insertDocuments(authorsDocs, 'authors', 'lastname')
  console.log(`${chalk.green('✔')}  Inserted new author documents`)

  return true
}
