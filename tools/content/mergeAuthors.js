import path from 'path'
import fs from 'fs'
import { Buffer } from 'buffer'
import { dump } from 'js-yaml'
import fsExtra from 'fs-extra'
import parseMD from 'parse-md'
/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
function mergeDeep(...objects) {
  const isObject = (obj) => obj && typeof obj === 'object'

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key]
      const oVal = obj[key]
      if (obj[key] !== undefined || prev[key] !== undefined) {
        if (prev[key] === undefined) prev[key] = obj[key]
        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          if (
            (pVal[0] && typeof pVal[0] === 'object') ||
            (oVal[0] && typeof oVal[0] === 'object')
          ) {
            prev[key] = mergeDeep(pVal, oVal)
          } else {
            const newArr = [...pVal.concat(...oVal)]
            prev[key] = newArr.filter((value, index) => {
              const _value = JSON.stringify(value)
              return (
                index ===
                newArr.findIndex((obj) => {
                  return JSON.stringify(obj) === _value
                })
              )
            })
          }
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal)
        } else {
          prev[key] = oVal
        }
      }
    })

    return prev
  }, {})
}
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
  const articles = await $content('articles')
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

  // TODO diff and selectively CRUD

  // create the folder structure or delete all the previous author files
  for (const folder of 'abcdefghijklmnopqrstuvwxyz') {
    const folderPath = path.resolve('content/authors/' + folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
      console.log('make folder: ', 'content/authors/' + folder)
    } else {
      console.log('empty folder: ', 'content/authors/' + folder)
      fsExtra.emptyDirSync(folderPath)
    }
  }

  // create the new ones
  authorsDocs.forEach((doc, index) => {
    // only keep relevant fields in the stored document
    const fieldsToDelete = [
      'slug',
      'body',
      'dir',
      'path',
      'extension',
      'updatedAt',
      'toc',
      'description',
      'title',
      'text',
    ]
    const filteredDoc = Object.fromEntries(
      Object.entries(doc).filter(([k]) => !fieldsToDelete.includes(k))
    )
    const filePath = path.join(
      'content/authors/' + doc.lastname.trim().toLowerCase()[0],
      doc.lastname.trim().toLowerCase() + '.md'
    )
    console.log('filePath: ', filePath)

    fs.writeFileSync(
      './content/authors/' +
        doc.lastname.trim().toLowerCase()[0] +
        '/' +
        doc.lastname.trim().toLowerCase() +
        '.md',
      `---
${dump(filteredDoc)}
---
${doc.text ? doc.text : ''}`
    )
  })
}
