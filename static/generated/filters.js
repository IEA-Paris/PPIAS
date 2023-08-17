/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2021]},"language":{"type":"Select","items":["English"]},"issue":{"type":"Autocomplete","items":[{"text":"Your first issue","value":"test issue"}]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":[]}};
  const mediaTagFilter = {"type":"Autocomplete","items":[]};
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
  }