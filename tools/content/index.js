/* eslint-disable no-useless-escape */
import includeCategories from './includeCategories'
import addCountMap from './addCountMap'
import getDOI from './getDOI'
import formatArticle from './formatArticle'
import mergeAuthors from './mergeAuthors'
import generateMedia from './generateMedia'
import makeFiltersData from './makeFiltersData'

export default {
  hooks: {
    'content:ready': async (content) => {
      await Promise.all([
        await generateMedia(content),
        await mergeAuthors(content),
        await makeFiltersData(),
      ])
    },
    'content:file:beforeInsert': (document, database) => {
      document = {
        ...addCountMap(document),
        ...formatArticle(document, database),
        ...includeCategories(document, database),
        ...getDOI(document),
      }
    },
  },
}
