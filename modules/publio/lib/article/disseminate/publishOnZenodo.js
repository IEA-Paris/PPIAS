import buildZenodoDocument from './buildZenodoDocument'

/// See main fn rationale below the subfunctions
export default async (articles, options, queue) => {
  try {
    const fs = require('fs')
    const path = require('path')
    const Zenodo = require('../../../utils/ZenodoConnector')
    const zenodo = await new Zenodo({
      host: options.config.modules.zenodo.sandbox
        ? 'sandbox.zenodo.org'
        : 'zenodo.org',
      token: options.config.modules.zenodo.token,
      protocol: 'https',
    })

    const publishArticleOnZenodo = async (document) => {
      const result = await zenodo.depositions.publish({
        id: document.data.id,
      })
      console.log(`${document.slug} successfully published on Zenodo `)
      // console.log('result: ', result.data)
      document.DOI = result.data.doi
      document.Zid = result.data.id
      return document
    }
    const uploadArticleFileOnZenodo = async (document) => {
      const resolvedPath = path.resolve(
        process.env.NODE_ENV !== 'production' ? 'static/pdfs' : 'pdfs',
        document.slug + '.pdf'
      )
      // check if the file exists
      document.fileBuffer = fs.existsSync(resolvedPath)
        ? // file exists, let's get checksum to check if it matches the one on Zenodo
          fs.readFileSync(resolvedPath)
        : // fileBuffer === false means the file should be generated
          false
      if (document.fileBuffer) {
        console.log(`deposition created on Zenodo  for ${document.slug} `)
        await zenodo.files.upload({
          filename: document.slug + '.pdf',
          data: document.fileBuffer,
          deposition: buildZenodoDocument(document, options),
        })
        console.log(`PDF file uploaded on Zenodo for ${document.slug} `)
      } else {
        console.log(
          'No deposition published on Zenodo : No file available to upload for ',
          document.slug
        )
      }
      return document
    }
    const uploadAndPublishOnZenodo = async (document) => {
      document = await uploadArticleFileOnZenodo(document)
      document = await publishArticleOnZenodo(document)
      return document
    }
    const result = await Promise.all(
      articles
        // filter published articles only. It is done earlier in the fetch but it makes it more resilient
        .filter((article) => article.published)
        .map(
          async (document) =>
            await queue.add(async () => {
              return await uploadAndPublishOnZenodo(document)
            })
        )
    )
    return result
  } catch (error) {
    console.log('error while publishing on Zenodo: ', error)
  }
}
