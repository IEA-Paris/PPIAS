const { mathjax } = require('mathjax-full/js/mathjax.js')
const { TeX } = require('mathjax-full/js/input/tex.js')
const { CHTML } = require('mathjax-full/js/output/chtml.js')
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js')
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js')
const { AssistiveMmlHandler } = require('mathjax-full/js/a11y/assistive-mml.js')

const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js')

export default (node, article, media, authors, issues, options) => {
  /*   if (article.slug === 'ICA4') console.log('NODE', node) */
  if (['math-jax'].includes(node.tag)) {
    console.log('FOUND MATHJ')
    console.log(node.children[0].value)
    //
    //  Get the command-line arguments
    //
    const argv = require('yargs')
      .demand(0)
      .strict()
      .usage('$0 [options] "math" > file.html')
      .options({
        inline: {
          boolean: true,
          describe: 'process as inline math',
        },
        em: {
          default: 16,
          describe: 'em-size in pixels',
        },
        ex: {
          default: 8,
          describe: 'ex-size in pixels',
        },
        width: {
          default: 80 * 16,
          describe: 'width of container in pixels',
        },
        packages: {
          default: AllPackages.sort().join(', '),
          describe: 'the packages to use, e.g. "base, ams"',
        },
        css: {
          boolean: true,
          describe: 'output the required CSS rather than the HTML itself',
        },
        fontURL: {
          default:
            'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2',
          describe: 'the URL to use for web fonts',
        },
        assistiveMml: {
          boolean: true,
          default: false,
          describe: 'whether to include assistive MathML output',
        },
      }).argv

    //
    //  Create DOM adaptor and register it for HTML documents
    //
    const adaptor = liteAdaptor()
    const handler = RegisterHTMLHandler(adaptor)
    if (argv.assistiveMml) AssistiveMmlHandler(handler)

    //
    //  Create input and output jax and a document using them on the content from the HTML file
    //
    const tex = new TeX({ packages: argv.packages.split(/\s*,\s*/) })
    const chtml = new CHTML({ fontURL: argv.fontURL })
    const html = mathjax.document(node.children[0].value, {
      InputJax: tex,
      OutputJax: chtml,
    })

    //
    //  Typeset the math from the command line
    //
    const rst = html.convert(node.children[0].value || '', {
      display: !argv.inline,
      em: argv.em,
      ex: argv.ex,
      containerWidth: argv.width,
    })

    //
    //  If the --css option was specified, output the CSS,
    //  Otherwise, typeset the math and output the HTML
    //
    /*     if (argv.css) {
      console.log(adaptor.textContent(chtml.styleSheet(html)))
    } else {
      console.log(adaptor.outerHTML(node))
    } */

    node.tag = 'span'
    node.html = adaptor.outerHTML(rst)
    node.children = []
  }
  return [node, article, media, authors, issues, options]
}
