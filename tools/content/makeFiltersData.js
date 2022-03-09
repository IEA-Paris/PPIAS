import fs from 'fs'
export default async () => {
  const filters = {}
  const { $content } = require('@nuxt/content')
  // TODO add .only() to limit the data fetched
  const articles = await $content('articles').fetch()
  const categories = await $content('categories').fetch()
  console.log('categories: ', categories)
  // year filter
  filters.years = {
    type: 'Select',
    items: [...new Set(articles.map((article) => article.years))].filter(
      (item) => item !== null && item !== '' && item
    ),
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
    items: [...new Set(articles.map((article) => article.language))].filter(
      (item) => item !== null && item !== ''
    ),
  }
  // issue filters
  filters.issue = {
    type: 'Select',
    items: [...new Set(articles.map((article) => article.issue))].filter(
      (item) => item !== null && item !== ''
    ),
  }
  // Keyword filters
  filters.tags = {
    type: 'Autocomplete',
    items: [...new Set(articles.map((article) => article.tags).flat())].filter(
      (item) => item
    ),
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
    ].filter((item) => item),
  }
  // category filters
  filters.category = {
    type: 'Autocomplete',
    items: [
      ...new Set(
        articles
          .map((article) => [
            ...(article.category_1 ? [article.category_1.slice(19, -3)] : []),
            ...(article.category_2 ? [article.category_2.slice(19, -3)] : []),
          ])
          .flat()
          .filter((item) => item.length)
      ),
    ],
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
      filters: {... filters, tags: mediaTags},
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
