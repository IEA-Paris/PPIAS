export default async (routesToPrint, fn) => {
  console.log('nuxt-pdf: Starting nuxt instance ')
  const { loadNuxt } = require('nuxt')
  const puppeteer = require('puppeteer')
  const { PDFDocument: Document } = require('pdf-lib')

  // Check if we need to run Nuxt in development mode
  const isDev = process.env.NODE_ENV !== 'production'
  let browser = null

  // Get a ready to use Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')
  const listener = await nuxt.server.listen()
  console.log('listener: ', listener)
  const url = listener.url
  const meta = {}
  browser = await puppeteer.launch(
    Object.assign(
      {
        headless: true,
      }
      /*    options.puppeteer */
    )
  )
  console.log('url: ', url)
  // generate the PDFs, thumbnails, & whatever we need <3
  Object.keys(routesToPrint).forEach(async (category) => {
    console.log('generating files from category: ', category)
    await routesToPrint[category].forEach(
      async (route) => await fn[category](route, url, meta, browser)
    )
  })

  return true
}
