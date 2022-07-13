import { truncate } from 'fs'
import Citation from 'citation-js'
import config from '../../config.js'

export default async (document) => {
  try {
    if (
      document.dir.startsWith('/articles') &&
      document.published &&
      document.article_title === 'COVID-19 Vaccination Resistance' &&
      false
    ) {
      const Zenodo = require('../lib/ZenodoConnector')
      const zenodo = await new Zenodo({
        host: 'sandbox.zenodo.org', // TODO update domain name
        token: config.modules.zenodo.token,
        protocol: 'https',
      })
      const records = await zenodo.depositions.list()
      console.log(
        'records: ',
        records.data.map((item) => item.files)
      )
      const sameTitleOrDoi = records.data.find(
        (article) =>
          article.metadata.title === document.article_title ||
          article.metadata.doi === document.DOI
        // TODO think hard about the best and most effective way to deduplicate articles on Zenodo.
        // Description is subject to change and shall not be considered as a unique ID.
        // && article.metadata.description === document.abstract
        // Title could change as well but since it is one of the main identifiers, we'll go with it for now.
        // To be mitigated with strong identifiers like DOI.
      )
      // check if the article already exists on Zenodo:
      if (sameTitleOrDoi === null) {
        console.log(
          'no article matching on Zenodo for ',
          document.article_title
        )
        // no article matching on Zenodo, let's proceed
        const fs = require('fs').promises
        const path = require('path')
        const fileBuffer = await fs.readFileSync(
          path.resolve(
            process.env.NODE_ENV !== 'production' ? 'static/pdfs' : 'pdfs',
            document.slug + '.pdf'
          )
        )
        const hashSum = crypto.createHash('sha256')
        hashSum.update(fileBuffer)

        try {
          const metadata = {
            upload_type: 'publication',
            description: document.abstract || 'No description provided',
            publication_type: 'article',
            ...(document.tags && { keywords: document.tags }),
            references: document.bibliography.map((item) => item.text),
            language: 'eng', // TODO bind to i18n config settings
            access_right: 'open',
            license: 'cc-by-nc-4.0',
            // TODO handle the following conditionnaly (i.e. if relevant)
            // cf https://developers.zenodo.org/?shell#representation
            // conference_title:
            // conference_acronym
            // conference_dates
            // conference_place
            // conference_url
            // conference_session
            // location: [{"lat": 34.02577, "lon": -118.7804, "place": "Los Angeles"}, {"place": "Mt.Fuji, Japan", "description": "Sample found 100ft from the foot of the mountain."}]
            ...(document.doi && { doi: document.DOI }),
            ...(document.issue && {
              journal_issue: document.issue.slice(15, -3),
            }),
            communities: [{ identifier: 'pias' }],
            journal_title: config.name,
            doi: document.DOI || false,
            prereserve_doi: document.needDOI,
            publication_date: new Date(document.date).toLocaleDateString(
              'en-US',
              {
                timezone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }
            ),
            // TODO
            // add DOI and ISSN as related identifiers (extra),
            // same issue articles,
            // cites relation (when a DOI is provided in the citation)
            // as well as semantic stuff
            //  e.g.  related_identifiers: [{'relation': 'isPartOf', 'identifier':'2826-2832'},{'relation': 'isSupplementTo', 'identifier':'10.1234/foo'}, {'relation': 'cites', 'identifier':'https://doi.org/10.1234/bar', 'resource_type': 'image-diagram'}]
            //     [
            // {identifier: 'ISSN': '2826-2832'}
            //     ],
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
                ...(item?.orcid && { orcid: item.orcid }),
              }
            }),
          }

          // remove the text representation of the bibliography since it won't be needed anymore
          document.bibliography.forEach((element) => {
            delete element.text
          })
          console.log('metadata: ', JSON.stringify(metadata))

          const entry = await zenodo.depositions.create({ metadata })
          console.log(`deposition created for ${document.slug} `)

          await zenodo.files.upload({
            filename: document.slug + '.pdf',
            data: fileBuffer,
            deposition: entry.data,
          })
          const result = await zenodo.depositions.publish({
            id: entry.data.id,
          })
          // console.log('result: ', result.data)
          return result.data.doi
        } catch (error) {
          console.log('error: ', error)
        }
        // we assume it is markdown
        // make DOI only if the document is published & has no DOI yet & needs a DOI
      } else {
        console.log(
          'Found articles matching on Zenodo for ',
          document.article_title
        )
        // TODO: add the revision logic
        // one article matching
        // several articles matching
      }
      return document
    }
  } catch (error) {
    console.log('error: ', error)
  }
}
