import addCountMap from './addCountMap'
import getDOI from './getDOI'
import formatArticle from './formatArticle'
export default {
  hooks: {
    'content:file:beforeInsert': (document, database) => {
      document = {
        ...addCountMap(document),
        ...getDOI(document),
        ...formatArticle(document, database),
      }
      if (document?.article_body) {
        console.log('document1: ', document?.article_body)
      }
    },
  },
}
