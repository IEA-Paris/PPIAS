import Citation from 'citation-js'
const fs = require('fs')

export default (document) => {
  // generate bibliography if required
  if (document.bibliography?.length) {
    document.biblioFile = document.bibliography
    const data = fs.readFileSync('./static/' + document.bibliography, 'utf8')
    const cites = new Citation(data)
    document.bibliography = cites.data.map((item) => {
      return {
        ...item,
        // TODO update with dynamic lang & add more formats, dynamic default format: https://citation.js.org/api/0.3/tutorial-output_plugins_csl.html
        citation: new Citation(item)
          .format('citation', {
            format: 'text',
            template: 'apa',
            lang: 'en-US',
          })
          // To remove the parentheses
          // TODO come up with a better way (mb a CSL template w/out parenthesis)
          .slice(1, -1),
        APA: new Citation(item).format('bibliography', {
          format: 'html',
          template: 'apa',
          lang: 'en-US',
        }),
        vancouver: new Citation(item).format('bibliography', {
          format: 'html',
          template: 'vancouver',
          lang: 'en-US',
        }),
        harvard1: new Citation(item).format('bibliography', {
          format: 'html',
          template: 'harvard1',
          lang: 'en-US',
        }),
        text: new Citation(item)
          .format('bibliography', {
            format: 'text',
            template: 'apa',
            lang: 'en-US',
          })
          // to avoid html relics in Zenodo
          .replace('\n', ''),
      }
    })
  }
  return document
}
