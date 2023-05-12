export default async (articles, options, queue) => {
  try {
    const fs = require('fs')
    const path = require('path')
    const Zenodo = require('../../../utils/ZenodoConnector')
    const zenodo = await new Zenodo({
      host: options.config.modules.zenodo.sandbox
        ? 'sandbox.zenodo.org'
        : 'zenodo.org',
      token: options.config.modules.zenodo.sandbox
        ? options.config.modules.zenodo.sandboxToken
        : options.config.modules.zenodo.token,
      protocol: 'https',
    })
    console.log('STARTING UPLOAD & PUBLISH ON ZENODO')
    const publishArticleOnZenodo = async (document) => {
      await zenodo.depositions.publish({
        id: document.Zid,
      })
      console.log(`${document.slug} successfully published on Zenodo `)
      return document
    }

    const uploadArticleFileOnZenodo = async (document) => {
      const resolvedPath = path.resolve(
        process.env.NODE_ENV !== 'production' ? 'static/pdfs' : 'pdfs',
        `${document.slug}.pdf`
      )
      console.log('resolvedPath: ', resolvedPath)
      try {
        // check if the file exists
        if (fs.existsSync(resolvedPath)) {
          /*          console.log('it exist (links): ', document.links)
          console.log('it exist (todo): ', document.todo) */
          document.fileBuffer = fs.readFileSync(resolvedPath)
        } else {
          console.log('it DOES NOT exist: ', document.slug)
          document.fileBuffer = false
        }
        if (document.fileBuffer && document.links.bucket) {
          console.log(`deposition created on Zenodo for ${document.slug}`)
          await zenodo.files.upload({
            filename: `${document.slug}.pdf`,
            data: document.fileBuffer,
            deposition: document,
          })
          console.log(`PDF file uploaded on Zenodo for ${document.slug} `)
        } else {
          console.log(
            `No deposition published on Zenodo: No file available to upload for ${document.slug}`
          )
        }
      } catch (error) {
        console.log(`Error while uploading file to Zenodo: ${error}`)
      }
      return document
    }

    const result = await Promise.all(
      articles
        .map((article) => {
          if (article.todo.publishOnZenodo)
            console.log(
              'article.published && article.todo.publishOnZenodo',
              article.todo.publishOnZenodo
            )
          return article
        })
        .map(
          async (document) =>
            await queue.add(async () => {
              try {
                console.log(
                  'uploading and publishing on Zenodo ',
                  document.slug
                )
                if (document.published) {
                  document = await uploadArticleFileOnZenodo(document)
                  document = await publishArticleOnZenodo(document)
                }
                return document
              } catch (error) {
                console.log(
                  `Error while upload and publish on Zenodo: ${error}`
                )
              }
              return document
            })
        )
    )

    return result
  } catch (error) {
    console.log(`Error while publishing on Zenodo: ${error}`)
  }
}
