/* eslint-disable no-useless-escape */
import includeCategories from './includeCategories'
import addCountMap from './addCountMap'
import getDOI from './getDOI'
import formatArticle from './formatArticle'
import mergeAuthors from './mergeAuthors'
import generateMedia from './generateMedia'

export default {
  hooks: {
    'content:ready': async (content) => {
      await Promise.all([
        await mergeAuthors(content),
        await generateMedia(content),
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
