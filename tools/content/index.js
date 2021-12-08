import addCountMap from './addCountMap'
import getDOI from './getDOI'
export default {
  hooks: {
    'content:file:beforeInsert': (document) => {
      document = addCountMap(document)
      document = getDOI(document)
      return document
    },
  },
}
