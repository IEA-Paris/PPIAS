const path = require('path')
export default async (routesToPrint, fn, url) => {
  try {
    let server
    // Since we target A4, let's load the related CSS.
    // I kept the other formats just in case (inherited from https://github.com/ch99q/nuxt-pdf)
    console.log('pdf: Starting nuxt instance ')
    /*     nuxt.options.css.push(path.resolve(__dirname, 'css/a4.css'))
    nuxt.options.css.push(path.resolve(__dirname, 'css/pdf.css')) */
    // Check if we need to run Nuxt in development mode
    if (process.env.NODE_ENV === 'production') {
      server = require('node-static')

      //
      // Create a node-static server instance to serve the './public' folder
      //
      const file = new server.Server('./dist')

      require('http')
        .createServer(function (request, response) {
          request
            .addListener('end', function () {
              //
              // Serve files!
              //
              file.serve(request, response)
            })
            .resume()
        })
        .listen(3000)
      /*    const handler = require('serve-handler')
      const http = require('http')

      server = await http.createServer((request, response) => {
        // You pass two more arguments for config and middleware
        // More details here: https://github.com/vercel/serve-handler#options
        return handler(request, response, {
          public: 'dist',
          cleanUrls: true,
          /*     rewrites: [
            {
              source: '/print/:id',
              destination: '/print/:id/index.html',
            },
          ],
        })
      })

      server.listen(3000, () => {
        console.log('Running at http://localhost:3000')
      }) */
    }
    console.log('url: ', url)

    // Get a ready to use Nuxt instance
    if (!url) url = 'http://127.0.0.1:3000'

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
