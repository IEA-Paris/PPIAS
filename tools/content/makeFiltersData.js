import fs from 'fs'
export default async (content) => {
  const filters = {}
  const { $content } = require('@nuxt/content')
  // TODO add .only() to limit the data fetched
  const articles = await $content('articles', { deep: true })
    .where({ published: true })
    .fetch()
  const issues = await $content('issues', { deep: true })
    .sortBy('date', 'desc')
    .fetch()
  // year filter
  filters.years = {
    type: 'Select',
    items: [...new Set(articles.map((article) => article.years))]
      .filter((item) => item !== null && item !== '' && item)
      .sort((a, b) => a - b),
  }
  /* Too much items to expect - also covered by FTS
    // author filters
    filters.authors = articles.map((article) =>
      articles.map(
        (article) => article?.authors.map((author) => author.lastname) || []
      )
    )
    // institution filters
    filters.authors = articles.map((article) =>
      articles.map(
        (article) =>
          article?.authors.map((author) =>
            author.titles_and_institutions.map((item) => item.institution)
          ) || []
      )
    ) */
  // language filters
  filters.language = {
    type: 'Select',
    items: [...new Set(articles.map((article) => article.language))]
      .filter((item) => item !== null && item !== '')
      .sort((a, b) => a - b),
  }
  // issue filters (pruned, sorted by date desc)
  filters.issue = {
    type: 'Select',
    items: issues
      .filter(
        (issue) =>
          articles.find((article) => {
            return article.issue && issue.path === article.issue.slice(7, -3)
          })?.slug || null
      )
      .map((item) => item.slug)
      .filter((item) => item !== null && item !== ''),
  }

  // Discipline filters
  filters.discipline = {
    type: 'Autocomplete',
    items: [...new Set(articles.map((article) => article.disciplines).flat())]
      .filter((item) => item)
      .sort((a, b) => a - b),
  }
  // Thematics filters
  filters.thematic = {
    type: 'Autocomplete',
    items: [...new Set(articles.map((article) => article.thematics).flat())]
      .filter((item) => item)
      .sort((a, b) => a - b),
  }
  // Types filters
  filters.type = {
    type: 'Autocomplete',
    items: [...new Set(articles.map((article) => article.types).flat())]
      .filter((item) => item)
      .sort((a, b) => a - b),
  }
  // Keyword filters
  filters.tag = {
    type: 'Autocomplete',
    items: [...new Set(articles.map((article) => article.tag).flat())]
      .filter((item) => item)
      .sort((a, b) => a - b),
  }
  // Media keyword filters
  const mediaTags = {
    type: 'Autocomplete',
    items: [
      ...new Set(
        articles
          .map((article) => {
            return article.media && article.media.length ? article.tags : []
          })
          .flat()
      ),
    ]
      .filter((item) => item)
      .sort((a, b) => a - b),
  }

  fs.writeFileSync(
    './assets/generated/filters.js',
    `/* eslint-disable prettier/prettier */
  const filters = ${JSON.stringify(filters)}
  const mediaTags = ${JSON.stringify(mediaTags)}
  export default {
    articles: {
      filters,
      sort:{}
  
    },
    media: {
      filters: {... filters, tag: mediaTags},
      sort:{}
    },
    authors: {
      filters: {
      years: filters.years,
      language: filters.language
      },
      sort:{}
    }
  }`
  )
}
