/* eslint-disable no-unused-vars */
/* cuz it's dynamic mate  */
import tsvToArticles from './lib/tsvToArticles/tsvToArticles'
import addCountMap from './lib/addCountMap'
import formatArticle from './lib/formatArticle'
import mergeAuthors from './lib/mergeAuthors'
import generateMedia from './lib/generateMedia'
import makeFiltersData from './lib/makeFiltersData'
import processArticles from './lib/processArticles'
import makeBibliography from './lib/makeBibliography'
const chalk = require('chalk')
const defaults = require('./module.defaults')
export default function (moduleOptions) {
  const { nuxt } = this
  const options = Object.assign(
    {},
    defaults,
    moduleOptions,
    this.options.publio
  )
  let once = true
  // https://nuxtjs.org/docs/internals-glossary/internals-nuxt#hooks
  nuxt.hook('content:ready', async function (content) {
    if (once) {
      once = false
      // await tsvToArticles()
      await makeFiltersData(content, options)
      await processArticles(content, options)
      await generateMedia(content, options)
      await mergeAuthors(content, options)
    }
  })
  nuxt.hook('content:file:beforeInsert', async function (document, database) {
    document = {
      ...addCountMap(document),
      ...(await makeBibliography(document, database)),
      ...(await formatArticle(document, database, options)),
      /*         ...includeCategories(document, database), */
    }
  })
  nuxt.hook('listen', function (server, { port }) {
    nuxt.options.cli.badgeMessages.push(
      `With Publio inside & lots of ${chalk.hex('#cb00ff')('<3')}`
    )
  })
}
