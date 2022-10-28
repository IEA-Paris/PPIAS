/* eslint-disable no-unused-vars */
/* cuz it's dynamic mate  */
import tsvToArticles from './lib/tsvToArticles/tsvToArticles'
import generateCountMap from './lib/article/generateCountMap'
import makeThumbnail from './lib/article/makeThumbnail'
import formatArticle from './lib/article/body/formatArticle'
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
import processArticleBody from './lib/article/body'
import insertBibliographicalReferences from './lib/article/body/insertBibliographicalReferences'
import insertCitationElements from './lib/article/insertCitationElements'
import generatePDF from './lib/article/generatePDF'
const chalk = require('chalk')
const defaults = require('./module.defaults')
export default function (moduleOptions) {
  const { nuxt } = this
  let options = Object.assign({}, defaults, moduleOptions, this.options.publio)
  let articles = []
  let media, authors, issues, filters

  nuxt.hook('generate:cache:ignore', (ignore) => {
    ignore.push('content')
    console.log('cache ignore') /*  */
  })
  nuxt.hook('generate:routeCreated', (route) => {
    console.log('generate:routeCreated', route) /* ignore.push('content') */
  })
  // https://nuxtjs.org/docs/internals-glossary/internals-nuxt#hooks
  this.nuxt.hook('generate:done', async ({ content, builder }) => {
    // extend
    console.log('generate:done: ')

    /*  const authorsFiles = await content('authors', { deep: true }).fetch()
     */
    const issuesFiles = await content('issues', { deep: true })
      .sortBy('date', 'desc')
      .fetch()

    // Create filters
    filters = makeFiltersData(articles, issuesFiles)
    // Make print routes
    const routesToPrint = makePrintRoutes(articles)
    await generatePDF(routesToPrint.pdfs)
  })
  this.nuxt.hook('build:compiled', ({ name }) => {
    console.log('build:compiled: ')
  })
  this.nuxt.hook('generate:extendRoutes', (routes) => {
    console.log('generate:extendRoutes: ')
  })
  this.nuxt.hook('generate:done', ({ builder }) => {
    console.log('generate:done: ')
  })
  this.nuxt.hook('build:compile', () => {
    console.log('build:compile: ')
  })

  nuxt.hook('content:ready', function (content) {
    console.log('    "READY": ', 'READY')
  })
  nuxt.hook('content:file:beforeInsert', async (article, database) => {
    if (article.dir.startsWith('/articles') && article.published) {
      article = {
        ...generateBibliographyFilesForExport(article),
        ...insertBibliography(article),
        /* ...insertIssueData(article, filters), */
        ...insertAuthorData(article, authors),
        ...insertCitationElements(article, options),
      }
      ;[
        article,
        // to be used in the transformers or later
        media,
        authors,
        issues,
        options,
      ] = processArticleBody(
        // main item
        article,
        // to be used in the transformers or later
        media,
        authors,
        issues,
        options,
        // TRANSFORMERS
        // Formatting fixes
        generateCountMap,
        insertBodyStructureIndex,
        insertFootnotes,
        insertToC,
        insertVideo,
        insertImage,
        insertFormula
      )
      await extractAndGenerateMedia(article)

      // Make Thumbnail
      // Upsert on Zenodo/OpenAire
      // Generate DOI
      // Update article file
      // Generate PDF
      // Publish on Zenodo/OpenAire
      // Disseminate
      // Upsert on HAL
      // Other plugins
      articles = [...articles, article]
    }
  })
  nuxt.hook('listen', function (server, { port }) {
    nuxt.options.cli.badgeMessages.push(
      `With Publio inside & lots of ${chalk.hex('#cb00ff')('<3')}`
    )
  })
}
