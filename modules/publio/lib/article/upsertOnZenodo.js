import Citation from 'citation-js'
import PQueue from 'p-queue'

import {
  generateChecksum,
  updateArticlesDoiAndZid,
  deepEqual,
  cleanupString,
} from '../../utils/contentUtilities'

/// See main fn rationale below the subfunctions
export default async (articles, options) => {
  try {
    const fs = require('fs')
    const path = require('path')
    const Zenodo = require('../../utils/ZenodoConnector')
    const zenodo = await new Zenodo({
      host: 'sandbox.zenodo.org', // TODO update domain name from both env variables and the config file.
      token: options.config.modules.zenodo.token,
      protocol: 'https',
    })
    // Prepare a queue to avoid rate limiting mechanisms or RAM overconsumption
    const queue = new PQueue({
      concurrency: 5,
      intervalCap: 60,
      interval: 6000,
    })
    // fetch all our Zenodo records
    // TODO deal with the number of articles beyond 1k. I assume the md based system will show its limit before we reach it.
    const records = await zenodo.depositions.list({
      size: 10000,
    })
    // or pull each record independantly

    // could have done some levenshtein distance metrics but feeling it could lead to unintended false positives
    // NOTE: hasSameTitle is not used for now
    const hasSameFrontmatter = (data, document) => deepEqual(data, document)

    const hasSameChecksum = (data, document) =>
      data.files &&
      data.files.length &&
      data.files.find((file) => file.checksum === document.checksum)

    const hasSameIdOrDoi = (data, document) =>
      data.find(
        (article) =>
          (article.id && document.Zid && article.id === document.Zid) ||
          (document.DOI &&
            article.metadata.doi &&
            article.metadata.doi === document.DOI)
      )
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
        license: 'CC-BY-NC-4.0',
        // TODO handle the following conditionnaly (i.e. if relevant)
        // cf https://developers.zenodo.org/?shell#representation
        // conference_title:
        // conference_acronym
        // conference_dates
        // conference_place
        // conference_url
        // conference_session
        // location: [{"lat": 34.02577, "lon": -118.7804, "place": "Los Angeles"}, {"place": "Mt.Fuji, Japan", "description": "Sample found 100ft from the foot of the mountain."}]
        // TODO uncomment this once we are out of sandbox. Test DOI trigger a 400 (bad request error) since they are not legit
        // ...(document.DOI && { doi: document.DOI }),
        ...(document.issue && {
          journal_issue: document.issue.slice(15, -3),
        }),
        communities: [
          /* TODO add once the official release is done { identifier: 'publiio' } */
          {
            identifier: 'pias',
          },
        ],
        journal_title: cleanupString(options.config.full_name),
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
            ...(item.positions_and_institutions &&
              item.positions_and_institutions[0] &&
              item.positions_and_institutions[0].institution && {
                affiliation: item.positions_and_institutions[0].institution,
              }),
            ...(item?.orcid && { orcid: item.orcid }),
          }
        }),
      }
      return metadata
    }
    const createArticleOnZenodo = async (document) => {
      const metadata = await buildZenodoDocument(document)
      // used to debug using postman-like extensions:
      /*     console.log('metadata: ', metadata) */
      const entry = await queue.add(async () => {
        return await zenodo.depositions.create({ metadata })
      })
      console.log('entry: ', entry.data)
      return entry
    }

    const generateDOI = async (document, records) => {
      // Rationale of the below function
      /*
    We want to upsert a document in Zenodo.
    We pull all the records from Zenodo (along with pdf hash as well as some zenodo id)
    If the title & DOI already exists on Zenodo, we use the pdf file checksum and frontmatter deep compare to see if a revision is needed
    If a revision is needed, we create it by unpublishign the article.
    If not, we create the new document on Zenodo  and all the associated metadata.
    Note that when created, only documents with the attribute "needDOI" set to *true* will get a generated DOI.
    */

      // check if the file exists
      if (
        fs.existsSync(
          path.resolve(
            process.env.NODE_ENV !== 'production' ? 'static/pdfs' : 'pdfs',
            document.slug + '.pdf'
          )
        )
      ) {
        // file exists, let's get checksum to check if it matches the one on Zenodo
        document.fileBuffer =
          (await fs.readFileSync(
            path.resolve(
              process.env.NODE_ENV !== 'production' ? 'static/pdfs' : 'pdfs',
              document.slug + '.pdf'
            )
          )) || false
        // get PDF checksum
        document.checksum = generateChecksum(document.fileBuffer)

        /* console.log('document.checksum: ', document.checksum) */
        /* console.log('sameChecksum: ', sameChecksum) */
        // Compare DOI and Zenodo document id
        const sameIdOrDoi = hasSameIdOrDoi(records.data || [], document)
        /*    console.log('sameIdOrDoi: ', sameIdOrDoi) */
        // check if the article already exists on Zenodo:
        if (sameIdOrDoi) {
          console.log(
            'FOUND articles matching on Zenodo for ',
            document.article_title
          )

          // we found the matching article on Zenodo
          const sameFrontmatter = hasSameFrontmatter(
            await buildZenodoDocument(document),
            sameIdOrDoi.metadata || {}
          )
          const sameChecksum = hasSameChecksum(sameIdOrDoi || [], document)
          if (!sameFrontmatter || !sameChecksum) {
            console.log('Update required on an existing article')
            if (sameIdOrDoi.state === 'done') {
              console.log('unlockingedit')
              const rst = await queue.add(async () => {
                await zenodo.depositions.edit({ id: document.Zid })
              })
              console.log('unlocked edit', rst)
            }
            document = await queue.add(async () => {
              await zenodo.depositions.newversion({
                filename: document.slug + '.pdf',
                data: document.fileBuffer,
                deposition: await buildZenodoDocument(document),
              })
            })
          }
        } else {
          // this article doesn't exist on Zenodo. Let's create it then.
          document = await createArticleOnZenodo(document)
        }
      } else {
        // there is no file to begin with, let's skip the Zenodo step
        // since we can't publish or get a DOI without a file to upload
        // TODO: consider using a blank file either for the sake of pre-attributing a DOI or whatever. No a good idea seen from here.
        console.log(
          'No file atttached to "',
          document.article_title,
          '" so let s just SKIP it'
        )
      }
      document.fileBuffer = false
      document.checksum = false
      return document
    }
    const input = articles
      // filter published articles only. It is done earlier in the fetch but it makes it more resilient
      .filter((article) => article.published)
      .map(async (document) => await generateDOI(document, records))
    const result = await Promise.all(input)
    console.log('result: ', result)
    return result
  } catch (error) {
    console.log('error: ', error)
  }
}
