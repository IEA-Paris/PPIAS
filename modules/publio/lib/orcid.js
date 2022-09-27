/* /* Rationale:
If author has an ORCID, we fetch the related public Record 
If author has none, we search for firstname/lastname/institution and automatch if there is only one result (with confirmation by the author during th enrolment micro-service phase)
 */

/**
 * Taken showhere from a basis Created by michaelcrabb on 05/03/2017. WIP//TODO complete rewriting/refactoring
 */
/*
const axios = require('axios')

const defaultOptions = {
  protocol: 'https',
  host: 'sandbox.orcid.org',
  pathPrefix: '/oauth/token/',
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

class OrcidApi {
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
    // get a token
    this.searchToken = this[kRequest].post('', {
      params: {
        client_id: process.env.ORCID_SANDBOX_ID,
        client_secret: process.env.ORCID_SANDBOX_SECRET_KEY_ID,
        grant_type: 'client_credentials',
        scope: '/read-public',
      },
    })
  }

  list(options) {
    return this[kRequest].get('', {
      params: options,
    })
  }
   get token() {
    return (
      this[kSublevel].depositions ||
      (this[kSublevel].token = new OrcidApiDepositions(
        this[kBaseUrl],
        this[kBaseHeaders]
      ))
    )
  } 

  get files() {
    return (
      this[kSublevel].files ||
      (this[kSublevel].files = new OrcidApiSearch(
        this[kBaseUrl],
        this[kBaseHeaders]
      ))
    )
  }
}
class OrcidApiSearch {
  constructor(baseUrl, baseHeaders) {
    this[kRequest] = getAxios({
      baseURL: baseUrl + 'oauth/token/',
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
function createORCIDProfile(orcidID, elementID) {
  const ORCIDLink = 'https://pub.orcid.org/v2.0/' + orcidID + '/works'

  fetch(
    ORCIDLink,

    {
      headers: {
        Accept: 'application/orcid+json',
      },
    }
  )
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        )
        return
      }

      // Examine the text in the response
      response.json().then(function (data) {
        /// /DEBUG!
        // console.log(data);

        let output = ''
        for (const i in data.group) {
          // PAPER NAME
          if (data.group[i]['work-summary']['0'].title.title.value != null) {
            const publicationName =
              data.group[i]['work-summary']['0'].title.title.value
          }

          // PUBLICATION YEAR
          if (data.group[i]['work-summary']['0']['publication-date'] != null) {
            const publicationYear =
              data.group[i]['work-summary']['0']['publication-date'].year.value
          } else {
            const publicationYear = ''
          }

          // DOI REFERENCE
          if (data.group[i]['external-ids']['external-id'].length != 0) {
            for (const j in data.group[i]['external-ids']['external-id']) {
              if (
                data.group[i]['external-ids']['external-id'][j][
                  'external-id-type'
                ] == 'doi'
              ) {
                const doiReference =
                  data.group[i]['external-ids']['external-id'][j][
                    'external-id-value'
                  ]
                break
              }
            }
          } else {
            const doiReference = ''
          }

          // JOURNAL NAME
          const putcode = data.group[i]['work-summary']['0']['put-code']
          // console.log(journalTitle);

          output +=
            "<p><span id='publication_" +
            i +
            "'><strong>" +
            publicationName +
            '</strong>'
          output += ' (' + publicationYear + ') </em></span>'
          output +=
            " <a href='https://doi.org/" +
            doiReference +
            "'> " +
            doiReference +
            '</a></p>'
          getJournalTitle(orcidID, putcode, i)
        }

        document.getElementById(elementID).innerHTML = output
      })
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err)
    })
}

function getJournalTitle(orcidID, journalID, i) {
  const ORCIDLink =
    'https://pub.orcid.org/v2.0/' + orcidID + '/work/' + journalID
  fetch(ORCIDLink, {
    headers: {
      Accept: 'application/orcid+json',
    },
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        )
        return
      }
      response.json().then(function (data) {
        if (data['journal-title'] != null) {
          const output = data['journal-title'].value
          document.getElementById('publication_' + i).innerHTML =
            document.getElementById('publication_' + i).innerHTML + output
        }
      })
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err)
    })
}

function createORCIDFundingProfile(orcidID, elementID) {
  const ORCIDLink = 'https://pub.orcid.org/v2.0/' + orcidID + '/fundings'

  fetch(
    ORCIDLink,

    {
      headers: {
        Accept: 'application/orcid+json',
      },
    }
  )
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        )
        return
      }
      response.json().then(function (data) {
        /// /DEBUG!
        // console.log(data);

        const output = ''
        for (const i in data.group) {
          // GET PUT CODES
          const putcode = data.group[i]['funding-summary']['0']['put-code']
          getFundingInformation(putcode, orcidID, elementID)
        }

        document.getElementById(elementID).innerHTML = output
      })
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err)
    })
}

function getFundingInformation(putcode, orcidID, elementID) {
  const ORCIDLink =
    'https://pub.orcid.org/v2.0/' + orcidID + '/funding/' + putcode

  fetch(
    ORCIDLink,

    {
      headers: {
        Accept: 'application/orcid+json',
      },
    }
  )
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        )
        return
      }
      response.json().then(function (data) {
        /// /DEBUG!
        console.log(data)

        if (data.title != null) {
          const fundingTitle = data.title.title.value
        } else {
          const fundingTitle = ''
        }

        if (data['organization-defined-type'].value != null) {
          const fundingType = data['organization-defined-type'].value
        } else {
          const fundingType = ''
        }

        if (data.organization.name != null) {
          const fundingBody = data.organization.name
        } else {
          const fundingBody = ''
        }

        if (data['start-date'].year != null) {
          const startDate = data['start-date'].year.value
        } else {
          const startDate = ''
        }

        let output = '<p>'
        output += '<strong>' + fundingTitle + '</strong> '
        output += '(' + startDate + '), '
        output += fundingBody + ' <em>(' + fundingType + ')</em>'
        output += '</p>'

        document.getElementById(elementID).innerHTML =
          output + document.getElementById(elementID).innerHTML
      })
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err)
    })
}
module.exports = OrcidApi
 */
