/* eslint-disable no-unused-vars */
/* cuz it's dynamic mate  */
import PQueue from 'p-queue'
import tsvToArticles from './lib/tsvToArticles/tsvToArticles'
import generateCountMap from './lib/article/generateCountMap'
import generateThumbnails from './lib/article/files/generateThumbnails'
import extractAndMergeAuthors from './lib/extractAndMergeAuthors'
import extractAndGenerateMedia from './lib/article/body/extractAndGenerateMedia'
import makeFiltersData from './lib/makeFiltersData'
import insertBibliography from './lib/article/insertBibliography'
import makePrintRoutes from './lib/makePrintRoutes'
import formattingFixes from './lib/article/formattingFixes'
import generateBibliographyFilesForExport from './lib/article/generateBibliographyFilesForExport'
import insertIssueData from './lib/article/insertIssueData'
import insertAuthorData from './lib/article/insertAuthorData'
import insertBodyStructureIndex from './lib/article/body/insertBodyStructureIndex'
import insertImage from './lib/article/body/insertImage'
import insertFormula from './lib/article/body/insertFormula'
import insertVideo from './lib/article/body/insertVideo'
import insertToC from './lib/article/body/insertToC'
import insertFootnotes from './lib/article/body/insertFootnotes'
import processArticle from './lib/article/body'
import insertCitationElements from './lib/article/insertCitationElements'
import generatePDF from './lib/article/files/generatePDF'
import upsertOnZenodo from './lib/article/disseminate/upsertOnZenodo'
import generateFiles from './lib/article/files'
import { insertDocuments } from './utils/contentUtilities'
import insertRelationalData from './lib/article/insertRelationalData'

const chalk = require('chalk')
const defaults = require('./module.defaults')
export default async function (moduleOptions) {
  // await tsvToArticles()
  const { nuxt } = this
  let options = Object.assign({}, defaults, moduleOptions, this.options.publio)
  let articles, media, authors, issues, filters, url, routesToPrint
  const util = require('node:util')
  const fs = require('fs')
  const path = require('path')
  const exec = util.promisify(require('node:child_process').exec)

  // "once" is a dirty way to prevent Nuxt to retrigger the content parsing when we insert new files.
  // TODO alternatives welcomed
  let once = true
  let gitDiffed = false

  try {
    // TODO the following command raises an error if no file has changed. Look into an argument to avoid that, thus removing the try catch block
    const { stdout, stderr } = await exec(
      "{ git ls-files --others --exclude-standard ; git diff-index --name-only --diff-filter=d HEAD ; } | grep --regexp='[.]md$'"
    )
    gitDiffed = stdout
  } catch (error) {
    /*     console.log('error: ', error) */
    console.log('No file seems to have changed')
  } finally {
    gitDiffed = ''
  }

  const changedFiles = gitDiffed
    .split('\n')
    .filter((str) => str)
    .map((str) => str.slice(7))
  if (changedFiles?.length) console.log('changedFiles: ', changedFiles)

  const zenodoQueue = new PQueue()

  const extendGeneration = async () => {
    if (!once) return // dirty skip to avoid retriggering the build method

    if (media) insertDocuments(media, 'media', ['article_slug', 'caption'])

    // Create filters
    filters = makeFiltersData(articles, issues)
    console.log('issues: ', issues && issues.length)
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
    // we only update articles that have been edited
    let editedArticles = articles.filter(
      (article) =>
        // if the file has changed
        changedFiles.includes(article.path) ||
        // or if for some reason it needs a DOI but couldn't get one
        (article.needDoi && !article.DOI) ||
        // or if it needs a PDF file that is missing
        !fs.existsSync(path.resolve('static/pdfs', article.slug + '.pdf'))
    )
    console.log(
      'to process : ',
      editedArticles.map((article) => article.article_title)
    )
    if (editedArticles?.length) {
      // insert issue index
      editedArticles = editedArticles.map((article) =>
        insertIssueData(article, filters)
      )
      // Upsert on Zenodo/OpenAire & get DOI is none is available
      articles = await upsertOnZenodo(articles, options, zenodoQueue)

      // make an array of routes to print
      routesToPrint = makePrintRoutes(editedArticles)
    }

    return true
  }

  const generateFilesToPrint = async () => {
    console.log('GENERATE FILES')
    if (!routesToPrint) return
    // Generate PDF & other files
    await generateFiles(
      routesToPrint,
      {
        pdfs: generatePDF,
        thumbnails: generateThumbnails,
      },
      url
    )
    // and publish it on Zenodo
    upsertOnZenodo(routesToPrint.pdfs, options, zenodoQueue)
    // now that we have the related PDF, DOI and Zenodo record,we can update the article file
    // insertDocuments(articles, 'article', ['article_title'])

    // Now that we're done with tedious stuff, let's disseminate AF

    // Other plugins
  }

  this.nuxt.hook('generate:extendRoutes', (routes) => {
    // Extend routes with the ones to be printed
    console.log('extendin routes')
    if (!routesToPrint) return // dirty skip to avoid retriggering the build method
    Object.keys(routesToPrint).forEach((type) => {
      routesToPrint[type].forEach((route) => {
        routes.push({
          route: route.route,
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
    await generateFilesToPrint()
  })

  nuxt.hook('build:done', async (nuxt) => {
    console.log('process.server: ')
    // For dev mode only, we start the PDF rendering process to allow debug and preview.
    if (process.env.NODE_ENV !== 'production') {
      console.log('"BUILD:done"')
      routesToPrint = makePrintRoutes(articles)
      await generateFilesToPrint()
    }
  })

  nuxt.hook('content:ready', async (content) => {
    issues = await content('issues', { deep: true })
      .sortBy('date', 'desc')
      // .only(['slug']) //TODO complete with only required fields
      .fetch()
    console.log('"CONTENT:READY" HOOK')
    await extendGeneration()
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
