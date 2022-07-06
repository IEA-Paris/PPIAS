import config from '../../config.js'
export default async (document) => {
  try {
    if (
      document.dir.startsWith('/articles') &&
      document.published &&
      document.needDOI &&
      document.article_title === 'COVID-19 Vaccination Resistance' &&
      !document.DOI
    ) {
      console.log('config.modules.zenodo.token: ', config.modules.zenodo.token)

      const Zenodo = require('../lib/ZenodoConnector')
      const zenodo = await new Zenodo({
        host: 'sandbox.zenodo.org',
        token: config.modules.zenodo.token,
        protocol: 'https',
      })
      const records = await zenodo.depositions
      console.log(records)
      /* const fs = require('fs').promises
      const path = require('path')
      const rawfile = path.resolve(
        process.env.NODE_ENV !== 'production' ? 'static/pdfs' : 'pdfs',
        document.slug + '.pdf'
      )
      const file = await fs.readFile(rawfile)
      try {
        const metadata = {
          upload_type: 'publication',
          description: document.abstract || 'No description provided',
          publication_type: 'article',
          ...(document.tags && { keywords: document.tags }),
          // TODO references: add .bib file extract
          // TODO conference_url: TO BE COMPLETED
          language: 'eng',
          journal_title: config.name,
          publication_date: new Date(document.date).toLocaleDateString(
            'en-US',
            {
              timezone: 'UTC',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }
          ),
          access_right: 'open',
          title: document.article_title,
          creators: document.authors.map((item) => {
            // TODO include all title & institution info
            return {
              name: item.lastname.trim() + ', ' + item.firstname.trim(),
              ...(item.titles_and_institutions &&
                item.titles_and_institutions[0] &&
                item.titles_and_institutions[0].institution && {
                  affiliation: item.titles_and_institutions[0].institution,
                }),
              ...(item?.orcid_id && { orcid: item?.orcid_id }),
            }
          }),
        }
        console.log('metadata: ', JSON.stringify(metadata))

        const entry = await zenodo.depositions.create({ metadata })
        console.log('entry: ', entry)
        console.log(`deposition created for ${document.slug} `)

        await zenodo.files.upload({
          filename: document.slug + '.pdf',
          data: file,
          deposition: entry.data,
        })
        const result = await zenodo.depositions.publish({
          id: entry.data.id,
        })
        console.log('result: ', result.data)
        return result.data.doi
      } catch (error) {
        console.log('error: ', error)
      } */

      // we assume it is markdown
      // make DOI only if the document is published & has no DOI yet & needs a DOI
      return document
    }
  } catch (error) {
    console.log('error: ', error)
  }
}
