export default async (articles) => {
  const util = require('node:util')
  const fs = require('fs')
  const path = require('path')
  const exec = util.promisify(require('node:child_process').exec)

  let gitDiffed = false

  try {
    // TODO the following command raises an error if no file has changed. Look into an argument to avoid that, thus removing the try catch block
    const { stdout, stderr } = await exec(
      "{ git ls-files --others --exclude-standard ; git diff-index --name-only --diff-filter=d HEAD ; } | grep --regexp='[.]md$'"
    )
    gitDiffed = stdout
  } catch (error) {
    /*     console.log('error: ', error) */
    console.log('No file seems to have changed')
  } finally {
    gitDiffed = ''
  }
  articles = articles.map((article) => {
    const diffed = gitDiffed
      .split('\n')
      .filter((str) => str)
      .map((str) => str.slice(7))
      .includes(article.path)
    const hasPDF = fs.existsSync(
      path.resolve('static/pdfs', article.slug + '.pdf')
    )
    /*     if (article.slug === 'SynE2_2016_16_obedience-responsibility-punishment')
      console.log('article: ', article) */
    article.todo = {
      gitDiffed: diffed,
      generatePDF: diffed || !hasPDF || false,
      generateGraph: diffed || false,
      upsertOnZenodo: diffed || !hasPDF || false,
      obtainDOI: (article.needDOI && !article.DOI?.length) || false,
      publishOnZenodo: false,
    }

    return article
  })

  return articles
}
