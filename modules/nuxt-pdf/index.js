/* This module is originally bases on a work licenced as follows
================
The MIT License (MIT)

Copyright (c) 2020 Christian Hansen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
===============
 */

const fs = require('fs')
const path = require('path')

const { PDFDocument: Document } = require('pdf-lib')

const chalk = require('chalk')
const puppeteer = require('puppeteer')

const defaults = require('./module.defaults')

const supportedFormats = [
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'letter',
  'legal',
  'tabloid',
]

export const promisifyRoute = function promisifyRoute(fn, ...args) {
  // If routes is an array
  if (Array.isArray(fn)) {
    return Promise.resolve(fn)
  }
  // If routes is a function expecting a callback
  if (fn.length === arguments.length) {
    return new Promise((resolve, reject) => {
      fn((err, routeParams) => {
        if (err) {
          reject(err)
        }
        resolve(routeParams)
      }, ...args)
    })
  }
  let promise = fn(...args)
  if (
    !promise ||
    (!(promise instanceof Promise) && typeof promise.then !== 'function')
  ) {
    promise = Promise.resolve(promise)
  }
  return promise
}

// eslint-disable-next-line require-await
async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// eslint-disable-next-line require-await
module.exports = async function PDF(moduleOptions) {
  const options = Object.assign({}, defaults, moduleOptions, this.options.pdf)

  const i18n = {
    enabled: options.i18n,
    domains: {},
    options: {},
  }

  if (i18n.enabled) {
    i18n.options = Object.assign(
      {},
      this.options.i18n,
      (this.options.modules.find(
        (x) => Array.isArray(x) && x[0] === 'nuxt-i18n'
      ) || [('', {})])[1],
      (this.options.buildModules.find(
        (x) => Array.isArray(x) && x[0] === 'nuxt-i18n'
      ) || [('', {})])[1]
    )

    for (const locale of i18n.options.locales) {
      if ('domain' in locale && 'code' in locale) {
        i18n.domains[locale.code] = locale.domain
      }
    }
  }

  let routeMap
  let url

  /*
   * Add pdf styling to render.
   */
  this.options.css.push(path.resolve(__dirname, 'css/pdf.css'))

  if (options.pdf.format) {
    const format = options.pdf.format.toLowerCase()

    if (supportedFormats.includes(format)) {
      this.options.css.push(path.resolve(__dirname, 'css/' + format + '.css'))
    } else {
      console.error(
        chalk.bgRed.black(' ERROR ') +
          " Unable to find format ('" +
          options.pdf.format +
          "')"
      )
      return
    }
  }

  this.nuxt.hook('listen', (_, router) => (url = router.url.toString()))
  this.nuxt.hook('build:compile', () => {
    routeMap = require(path.resolve(this.options.buildDir, 'routes.json'))
  })

  /*
   * Extending the generated routes with pdf requested routes.
   */
  this.nuxt.hook('generate:extendRoutes', async (routes) => {
    const generatedRoutes = await promisifyRoute(options.routes || [])

    for (let i = 0; i < generatedRoutes.length; i++) {
      const route = generatedRoutes[i]

      if (routes.filter((r) => r.route === route.route).length > 0) {
        continue
      }

      routes.push({
        route: route.route,
        payload: null,
      })
    }
  })

  const getUrl = (path, locale) => {
    const chunk = routeMap.find(
      // eslint-disable-next-line eqeqeq
      (route) => route.path == path.split('?')[0].split('#')[0]
    )

    // if (chunk === undefined && path != '/*/') {
    //  return getUrl('/*/', locale)
    // }

    if (chunk === undefined)
      throw new Error(
        'Unable to find route at ' + path.split('?')[0].split('#')[0]
      )

    const routes = routeMap.filter(
      // eslint-disable-next-line eqeqeq
      (route) => route.chunkName == chunk.chunkName
    )

    let uri = ''
    const protocol = new URL(url).protocol

    if (i18n.enabled && typeof locale !== 'undefined') {
      const routesNameSeparator = i18n.options.routesNameSeparator || '___'
      const route = routes.find(
        (route) =>
          route.name.endsWith(
            routesNameSeparator + locale + routesNameSeparator + 'default'
          ) || route.name.endsWith(routesNameSeparator + locale)
      )

      if (i18n.options.differentDomains) {
        if (locale in i18n.domains) {
          uri = protocol + '//' + i18n.domains[locale].replace(/\/$/, '') + path
        } else {
          uri = url.replace(/\/$/, '') + path
        }
      } else {
        uri = url.replace(/\/$/, '') + path
      }
    } else {
      uri = url.replace(/\/$/, '') + path
    }
    return uri
  }

  async function build(buildArgs) {
    let nuxt
    let listener
    try {
      if (buildArgs.generated) {
        console.log('nuxt-pdf: Starting nuxt instance p')
        const { loadNuxt } = require('nuxt')

        // Check if we need to run Nuxt in development mode
        const isDev = process.env.NODE_ENV !== 'production'

        // Get a ready to use Nuxt instance
        const nuxt = await loadNuxt(isDev ? 'dev' : 'start')
        listener = await nuxt.server.listen()
      }

      url = listener.url
    } catch (e) {
      console.log(
        "nuxt-pdf: If this is part of npm run generate be sure to run 'npm run build first'"
      )
    }

    const routes = await promisifyRoute(options.routes || [])

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i]
      /*      console.log(
        chalk.cyan('↻') +
          ` Generating PDF ${i + 1}:${routes.length} at route ` +
          route.route
      ) */

      try {
        // Merge route meta with defaults from config.
        const meta = Object.assign({}, options.meta, route.meta)

        const browser = await puppeteer.launch(
          Object.assign(
            {
              headless: true,
            },
            options.puppeteer
          )
        )

        const page = await browser.newPage()
        await page.goto(`${url.replace(/\/$/, '')}${route.route}`, {
          waitUntil: 'networkidle2',
        })

        if (options.viewport || route.viewport) {
          page.setViewport(
            Object.assign(
              {},
              {
                ...options.viewport,
                ...route.viewport,
              }
            )
          )
        }
        // Generate pdf based on dom content. (result by bytes)
        const bytes = await page.pdf(
          Object.assign(
            {},
            {
              ...options.pdf,
              ...route.pdf,
            }
          )
        )

        // Load bytes into pdf document, used for manipulating meta of file.
        const document = await Document.load(bytes)

        // Set the correct meta for pdf document.
        if ('title' in meta && meta.title !== '') {
          document.setTitle(
            (meta.titleTemplate || '%s').replace('%s', meta.title)
          )
        } else {
          document.setTitle(await page.title())
        }

        document.setAuthor(meta.author || '')
        document.setSubject(meta.subject || '')
        document.setProducer(meta.producer || '')
        document.setCreationDate(new Date(meta.creationDate) || new Date())
        document.setKeywords(meta.keywords || [])
        document.setLanguage(meta.language || '')

        const file = path.resolve(
          buildArgs.generated ? 'dist' : options.dir,
          route.file
        )

        // Create folder where file will be stored.
        fs.mkdirSync(file.substring(0, file.lastIndexOf('/')), {
          recursive: true,
        })

        // Write document to file.
        const ws = fs.createWriteStream(file)
        ws.write(await document.save())
        ws.end()
        if (buildArgs.generated) {
          // also write it in static to commit to source code (used to generate DOI)
          const file2 = path.resolve(options.dir, route.file)
          // Create folder where file will be stored.
          fs.mkdirSync(file2.substring(0, file2.lastIndexOf('/')), {
            recursive: true,
          })
          const ws2 = fs.createWriteStream(file)
          ws2.write(await document.save())
          ws2.end()
        }
        console.log(
          `${chalk.green('✔')}  Generated PDF ${i + 1}:${
            routes.length
          } at file '${file} (${document.getTitle()})`
        )
        if (buildArgs.generated && !route.keep) {
          await fs.unlinkSync(`./dist${route.route}/index.html`)
          console.log(
            `${chalk.green('✔')}  Removed route index file used for PDF at ${
              route.route
            }`
          )
          await fs.rmdirSync(`./dist${route.route}`)
          console.log(
            `${chalk.green('✔')}  Removed route directory used for PDF at ${
              route.route
            }`
          )
        }
        await page.close()
        await browser.close()
      } catch (e) {
        console.log(
          `${chalk.red('𐄂')} Failed to generated PDF ${i + 1}:${
            routes.length
          } at route ${route.route} error: ${e.message}`
        )
      }
    }

    if (nuxt) {
      await listener.close()
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    this.nuxt.hook('build:compiled', async ({ name }) => {
      if (name !== 'server') return
      await build({
        generated: false,
      })
    })
  } else {
    this.nuxt.hook('generate:done', async ({ builder }) => {
      await build({
        generated: true,
      })
    })
  }
  return true
}
