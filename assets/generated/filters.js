/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2018,2021,2022]},"language":{"type":"Select","items":["French","English",null]},"issue":{"type":"Select","items":["Conferences","HCERES - PFUE 2022","Our Microbial Lives","WPRN Memorandums","Agir en temps de crise"]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":["History of Science, Technology and Medicine","History of Science and Medicine","Online conference","Microbes","Human Behaviours, Social Relations ","Inequalities, Poverty, Development ","Equality & Diversity Studies ","Work, Welfare, Social protection","Consumption and Production Patterns ","Public Policy, Evaluation, Impact","Firms, Markets, Finance ","Agriculture, Alimentation ","Big Data, Artificial Intelligence ","Education "]}}
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