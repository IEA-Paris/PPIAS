/* eslint-disable no-unused-vars */
/* cuz it's dynamic mate  */
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
export default function (moduleOptions) {
  const { nuxt } = this
  let options = Object.assign({}, defaults, moduleOptions, this.options.publio)
  let articles, media, authors, issues, filters
  const build = async () => {
    // Generate DOI
    // Update article file
    // Generate PDF
    // Publish on Zenodo/OpenAire
    // Disseminate
    // Upsert on HAL
    // Other plugins
    console.log('Inserting media articles')
    insertDocuments(media, 'media', ['article_slug', 'caption'])
    /* 
    // Create filters
    filters = makeFiltersData(articles, issues)
    // insert issue index
    articles = articles.map((article) => insertIssueData(article, filters))
    // Upsert on Zenodo/OpenAire
    articles = await upsertOnZenodo(articles, options)

    // Make print routes
    const routesToPrint = makePrintRoutes(articles)
    await generateFiles(routesToPrint, {
      pdf: generatePDF,
      graphs: generateThumbnails,
    }) */
    return true
  }

  if (process.env.NODE_ENV !== 'production') {
    nuxt.hook('build:compiled', async ({ name }) => {
      if (name !== 'server') return
      await build()
    })
  }
  nuxt.hook('content:file:beforeInsert', (article, database) => {
    if (article.dir.startsWith('/articles') && article.published) {
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
  nuxt.hook('listen', function (server, { port }) {
    nuxt.options.cli.badgeMessages.push(
      `With Publio inside & lots of ${chalk.hex('#cb00ff')('<3')}`
    )
  })
}
