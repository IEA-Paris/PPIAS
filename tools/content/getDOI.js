import Citation from 'citation-js'
import config from '../../config.js'
import {
  generateChecksum,
  updateArticleDoiAndZid,
} from '../lib/contentUtilities'

const fs = require('fs')

export default async (document) => {
  // Rationale of the below function
  /*
  We want to upsert a document in Zenodo.
  If the title & DOI exists, we use checksum to see if a revision is needed
  If not, we created the new document
  When created, only documents with needDOI set to true will get a generated DOI.
  */

  try {
    if (
      // make DOI only if the document is published
      document.published &&
      document.article_title === '8 Days at ICA 4 First session in Paris'
    ) {
      const Zenodo = require('../lib/ZenodoConnector')
      const zenodo = await new Zenodo({
        host: 'sandbox.zenodo.org', // TODO update domain name
        token: config.modules.zenodo.token,
        protocol: 'https',
      })
      const records = await zenodo.depositions.list()
      // get PDF checksum
      const path = require('path')
      const fileBuffer = await fs.readFileSync(
        path.resolve(
          process.env.NODE_ENV !== 'production' ? 'static/pdfs' : 'pdfs',
          document.slug + '.pdf'
        )
      )
      document.checksum = generateChecksum(fileBuffer)

      const sameChecksum = records.data.find((item) => {
        return (
          item.files &&
          item.files.length &&
          item.files.find((file) => file.checksum === document.checksum)
        )
      })
      console.log('sameChecksum: ', sameChecksum?.length)
      const sameIdOrDoi = records.data.find(
        (article) =>
          article.metadata.id === document.Zid ||
          article.metadata.doi === document.DOI
      )
      console.log('sameIdOrDoi: ', sameIdOrDoi?.length)
      const data = fs.readFileSync('./static/' + document.biblioFile, 'utf8')
      const cites = new Citation(data)
      const references = cites.data.map((item) =>
        new Citation(item)
          .format('bibliography', {
            format: 'text',
            template: 'apa',
            lang: 'en-US',
          })
          // to avoid html relics in Zenodo
          .replace('\n', '')
      )
      const metadata = {
        upload_type: 'publication',
        description: document.abstract || 'No description provided',
        publication_type: 'article',
        ...(document.tags && { keywords: document.tags }),
        references,
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
        communities: [
          {
            identifier: 'pias',
          } /* TODO add once the official release is done { identifier: 'publiio' } */,
        ],
        journal_title: config.name,
        prereserve_doi: document.needDOI !== false,
        publication_date: new Date(document.date).toLocaleDateString('en-US', {
          timezone: 'UTC',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        // TODO
        // - add DOI and ISSN as related identifiers (extra),
        // - same issue articles,
        // - cites relation (when a DOI is provided in the citation)
        // - as well as semantic stuff
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

      // check if the article already exists on Zenodo:
      if (!sameIdOrDoi?.length) {
        console.log(
          'no article matching on Zenodo for ',
          document.article_title,
          ' - generating new document'
        )
        // no article matching on Zenodo, let's proceed with creation

        // used to debug using postman-like extensions:
        console.log('metadata: ', JSON.stringify(metadata))
        const entry = await zenodo.depositions.create({ metadata })
        console.log(`deposition created for ${document.slug} `)

        await zenodo.files.upload({
          filename: document.slug + '.pdf',
          data: fileBuffer,
          deposition: entry.data,
        })
        console.log(`PDF file uploaded for ${document.slug} `)
        const result = await zenodo.depositions.publish({
          id: entry.data.id,
        })
        console.log(`${document.slug} successfully published`)
        // console.log('result: ', result.data)
        document.DOI = result.data.doi
        document.Zid = result.data.id
      } else {
        console.log('article already exists on Zenodo')
        // If the article exists, let's check if the checksum requires us to make a revision or not
        const entry = await zenodo.depositions.update(document.Zid, {
          metadata,
        })
        console.log(`deposition updated for ${document.slug} `)
        if (sameChecksum === null) {
          await zenodo.files.upload({
            filename: document.slug + '.pdf',
            data: fileBuffer,
            deposition: entry.data,
          })
          console.log(`PDF file uploaded for ${document.slug} `)
          const result = await zenodo.depositions.publish({
            id: entry.data.id,
          })
          console.log(`${document.slug} successfully updated`)
          // console.log('result: ', result.data)
          document.DOI = result.data.doi
          document.Zid = result.data.id
        }
        console.log(
          'Found articles matching on Zenodo for ',
          document.article_title
        )

        // TODO: add the revision logic
        // one article matching
        // several articles matching
      }
      await updateArticleDoiAndZid(document)
    }
    return document
  } catch (error) {
    console.log('error: ', error)
  }
}
