import Citation from 'citation-js'
const fs = require('fs')

// TODO add more output plugins
export default (article, media, authors, issues, options) => {
  const styles = ['apa', 'vanvouver', 'harvard1']
  const date = new Date(article.createdAt).toLocaleDateString('EN', {
    timezone: 'UTC',
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
      name: 'Proceedings of the Paris Institute for Advanced Study',
      issue: article.issueIndex,
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
        ...(article.doi && {
          type: 'DOI',
          id: article.doi,
          url:
            'http://dx.doi.org/' +
            article.doi +
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
