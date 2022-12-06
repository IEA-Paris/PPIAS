const { mathjax } = require('mathjax-full/js/mathjax.js')
const { TeX } = require('mathjax-full/js/input/tex.js')
const { CHTML } = require('mathjax-full/js/output/chtml.js')
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js')
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js')
const { AssistiveMmlHandler } = require('mathjax-full/js/a11y/assistive-mml.js')

const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js')

export default (node, article, media, authors, issues, options) => {
  console.log('node.tag: ', node.props)
  if (node.tag.toLowerCase().startsWith('math')) console.log('FOUND!', node.tag)

  if (node.tag === 'math-jax') {
    const adaptor = liteAdaptor()
    const handler = RegisterHTMLHandler(adaptor)

    const tex = new TeX(node.text)
    const chtml = new CHTML()
    const html = mathjax.document('', { InputJax: tex, OutputJax: chtml })
    node.tag = 'span'
    node.props.html = html
  }
  return [node, article, media, authors, issues, options]
}
