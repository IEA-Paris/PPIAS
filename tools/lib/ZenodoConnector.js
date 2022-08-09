'use strict'
// taken from https://github.com/cheminfo/zenodo. Hats off & ty to the author
const axios = require('axios')

const defaultOptions = {
  protocol: 'https',
  host: 'sandbox.zenodo.org',
  pathPrefix: '/api/',
}

const kBaseRequest = Symbol('baseRequest')
const kBaseUrl = Symbol('baseUrl')
const kBaseHeaders = Symbol('baseHeaders')
const kRequest = Symbol('request')
const kSublevel = Symbol('sublevel')

function getAxios(options) {
  return axios.create(
    Object.assign(
      {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      },
      options
    )
  )
}

class ZenodoApi {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options)
    if (!options.token) {
      throw new Error('token option must be provided')
    }
    const baseURL = options.protocol + '://' + options.host + options.pathPrefix
    const baseHeaders = {
      Accept: 'application/json',
      Authorization: 'Bearer:' + options.token,
    }
    this[kBaseUrl] = baseURL
    this[kBaseHeaders] = baseHeaders
    this[kRequest] = this[kBaseRequest]
    this[kSublevel] = {}
  }

  get depositions() {
    return (
      this[kSublevel].depositions ||
      (this[kSublevel].depositions = new ZenodoApiDepositions(
        this[kBaseUrl],
        this[kBaseHeaders]
      ))
    )
  }

  get files() {
    return (
      this[kSublevel].files ||
      (this[kSublevel].files = new ZenodoApiFiles(
        this[kBaseUrl],
        this[kBaseHeaders]
      ))
    )
  }
}

class ZenodoApiDepositions {
  constructor(baseUrl, baseHeaders) {
    this[kRequest] = getAxios({
      baseURL: baseUrl + 'deposit/depositions',
      headers: baseHeaders,
    })
  }

  list(options) {
    return this[kRequest].get('', {
      params: options,
    })
  }

  create(options = {}) {
    const { metadata = {} } = options
    return this[kRequest].post('', { metadata })
  }

  retrieve(options = {}) {
    const { id } = options
    return this[kRequest].get(`/${id}`)
  }

  update(options = {}) {
    const { id, metadata = {} } = options
    return this[kRequest].put(`/${id}`, { metadata })
  }

  delete(options) {
    const { id } = options
    return this[kRequest].delete(`/${id}`)
  }

  publish(options = {}) {
    const { id } = options
    return this[kRequest].post(`/${id}/actions/publish`)
  }

  edit(options = {}) {
    const { id } = options
    return this[kRequest].post(`/${id}/actions/edit`)
  }

  discard(options = {}) {
    const { id } = options
    return this[kRequest].post(`/${id}/actions/discard`)
  }

  newversion(options = {}) {
    const { id } = options
    return this[kRequest].post(`/${id}/actions/newversion`)
  }

  files(options = {}) {
    const { id } = options
    return this[kRequest].get(`/${id}/files`)
  }

  sort(options = {}) {
    const { id, data } = options
    return this[kRequest].put(`/${id}/files`, data)
  }
}

class ZenodoApiFiles {
  constructor(baseUrl, baseHeaders) {
    this[kRequest] = getAxios({
      baseURL: baseUrl + 'files',
      headers: baseHeaders,
    })
  }

  upload(options = {}) {
    const {
      deposition,
      filename,
      contentType = 'application/octet-stream',
      data,
    } = options
    const bucketId = deposition ? getBucketId(deposition) : options.bucketId
    return this[kRequest].put(`/${bucketId}/${filename}`, data, {
      headers: {
        'Content-Type': contentType,
      },
    })
  }

  delete(options = {}) {
    const { deposition, versionId, filename } = options
    const bucketId = deposition ? getBucketId(deposition) : options.bucketId
    return this[kRequest].delete(`/${bucketId}/${filename}`, {
      params: {
        versionId,
      },
    })
  }
}

function getBucketId(deposition) {
  return deposition.links.bucket.replace(/.*\//, '')
}

module.exports = ZenodoApi
