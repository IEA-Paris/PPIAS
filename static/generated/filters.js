/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2022]},"language":{"type":"Select","items":["English"]},"issue":{"type":"Autocomplete","items":[{"text":"Intellectuals against democracy","value":"intellectuals-against-democracy"}]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":[]}}
  const mediaTags = {"type":"Autocomplete","items":[]}
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
      language: filters.language,
      issue: filters.issue
      },
      sort:{}
    }
  }