import Citation from 'citation-js'
import { cleanupString } from '../../utils/contentUtilities'
const fs = require('fs')
export default (article, media, authors, issues, options) => {
  try {
    // TODO add more output plugins
    const styles = ['apa', 'vanvouver', 'harvard1'] // TODO import from config
    // TODO fix the issue with numbered lists in hardvard1 & co
    const date = new Date(article.createdAt).toLocaleDateString('EN', {
      timezone: 'UTC',
    })
    const issue = issues.reverse().find((issue, index) => {
      if (issue.slug === article.issue.slice(15, -3)) {
        article.issueIndex = index + 1
        return true
      } else return false
    })
    const references = article.biblioFile
      ? // sorry for the lack of functionalism :p
        new Citation(
          fs.readFileSync('./static/' + article.biblioFile, 'utf8')
        ).data.map((item) =>
          new Citation(item)
            .format('bibliography', {
              format: 'text',
              template: 'apa',
              lang: 'en-US',
            })
            // to avoid html relics in Zenodo
            .replace('\n', '')
        )
      : []
    const metadata = {
      upload_type: 'publication',
      abstract: article.abstract || 'No description provided',
      publication_type: 'conferencepaper',
      ...(article.tags && { keywords: article.tags }),
      references,
      language: 'eng', // TODO bind to i18n config settings
      access_right: 'open',
      license: 'CC-BY-NC-4.0',
      // TODO handle the following conditionnaly (i.e. if relevant)
      // cf https://developers.zenodo.org/?shell#representation
      // conference_title:
      // conference_acronym
      // conference_dates
      // conference_place
      // conference_url
      // conference_session
      // location: [{"lat": 34.02577, "lon": -118.7804, "place": "Los Angeles"}, {"place": "Mt.Fuji, Japan", "description": "Sample found 100ft from the foot of the mountain."}]
      // TODO uncomment this once we are out of sandbox. Test DOI trigger a 400 (bad request error) since they are not legit
      // ...(article.DOI && { doi: article.DOI }),
      ...(article.issue && {
        journal_issue: article.issue.slice(15, -3),
      }),
      conference_dates: article.date,
      conference_place:
        article.location || "PARIS IAS, 17 Quai d'Anjou 75004 Paris",
      ...(article.issue && {
        conference_title: article.issue.slice(15, -3),
      }),
      ...(article.issue && {
        conference_title: article.issue.slice(15, -3),
      }),
      communities: [
        /* TODO add once the official release is done { identifier: 'publiio' } */
        {
          identifier: 'pias',
        },
      ],
      journal_title: cleanupString(options.config.full_name),
      prereserve_doi: article.needDOI !== false,
      publication_date: new Date(article.date).toLocaleDateString('en-US', {
        timezone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      // TODO
      // - add DOI and ISSN as related identifiers (extra),
      // - same issue articles,
      // - cites relation (when a DOI is provided in the citation)
      // - as well as semantic stuff
      //  e.g.  related_identifiers: [{'relation': 'isPartOf', 'identifier':'2826-2832'},{'relation': 'isSupplementTo', 'identifier':'10.1234/foo'}, {'relation': 'cites', 'identifier':'https://doi.org/10.1234/bar', 'resource_type': 'image-diagram'}]
      //     [
      // {identifier: 'ISSN': '2826-2832'}
      //     ],
      title: article.article_title,
      creators: article.authors.map((item) => {
        // TODO include all title & institution info
        return {
          name: item.lastname.trim() + ', ' + item.firstname.trim(),
          ...(item.positions_and_institutions &&
            item.positions_and_institutions[0] &&
            item.positions_and_institutions[0].institution && {
              affiliation: item.positions_and_institutions[0].institution,
            }),
          ...(item?.orcid && { orcid: item.orcid }),
        }
      }),
    }
    // make a json like object
    const docData = {
      abstract: article.abstract,
      address: options.config.address, // TODO update with other IAS/journals city
      type: 'proceedings',
      keywords: article.tags || [],
      // TODO conference_url: TO BE COMPLETED
      language: article.language || 'en',
      conference_dates: article.date,
      conference_place:
        article.location || "PARIS IAS, 17 Quai d'Anjou 75004 Paris",
      ...(article.issue && {
        conference_title: article.issue.slice(15, -3),
      }),
      ...(article.issue && {
        conference_title: article.issue.slice(15, -3),
      }),
      journal: {
        name: 'Proceedings of the Paris Institute for Advanced Study', // TODO load from config
        acronym: 'PPIAS', // TODO load from config
        shortcode: 'PPIAS', // TODO load from config
        ...(issue && { issue: issue.name_of_the_issue }),
        ...(article.place && { place: article.place }),
        volume: article.issueIndex,
        identifier: [
          ...(options.config.identifier.ISSN
            ? [
                {
                  id: options.config.identifier.ISSN,
                  type: 'issn',
                },
              ]
            : []),
          ...(article.DOI
            ? [
                {
                  id: article.DOI,
                  type: 'DOI',
                  url: 'http://dx.doi.org/' + article.DOI,
                },
              ]
            : []),
        ],
      },
      identifier: [
        {
          ...(article.DOI && {
            type: 'DOI',
            id: article.DOI,
            url:
              'http://dx.doi.org/' +
              article.DOI +
              (options.config.identifier.ISSN
                ? '/ISSN-' + options.config.identifier.ISSN
                : ''),
          }),
        },
      ],
      ...(article.issue && {
        journal_issue: article.issue.slice(15, -3),
      }),
      ...(article.issue && {
        conference_title: article.issue.slice(15, -3),
      }),
      ...(article.issue && {
        conference_title: article.issue.slice(15, -3),
      }),
      link: [{ url: options.config.url + '/articles/' + article.slug }],
      accessed: {
        'date-parts': [new Date().toISOString()],
      },
      issued: {
        'date-parts': [date],
      },
      month: new Date(article.createdAt).toLocaleString('en-US', {
        month: 'short',
      }),
      year: new Date(article.createdAt).getFullYear(),
      title: article.article_title,
      author: article.authors.map((item) => {
        // TODO include all title & institution info
        return {
          name: item.lastname + ', ' + item.firstname,
          firstname: item.firstname,
          lastname: item.lastname,
          id: item.lastname,
          ...(item.positions_and_institutions &&
            item.positions_and_institutions[0] &&
            item.positions_and_institutions[0].institution && {
              affiliation: item.positions_and_institutions[0].institution,
            }),
          ...(item?.orcid && { orcid: item?.orcid }),
        }
      }),
      license: [
        {
          type: 'creative-commons',
          url: 'https://creativecommons.org/licenses/by/4.0/',
          description: 'Creative Commons Attribution 4.0 International',
          jurisdiction: 'universal',
        },
      ],
    }

    article.toCite = styles
      .map((style) => {
        const obj = new Citation(docData).format('bibliography', {
          format: 'html',
          template: style,
          lang: 'en-US',
        })
        return { [style]: obj }
      })
      .reduce((rst, tick) => Object.assign(rst, tick), {})

    return [article, media, authors, issues, options]
  } catch (error) {
    console.log('error generating citation references: ', error)
  }
}
