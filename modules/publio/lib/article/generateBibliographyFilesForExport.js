import Citation from 'citation-js'
const fs = require('fs')
// TODO add more output plugins
export default (article) => {
  if (article.bibliography?.length) {
    const bibliography = fs.readFileSync(
      './static/' + article.bibliography,
      'utf8'
    )

    /*    
Possible data formats for citation.js input: 
    - DOIs, lists of DOIs, a file with DOIs, or a doi.org URL
   - Wikidata IDs, lists of IDs, a file with IDs, a Wikidata API URL, Wikidata JSON response
   - BibTeX entries, JSON representations of BibTeX, Bib.TXT entries
   - BibJSON
   - CSL-JSON
   - Serialized JSON, an array with mixed contents, a plain URL, a jQuery element, a DOM element 
from https://citation.js.org/api/0.5/tutorial-cite_.html

Possible output plugins:
JSON
CSL-JSON https://github.com/citation-style-language/schema/blob/master/schemas/input/csl-data.json
Bibtex https://en.wikipedia.org/wiki/BibTeX
biblatex https://en.wikipedia.org/wiki/Biber_(LaTeX)
quickstatementsv1 https://www.wikidata.org/wiki/Help:QuickStatements#Command_sequence_syntax
RIS https://en.wikipedia.org/wiki/RIS_(file_format)
refer https://en.wikipedia.org/wiki/Refer_(software)
RefWorks https://en.wikipedia.org/wiki/RefWorks
CFF https://citation-file-format.github.io/ https://developers.zenodo.org/#depositions
Wikipedia Vitation Style 1 templates https://en.wikipedia.org/wiki/Template:Citation_Style_articleation/cs1
*/

    const cites = new Citation(bibliography)
  }
  return article
}
