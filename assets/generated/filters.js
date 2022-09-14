/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2021,2022]},"language":{"type":"Select","items":["English"]},"issue":{"type":"Select","items":["WPRN21 Papers","Intercontinental Academia 4"]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":[]}}
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
      language: filters.language
      },
      sort:{}
    }
  }