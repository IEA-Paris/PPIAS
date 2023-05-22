import Citation from 'citation-js'
import { cleanupString } from '../../../utils/contentUtilities'
export default (document, options) => {
  const fs = require('fs')
  const references = document.biblioFile
    ? // sorry for the lack of functionalism :p
      new Citation(
        fs.readFileSync('./static/' + document.biblioFile, 'utf8')
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
    description: document.abstract || 'No description provided',
    publication_type: 'conferencepaper',
    ...(document.tags && { keywords: document.tags }),
    references,
    language: 'eng', // TODO bind to i18n config settings
    access_right: 'open',
    license: 'CC-BY-NC-4.0',
    // TODO handle the following conditionnaly (i.e. if relevant)
    // cf https://developers.zenodo.org/?shell#representation
    // conference_title:
    // conference_acronym
    // location: [{"lat": 34.02577, "lon": -118.7804, "place": "Los Angeles"}, {"place": "Mt.Fuji, Japan", "description": "Sample found 100ft from the foot of the mountain."}]
    // TODO uncomment this once we are out of sandbox. Test DOI trigger a 400 (bad request error) since they are not legit
    // ...(document.DOI && { doi: document.DOI }),
    ...(document.issue && {
      journal_issue:
        options.filters.issue.items.find(
          (item) => item.value === document.issue.slice(15, -3)
        )?.text || document.issue.slice(15, -3),
    }),
    conference_dates: new Date(document.date).toLocaleDateString('en-US', {
      timezone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    conference_place:
      document.location ||
      options.config.address ||
      "17, Quai d'Anjou 75004 PARIS - FRANCE",
    ...(document.issue && {
      conference_title:
        options.filters.issue.items.find(
          (item) => item.value === document.issue.slice(15, -3)
        )?.text || document.issue.slice(15, -3),
    }),
    conference_url:
      options.config.url + '/issue/' + encodeURI(document.issue.slice(15, -3)),
    // TODO
    // conference session > to the subissue
    // conference part (see if subissue or session takes over)
    communities: [
      /* TODO add once the official release is done { identifier: 'publiio' } */
      {
        identifier: options.config.modules.zenodo.community,
      },
    ],
    journal_title: cleanupString(options.config.full_name),
    prereserve_doi: document.needDOI !== false,
    publication_date: new Date(document.date).toLocaleDateString('en-US', {
      timezone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    // TODO
    // - same issue articles,
    // - cites relation (when a DOI is provided in the citation)
    // - as well as semantic stuff
    //  e.g.  related_identifiers: [{'relation': 'isPartOf', 'identifier':'2826-2832'},{'relation': 'isSupplementTo', 'identifier':'10.1234/foo'}, {'relation': 'cites', 'identifier':'https://doi.org/10.1234/bar', 'resource_type': 'image-diagram'}]

    title: document.article_title,
    creators: document.authors.map((item) => {
      // TODO include all title & institution info
      return {
        name:
          item.lastname.trim() +
          (item.is_institution ? ', ' + item.firstname?.trim() : ''),
        ...(item.positions_and_institutions &&
          item.positions_and_institutions[0] &&
          item.positions_and_institutions[0].institution && {
            affiliation: item.positions_and_institutions[0].institution,
          }),
        ...(item?.orcid && { orcid: item.orcid }),
      }
    }),
  }
  return metadata
}
