import fs from 'fs'

export default (articles, issues) => {
  const uniqueFilterItems = (filterItems) =>
    [...new Set(filterItems)].filter((item) => item).sort((a, b) => a - b)

  // year filter
  const years = uniqueFilterItems(
    articles
      .map((article) => article.years)
      .filter((item) => item !== null && item !== '' && item)
  )

  // language filters
  const language = uniqueFilterItems(
    articles.map((article) => article.language)
  )

  // issue filters (pruned, sorted by date desc)
  const issue = issues
    .filter(
      (issue) =>
        articles.find(
          (article) =>
            article.issue &&
            article.published &&
            issue.path === article.issue.slice(7, -3)
        )?.slug || null
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((item) => ({ text: item.title, value: item.slug }))
    .filter((item) => item)

  // discipline filters
  const discipline = uniqueFilterItems(
    articles.map((article) => article.disciplines).flat()
  )

  // Thematics filters
  const thematic = uniqueFilterItems(
    articles.map((article) => article.thematics).flat()
  )

  // Types filters
  const type = uniqueFilterItems(
    articles.map((article) => article.types).flat()
  )

  // Keyword filters
  const tag = uniqueFilterItems(articles.map((article) => article.tag).flat())

  // Media keyword filters
  const mediaTags = uniqueFilterItems(
    articles
      .map((article) => {
        return article.media && article.media.length ? article.tags : []
      })
      .flat()
  )

  const filters = {
    years: { type: 'Select', items: years },
    language: { type: 'Select', items: language },
    issue: { type: 'Autocomplete', items: issue },
    discipline: { type: 'Autocomplete', items: discipline },
    thematic: { type: 'Autocomplete', items: thematic },
    type: { type: 'Autocomplete', items: type },
    tag: { type: 'Autocomplete', items: tag },
  }

  const mediaTagFilter = { type: 'Autocomplete', items: mediaTags }

  fs.writeFileSync(
    './static/generated/filters.js',
    `/* eslint-disable prettier/prettier */
  const filters = ${JSON.stringify(filters)};
  const mediaTagFilter = ${JSON.stringify(mediaTagFilter)};
  export default {
    articles: {
      filters,
      sort:{}
  
    },
    media: {
      filters: {...filters, tag: mediaTagFilter},
      sort:{}
    },
    authors: {
      filters: {
        years: filters.years,
        language: filters.language,
        issue: filters.issue
      },
      sort:{}
    }
  }`
  )

  return filters
}
