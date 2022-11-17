/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2021,2022]},"language":{"type":"Select","items":["English","French"]},"issue":{"type":"Select","items":["HCERES - PFUE 2022","Conferences","Our Microbial Lives","WPRN Memorandums"]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":["Human Behaviours, Social Relations ","Inequalities, Poverty, Development ","Equality & Diversity Studies ","Work, Welfare, Social protection","Consumption and Production Patterns ","Public Policy, Evaluation, Impact","Firms, Markets, Finance ","Agriculture, Alimentation ","Big Data, Artificial Intelligence ","Education ","History of Science, Technology and Medicine","History of Science and Medicine","Online conference","Microbes"]}}
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