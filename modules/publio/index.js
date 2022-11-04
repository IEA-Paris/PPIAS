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
import insertBibliographicalReferences from './lib/article/body/insertBibliographicalReferences'
import insertCitationElements from './lib/article/insertCitationElements'
import generatePDF from './lib/article/files/generatePDF'
import upsertOnZenodo from './lib/article/upsertOnZenodo'
import generateFiles from './lib/article/files'
import { insertDocuments } from './utils/contentUtilities'

const chalk = require('chalk')
const defaults = require('./module.defaults')

// eslint-disable-next-line require-await
export default async function (moduleOptions) {
  const { nuxt } = this
  let options = Object.assign({}, defaults, moduleOptions, this.options.publio)
  let articles, media, authors, issues, filters, url, routesToPrint
  // "once" is a dirty way to prevent Nuxt to retrigger the content parsing when we insert new files.
  // TODO alternatives are welcomed
  let once = true
  const build = async () => {
    if (once) return // dirty skip to avoid retriggering the build method

    console.log("BUILDING HOOK, Let' rock ! :-) ")
    // one queue to rule them all (to avoid rate limiting mechanisms on a per api basis)
    const zenodoQueue = new PQueue({
      concurrency: 5,
      intervalCap: 60,
      interval: 6000,
    })
    insertDocuments(media, 'media', ['article_slug', 'caption'])

    // Create filters
    filters = makeFiltersData(articles, issues)
    // insert issue index
    articles = articles.map((article) => insertIssueData(article, filters))
    // Upsert on Zenodo/OpenAire & get DOI is none is available
    // articles = await upsertOnZenodo(articles, options, zenodoQueue)
    routesToPrint = makePrintRoutes(articles)
    // Generate PDF & other files
    await generateFiles(
      routesToPrint,
      {
        pdfs: generatePDF,
        thumbnails: generateThumbnails,
      },
      nuxt
    )
    // and publish it on Zenodo

    // now that we have the related PDF, DOI and Zenodo record,we can update the article file
    // insertDocuments(articles, 'article', ['article_title'])

    // Now that we're done with tedious stuff, let's disseminate AF

    // Other plugins
    return true
  }
  // Regular production deployment generation (PROD + SSR ONLY)
  if (process.env.NODE_ENV === 'production') {
    nuxt.hook('generate:done', async ({ name }) => {
      if (!once) return
      console.log('"GENERATE:DONE" HOOK (PROD + SSR ONLY)')
      once = false
      await build()
    })
  } else {
    // if we are in dev mode (DEV + SSR ONLY)
    this.nuxt.hook('ready', async (nuxt) => {
      if (nuxt.name !== 'server' || !once) return
      console.log('"READY HOOK" HOOK (DEV + SSR ONLY)')
      once = false
      await build()
    })
  }
  nuxt.hook('content:ready', async (content) => {
    issues = await content('issues', { deep: true })
      // .only(['slug']) //TODO complete with only required fields
      .fetch()
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
        [
          generateBibliographyFilesForExport,
          insertBibliography,
          insertAuthorData,
          insertCitationElements,
        ],
        // BODY TRANSFORMERS
        // Formatting fixes
        [
          generateCountMap,
          insertBodyStructureIndex,
          insertFootnotes,
          insertToC,
          insertVideo,
          insertImage,
          insertFormula,
        ]
      )
      media = [...(media || []), ...extractAndGenerateMedia(article)]
      articles = [...(articles || []), article]
    }
  })
  nuxt.hook('listen', function (server, router) {
    url = router.url.toString()
    nuxt.options.cli.badgeMessages.push(
      `With Publio inside & lots of ${chalk.hex('#cb00ff')('<3')}`
    )
  })
}
