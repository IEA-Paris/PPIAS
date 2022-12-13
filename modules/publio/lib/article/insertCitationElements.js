import Citation from 'citation-js'
const fs = require('fs')

export default (article, media, authors, issues, options) => {
  // TODO add more output plugins
  const styles = ['apa', 'vanvouver', 'harvard1'] // TODO import from config
  // TODO fix the issue with numbered lists in hardvard1 & co
  const date = new Date(article.createdAt).toLocaleDateString('EN', {
    timezone: 'UTC',
  })
  const issue = issues.find((issue, index) => {
    if (issue.slug === article.issue.slice(15, -3)) {
      article.issueIndex = index + 1
      return true
    } else return false
  })

  // make a json like object
  const docData = {
    abstract: article.abstract,
    address: options.config.address, // TODO update with other IAS/journals city
    type: 'article',
    keywords: article.tags || [],
    // TODO conference_url: TO BE COMPLETED
    language: article.language || 'en',
    journal: {
      name: 'Proceedings of the Paris Institute for Advanced Study', // TODO load from config
      acronym: 'PPIAS', // TODO load from config
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
        type: 'copyheart',
        url: 'http://copyheart.org/manifesto/',
        description: 'A great license',
        jurisdiction: 'universal',
      },
    ],
  }
  console.log('docData: ', docData)

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
}
