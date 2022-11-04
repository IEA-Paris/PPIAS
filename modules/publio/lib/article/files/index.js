export default async (routesToPrint, fn, nuxt) => {
  console.log('nuxt-pdf: Starting nuxt instance ')
  const puppeteer = require('puppeteer')
  const { PDFDocument: Document } = require('pdf-lib')

  // Check if we need to run Nuxt in development mode
  if (process.env.NODE_ENV === 'production') {
    const { loadNuxt } = require('nuxt')
    nuxt = await loadNuxt('start')
  }
  // Get a ready to use Nuxt instance
  const listener = await nuxt.server.listen()
  const url = listener.url
  console.log('Get a ready to use Nuxt instance')
  const meta = {}
  const browser = await puppeteer.launch(
    /*  Object.assign( */
    {
      headless: true,
    }
    /*    options.puppeteer 
    ) */
  )
  // generate the PDFs, thumbnails, & whatever we need <3
  Object.keys(routesToPrint).forEach(async (category) => {
    console.log('generating files from category: ', category)
    await routesToPrint[category].forEach(
      async (route) => await fn[category](route, url, meta, browser)
    )
  })

  return true
}
