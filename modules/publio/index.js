/* eslint-disable no-unused-vars */
/* cuz it's dynamic mate  */

// Utils
import PQueue from 'p-queue'
import diagnoseArticles from './lib/diagnoseArticles'
import {
  insertDocuments,
  updateArticlesDoiAndZid,
} from './utils/contentUtilities'

// Article formating
import processArticle from './lib/article/body'
import insertBodyStructureIndex from './lib/article/body/insertBodyStructureIndex'
import generateCountMap from './lib/article/generateCountMap'
import insertRelationalData from './lib/article/insertRelationalData'
import insertImage from './lib/article/body/insertImage'
import insertFormula from './lib/article/body/insertFormula'
import insertVideo from './lib/article/body/insertVideo'
import insertToC from './lib/article/body/insertToC'
import insertBibliography from './lib/article/insertBibliography'
import insertCitationElements from './lib/article/insertCitationElements'
import insertFootnotes from './lib/article/body/insertFootnotes'
import formattingFixes from './lib/article/formattingFixes'
import insertIssueData from './lib/article/insertIssueData'
import insertAuthorData from './lib/article/insertAuthorData'

// Assets generation
import extractAndMergeAuthors from './lib/extractAndMergeAuthors'
import generateFiles from './lib/article/files'
import generatePDF from './lib/article/files/generatePDF'
import generateThumbnails from './lib/article/files/generateThumbnails'
import generateBibliographyFilesForExport from './lib/article/files/generateBibliographyFilesForExport'
import makePrintRoutes from './lib/makePrintRoutes'
import extractAndGenerateMedia from './lib/article/body/extractAndGenerateMedia'
import makeFiltersData from './lib/makeFiltersData'

// Dissemination
import disseminate from './lib/article/disseminate'
import upsertOnZenodo from './lib/article/disseminate/upsertOnZenodo'
import publishOnZenodo from './lib/article/disseminate/publishOnZenodo'

// Others
import tsvToArticles from './lib/tsvToArticles/tsvToArticles'

const chalk = require('chalk')
const defaults = require('./module.defaults')

// This module has been written to provide an overview of all the articles transformations from here

export default function (moduleOptions) {
  // await tsvToArticles()
  const fs = require('fs')
  const path = require('path')

  const { nuxt } = this
  let options = Object.assign({}, defaults, moduleOptions, this.options.publio)

  let articles, media, authors, issues, url, routesToPrint, changedFiles

  // "once" is a dirty way to prevent Nuxt to retrigger the content parsing when we insert new files.
  // TODO alternatives welcomed
  let once = true

  const zenodoQueue = new PQueue({
    concurrency: 5,
    intervalCap: 60,
    interval: 6000,
  })

  this.nuxt.hook('generate:extendRoutes', (routes) => {
    // Extend routes with the ones to be printed
    if (!routesToPrint) return
    Object.keys(routesToPrint).forEach((type) => {
      routesToPrint[type].forEach((route) => {
        routes.push({
          route: route.route,
          // TODO : add the article to the payload
          payload: null,
        })
      })
    })
  })
  nuxt.hook('generate:done', async ({ name }) => {
    if (!once) return
    console.log('"GENERATE:DONE"')
    once = false
    url = 'http://127.0.0.1:3000'
    if (routesToPrint.length) {
      await generateFiles(
        routesToPrint,
        {
          pdfs: generatePDF,
          thumbnails: generateThumbnails,
        },
        url
      )
    }
    articles = await disseminate(
      articles,
      options,
      zenodoQueue,
      // METADATA/FRONTMATTER
      [publishOnZenodo, updateArticlesDoiAndZid]
    )
  })

  nuxt.hook('build:done', async (nuxt) => {
    console.log('process.server: ')
    // For dev mode only, we start the PDF rendering process to allow debug and preview.
    if (process.env.NODE_ENV !== 'production') {
      console.log('"BUILD:done"')
      routesToPrint = makePrintRoutes(articles)
      if (routesToPrint.length) {
        await generateFiles(
          routesToPrint,
          {
            pdfs: generatePDF,
            thumbnails: generateThumbnails,
          },
          url
        )
      }
      articles = await disseminate(
        articles,
        options,
        zenodoQueue,
        // METADATA/FRONTMATTER
        [publishOnZenodo, updateArticlesDoiAndZid]
      )
    }
  })

  nuxt.hook('content:ready', async (content) => {
    console.log('"CONTENT:READY" HOOK')

    articles = await diagnoseArticles(articles, url)

    issues = await content('issues', { deep: true })
      .sortBy('date', 'desc')
      // .only(['slug']) //TODO complete with only required fields
      .fetch()

    if (media) insertDocuments(media, 'media', ['article_slug', 'caption'])

    // Create filters
    options.filters = makeFiltersData(articles, issues)
    ;[articles, media, authors, issues, options] = insertRelationalData(
      // main item
      articles,
      // to be used in the transformers or later
      media,
      authors,
      issues,
      options,
      // METADATA/FRONTMATTER
      [generateBibliographyFilesForExport, insertCitationElements]
    )
    const editedArticles = console.log(
      'to process : ',
      articles.map((article) => article.article_title)
    )
    if (articles?.length) {
      // insert issue index
      articles = articles.map((article) =>
        insertIssueData(article, options.filters)
      )

      // make an array of routes to print
      routesToPrint = makePrintRoutes(articles)
      // Upsert on Zenodo/OpenAire & get DOI is none is available
      articles = await upsertOnZenodo(articles, options, zenodoQueue)
    }
    return true
  })

  nuxt.hook('content:file:beforeInsert', (article, database) => {
    if (once && article.dir.startsWith('/articles') && article.published) {
      ;[article, media, authors, issues, options] = processArticle(
        // main item
        article,
        // to be used in the transformers or later
        media,
        authors,
        issues,
        options,
        // METADATA/FRONTMATTER
        [insertBibliography, insertAuthorData],
        // BODY TRANSFORMERS
        // Formatting fixes
        [
          generateCountMap,
          insertFootnotes,
          insertToC,
          insertVideo,
          insertImage,
          insertFormula,
          insertBodyStructureIndex,
        ]
      )
      media = [...(media || []), ...extractAndGenerateMedia(article)]
      articles = [...(articles || []), article]
    }
  })

  nuxt.hook('listen', function (server, router) {
    /*     url = router.url.toString() */
    nuxt.options.cli.badgeMessages.push(
      `With Publio inside & lots of ${chalk.hex('#cb00ff')('<3')}`
    )
  })
}
