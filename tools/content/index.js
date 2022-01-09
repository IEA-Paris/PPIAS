/* eslint-disable no-useless-escape */

import addCountMap from './addCountMap'
import getDOI from './getDOI'
import formatArticle from './formatArticle'
import mergeAuthors from './mergeAuthors'
export default {
  hooks: {
    'content:ready': async () => {
      await mergeAuthors()
    },
    'content:file:beforeInsert': (document, database) => {
      document = {
        ...addCountMap(document),
        ...getDOI(document),
        ...formatArticle(document, database),
      }
    },
  },
}
