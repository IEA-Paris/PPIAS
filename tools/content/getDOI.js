import Citation from 'citation-js'
import PQueue from 'p-queue'
import config from '../../config.js'
import {
  generateChecksum,
  updateArticleDoiAndZid,
} from '../lib/contentUtilities'

export default async (articles) => {
  const fs = require('fs')
  const path = require('path')
  const Zenodo = require('../lib/ZenodoConnector')
  const zenodo = await new Zenodo({
    host: 'sandbox.zenodo.org', // TODO update domain name
    token: config.modules.zenodo.token,
    protocol: 'https',
  })
  const records = await zenodo.depositions.list()
  const queue = new PQueue({ concurrency: 5, intervalCap: 60, interval: 6000 })

  const hasSameChecksum = (data, document) =>
    !!data.find((item) => {
      return (
        item.files &&
        item.files.length &&
        item.files.find((file) => file.checksum === document.checksum)
      )
    })
  const hasSameIdOrDoi = (data, document) =>
    !!data.find((article) => {
      /*       console.log('article.id: ', article.id)
      console.log('document.Zid: ', document.Zid)
      console.log('article.metadata.doi : ', article.metadata.doi)
      console.log('document.DOI: ', document.DOI) */
      if (
        article.metadata.title === document.article_title &&
        !(
          (article.id && document.Zid && article.id === document.Zid) ||
          (document.DOI &&
            article.metadata.doi &&
            article.metadata.doi === document.DOI)
        )
      )
        console.log('Same article but different DOI', document.slug)
      return (
        (article.id && document.Zid && article.id === document.Zid) ||
        (document.DOI &&
          article.metadata.doi &&
          article.metadata.doi === document.DOI)
      )
    })
  const createArticleOnZenodo = async (document) => {
    // used to debug using postman-like extensions:
    /*   console.log('metadata: ', JSON.stringify(metadata)) */
    const metadata = await buildZenodoDocument(document)

    if (document.fileBuffer) {
      // file exists
      const entry = await zenodo.depositions.create({ metadata })
      console.log(`deposition created on Zenodo  for ${document.slug} `)
      await zenodo.files.upload({
        filename: document.slug + '.pdf',
        data: document.fileBuffer,
        deposition: entry.data,
      })
      console.log(`PDF file uploaded on Zenodo for ${document.slug} `)

      const result = await zenodo.depositions.publish({
        id: entry.data.id,
      })
      console.log(`${document.slug} successfully published on Zenodo `)
      // console.log('result: ', result.data)
      document.DOI = result.data.doi
      document.Zid = result.data.id
    } else {
      console.log(
        'No deposition published on Zenodo : No file available to upload for ',
        document.slug
      )
    }
    return document
  }
  const buildZenodoDocument = async (document) => {
    const references = document.biblioFile
      ? // sorry for the lack of functionalism :p
        new Citation(
          await fs.readFileSync('./static/' + document.biblioFile, 'utf8')
        ).data.map((item) =>
          new Citation(item)
            .format('bibliography', {
              format: 'text',
              template: 'apa',
              lang: 'en-US',
            })
            // to avoid html relics in Zenodo
            .replace('\n', '')
        )
      : []
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
      ...(document.DOI && { doi: document.DOI }),
      ...(document.issue && {
        journal_issue: document.issue.slice(15, -3),
      }),
      communities: [
        /* TODO add once the official release is done { identifier: 'publiio' } */
        {
          identifier: 'pias',
        },
      ],
      journal_title: config.full_name,
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
    return metadata
  }

  const generateDOI = async (document, records) => {
    // Rationale of the below function
    /*
We want to upsert a document in Zenodo.
If the title & DOI exists, we use checksum to see if a revision is needed
If not, we create the new document
When created, only documents with needDOI set to true will get a generated DOI.
*/

    try {
      if (
        fs.existsSync(
          path.resolve(
            process.env.NODE_ENV !== 'production' ? 'static/pdfs' : 'pdfs',
            document.slug + '.pdf'
          )
        )
      ) {
        // file exists
        document.fileBuffer =
          (await fs.readFileSync(
            path.resolve(
              process.env.NODE_ENV !== 'production' ? 'static/pdfs' : 'pdfs',
              document.slug + '.pdf'
            )
          )) || false
        document.checksum = generateChecksum(document.fileBuffer)

        /*       console.log('document.checksum: ', document.checksum) */
        const sameChecksum = hasSameChecksum(records.data || [], document)
        /*       console.log('sameChecksum: ', sameChecksum) */
        const sameIdOrDoi = hasSameIdOrDoi(records.data || [], document)
        /*       console.log('sameIdOrDoi: ', sameIdOrDoi) */
        // check if the article already exists on Zenodo:
        if (!sameIdOrDoi && !sameChecksum) {
          console.log(
            'NO article matching on Zenodo for ',
            document.article_title,
            '- generating new document'
          )
          // no article matching on Zenodo, let's proceed with creation
          await createArticleOnZenodo(document)
        } else {
          console.log(
            'FOUND articles matching on Zenodo for ',
            document.article_title
          )
          if (!sameChecksum) {
            console.log(
              'Article matching on Zenodo but different file checksum for ',
              document.article_title,
              'updating with the new PDF version...'
            )
            const metadata = await buildZenodoDocument(document)
            const entry = await zenodo.depositions.update(document.Zid, {
              metadata,
            })
            console.log(`deposition updated for ${document.slug} `)
            await zenodo.files.upload({
              filename: document.slug + '.pdf',
              data: document.fileBuffer,
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
            await updateArticleDoiAndZid(document)
          } else {
            console.log('No changes to be done for ', document.article_title)
          }
          // If the article exists, let's check if the checksum requires us to make a revision or not
          /*   console.log('sameChecksum: ', sameChecksum) */
        }
      } else {
        document.fileBuffer = false
        document.checksum = false
      }
      return document
    } catch (error) {
      console.log('error: ', error)
      console.log('at: ', document.article_title)
      /*      console.log(
        'metadata: ',
        JSON.stringify(await buildZenodoDocument(document))
      ) */
    }
  }
  const input = articles
    // filter published articles only. It is done earlier in the fetch but it makes it more resilient
    .filter((article) => article.published)
    // get PDF checksum
    .map((document) =>
      queue.add(async () => {
        return await generateDOI(document, records)
      })
    )
  const result = await Promise.all(input)
  return result
}
