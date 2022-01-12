import fs from 'fs'
import parseMD from 'parse-md'
import { mergeDeep, insertDocuments } from '../lib/contentUtilities'
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
      // if so we merge them and remove the related articleAuthor
      second[referencedDocIndex] = mergeDeep(second[referencedDocIndex], author)
      return false
    }
    return true
  })

  first = first.filter((author) => {
    // does it have an orcid?
    if (author.social_channels.orcid) {
      // is it matching an existing doc?
      const referencedDocIndex = second.findIndex(
        (doc) => author.social_channels.orcid === doc.social_channels.orcid
      )
      // if so we merge them and remove the related articleAuthor
      second[referencedDocIndex] = mergeDeep(second[referencedDocIndex], author)
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
  second = second.filter((author) => !author.reference)
  return { first, second }
}

export default async (content) => {
  const { $content } = require('@nuxt/content')

  // fetch all authors documents
  let authorsDocs = await $content('authors', { deep: true }).fetch()

  // and all the authors defined in the articles frontmatter
  const articles = await $content('articles', { deep: true })
    .where({ published: true })
    .only(['slug', 'path', 'authors'])
    .fetch()
  // extract the authors from articles with backlink
  let articleAuthors = articles
    .map((article) =>
      article.authors.map((author) => {
        return {
          ...author,
          articles: [article.path],
        }
      })
    )
    .flat()
  // include the document body from the original document to avoid a round trip md <> JSON AST
  authorsDocs = authorsDocs.map((doc) => {
    const fileContents = fs.readFileSync('content' + doc.path + '.md', 'utf8')
    const { metadata, content } = parseMD(fileContents)
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

  insertDocuments(authorsDocs, 'authors', 'lastname')
}
