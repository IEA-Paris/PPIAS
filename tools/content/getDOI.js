export default async (document) => {
  if (document?.slug === 'wprn21323') {
    /*       console.log('document: ', document) */
    const Zenodo = require('../lib/ZenodoConnector')
    const zenodo = new Zenodo({
      host: 'sandbox.zenodo.org',
      token: 'Yxwfpzm8qeXyebRG2i2loEizpF2IHZWhCCWfTzNPQHBFMVbZSmNpV5l3yA0d',
      protocol: 'https',
    })
    const fs = require('fs').promises
    const path = require('path')
    const rawfile = path.join(__dirname, '../../test.pdf')
    const file = await fs.readFile(rawfile)
    try {
      const entry = await zenodo.depositions.create({
        metadata: {
          upload_type: 'publication',
          description: document.description,
          publication_type: 'article',
          keywords: document.keywords,
          // TODO references: add .bib file extract
          // TODO conference_url: TO BE COMPLETED
          language: 'eng', // TODO
          journal_title: 'PIAS',
          publication_date: document.createdAt,
          title: document.article_title,
          creators: document.authors.map((item) => {
            return {
              name: item.lastname + ', ' + item.firstname,
              affiliation: item.titles_and_institutions[0].institution,
              orcid: item?.orcid,
            }
          }),
        },
      })
      zenodo.files
        .upload({
          bucketId: entry.data.links.bucket.split('/')[entry.data.links.bucket.split('/').length - 1],
          filename: 'test.pdf',
          data: file,
        })
        .then(
          function (response) {
            zenodo.depositions.publish({ id: entry.data.id })
          },
          (err) => {
            console.log('Error while uploading file :', err)
          },
        )
    } catch (error) {
      console.log('error: ', error)
    }
    /*
         if (document.extension === '.md') { */
    // we assume it is markdown
    // make DOI only if the document is published & has no DOI yet & needs a DOI
    /*    if (document.published && !document.DOI && document.needDOI) { */
  }
  return document
}
