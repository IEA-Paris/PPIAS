import path from 'path'
import fs from 'fs'
import { dump } from 'js-yaml'
import fsExtra from 'fs-extra'
import slugify from '../../assets/utils/slugify'
import { formatAuthors } from '../../assets/utils/transforms'
/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export const mergeDeep = (...objects) => {
  const isObject = (obj) => obj && typeof obj === 'object'

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key]
      const oVal = obj[key]
      if (obj[key] !== undefined || prev[key] !== undefined) {
        if (prev[key] === undefined) prev[key] = oVal
        // if we deal with an array
        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          // check its items type
          if (
            (pVal[0] && typeof pVal[0] === 'object') ||
            (oVal[0] && typeof oVal[0] === 'object')
          ) {
            // if object, recursive call
            prev[key] = mergeDeep(pVal, oVal)
          } else {
            // if not we concat
            const newArr = [...pVal.concat(...oVal)]
            // and deduplicate
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
          // if object, recursive call
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal)
          // if string and the base is not set
        } else if (typeof oVal === 'string' && !prev[key].length && oVal.length)
          prev[key] = oVal
        // TODO handle cases where we wanna add the different values instead of replacing
      }
    })

    return prev
  }, {})
}
export const makeFiltersData = (articles, authors) => {
  const filters = {}

  // year filter
  filters.years = {
    type: 'Select',
    items: [
      ...new Set(articles.map((article) => article.date.substring(0, 4))),
    ].filter((item) => !(item === null || item === '')),
  }
  /* Too much items to expect - also covered by FTS
  // author filters
  filters.authors = articles.map((article) =>
    articles.map(
      (article) => article?.authors.map((author) => author.lastname) || []
    )
  )
  // institution filters
  filters.authors = articles.map((article) =>
    articles.map(
      (article) =>
        article?.authors.map((author) =>
          author.titles_and_institutions.map((item) => item.institution)
        ) || []
    )
  ) */
  // language filters
  filters.language = {
    type: 'Select',
    items: [...new Set(articles.map((article) => article.language))].filter(
      (item) => !(item === null || item === '')
    ),
  }

  // Keyword filters
  filters.tags = {
    type: 'Autocomplete',
    items: [...new Set(articles.map((article) => article.tags).flat())].filter(
      (item) => item
    ),
  }

  // category filters
  filters.category = {
    type: 'Autocomplete',
    items: [
      ...new Set(
        articles
          .map((article) => [
            ...(article.category_1 ? [article.category_1] : []),
            ...(article.category_2 ? [article.category_2] : []),
          ])
          .flat()
      ),
    ].filter((item) => !(item === null || item === '' || !item.length)),
  }
  fs.writeFileSync(
    './assets/generated/filters.js',
    `/* eslint-disable prettier/prettier */
const filters = ${JSON.stringify(filters)}
export default {
  articles: {
    filters,
    sort:{}

  },
  media: {
    filters,
    sort:{}
  },
  authors: {
    filters: {
    years: filters.years,
    language: filters.language
    },
    sort:{}
  }
}`
  )
}

export const writePrintRoutes = (articles) => {
  /*   // first, we clean existing files
  const targetFolder = path.resolve('static/pdfs')
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true })
  } else {
    fsExtra.emptyDirSync(targetFolder)
  } */
  // second we generate the pdf routes and data
  fs.writeFileSync(
    './assets/generated/routes.js',
    `/* eslint-disable prettier/prettier */
export default ` +
      JSON.stringify(
        articles.map((article) => {
          return {
            // Route to content that should be converted into pdf.
            route: '/print/' + article.slug,
            file: 'pdfs/' + article.slug + '.pdf',
            // Default option is to remove the route after generation so it is not accessible
            keep: false, // defaults to false
            // Specifify language for pdf. (Only when i18n is enabled!)
            /*   locale: 'da', */
            // Override global meta with individual meta for each pdf.
            // TODO complete and change produced depending on the journal
            meta: {
              title: article.article_title,

              author: formatAuthors(article.authors).replace('&nbsp;', ' '),

              producer:
                'PPIAS - Proceeding of Paris Institution for Advanced Study',

              // Control the date the file is created.
              creationDate: article.createdAt,

              keywords: article.tags || [],
              language: article.language || 'en',
            },
          }
        })
      )
  )
}
export const insertDocuments = (data, cat, filenameFlag) => {
  // TODO diff and selectively CRUD
  // create the folder structure or delete all the previous author files
  for (const folder of 'abcdefghijklmnopqrstuvwxyz') {
    const folderPath = path.resolve('content/' + cat + '/' + folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    } else {
      fsExtra.emptyDirSync(folderPath)
    }
  }

  // create the new ones
  data.forEach((doc, index) => {
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
    const fileName = slugify(doc[filenameFlag].trim()) + '.md'

    fs.writeFileSync(
      './content/' + cat + '/' + fileName[0] + '/' + fileName,
      `---
${dump(filteredDoc, { noRefs: true, sortKeys: true })}
---
${doc.text ? doc.text : ''}`
    )
  })
}
