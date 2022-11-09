export default async (routesToPrint, fn, nuxt) => {
  try {
    let server
    console.log('pdf: Starting nuxt instance ')

    // Check if we need to run Nuxt in development mode
    if (process.env.NODE_ENV === 'production') {
      const handler = require('serve-handler')
      const http = require('http')

      server = await http.createServer((request, response) => {
        // You pass two more arguments for config and middleware
        // More details here: https://github.com/vercel/serve-handler#options
        return handler(request, response, {
          public: 'dist',
          /*     rewrites: [
            {
              source: '/print/:id',
              destination: '/print/:id/index.html',
            },
          ], */
        })
      })

      server.listen(3000, () => {
        console.log('Running at http://localhost:3000')
      })
    }

    // Get a ready to use Nuxt instance
    const url = 'http://localhost:3000'
    console.log('url: ', url)
    const meta = {}

    // generate the PDFs, thumbnails, & whatever we need <3
    for (const category of Object.keys(routesToPrint)) {
      console.log('generating files from category: ', category)
      for (const route of routesToPrint[category]) {
        await fn[category](route, url, meta)
      }
    }
    server.close()
    return true
  } catch (error) {
    console.log('error during file generation: ', error)
  }
}
