/* eslint-disable no-useless-escape */
/* import includeCategories from './includeCategories' */
import addCountMap from './addCountMap'
import formatArticle from './formatArticle'
import mergeAuthors from './mergeAuthors'
import generateMedia from './generateMedia'
import makeFiltersData from './makeFiltersData'
import processArticles from './processArticles'
import makeBibliography from './makeBibliography'
export default {
  hooks: {
    'content:ready': async (content) => {
      await processArticles(content)
      await generateMedia(content)
      await mergeAuthors(content)
      await makeFiltersData()
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
