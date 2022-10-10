/* eslint-disable no-useless-escape */
/* import includeCategories from './includeCategories' */
import tsvToArticles from '../tsvToArticles/tsvToArticles'
import addCountMap from './addCountMap'
import formatArticle from './formatArticle'
import mergeAuthors from './mergeAuthors'
import generateMedia from './generateMedia'
import makeFiltersData from './makeFiltersData'
import processArticles from './processArticles'
import makeBibliography from './makeBibliography'
let once = true // dirty trick to avoid executing the hooks twice during the nuxt generate command. If not, nuxt would retrigger them each time we manually update the articles files content.
export default {
  hooks: {
    'content:ready': async (content) => {
      console.log(`
      CONTENT READY
      
      `)
      if (once) {
        console.log('starting once')
        tsvToArticles()

        once = false
        // await processArticles(content)
        await generateMedia(content)
        await mergeAuthors(content)
        await makeFiltersData()
      }
    },
    'content:file:beforeInsert': async (document, database) => {
      document = {
        ...addCountMap(document),
        ...(await makeBibliography(document, database)),
        ...(await formatArticle(document, database)),
        /*         ...includeCategories(document, database), */
      }
    },
  },
}
