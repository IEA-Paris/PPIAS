const fs = require('fs')
const path = require('path')

const { PDFDocument: Document } = require('pdf-lib')

const chalk = require('chalk')
export default async (routes) => {
  console.log('nuxt-pdf: Starting nuxt instance ')
  const { loadNuxt } = require('nuxt')

  // Check if we need to run Nuxt in development mode
  const isDev = process.env.NODE_ENV !== 'production'

  // Get a ready to use Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')
  const listener = await nuxt.server.listen()
  console.log('listener: ', listener)
  const url = listener.url
  console.log('url: ', url)
}
