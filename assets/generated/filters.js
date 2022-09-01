/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2020,2021,2022]},"language":{"type":"Select","items":["English","French"]},"issue":{"type":"Select","items":["HCERES - PFUE 2022","WPRN21 Proceedings","WPRN21 Conference","Our Microbial Lives","Intercontinental Academia 4","WPRN Memorandums"]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":[]}}
  const mediaTags = {"type":"Autocomplete","items":["History of Science","Microbes","Medicine","Technology and Medicine","Microbe","Antibiotics","History of Science, Technology and Medicine","History of Science and Medicine","Online conference","Infectious Diseases","public policies"," Macroeconomics","Small business","Firms, Markets, Finance ","Quantitative survey ","Public Health ","Innovation, R&D","Work, Welfare, Social protection ","Cities, Mobility, Urban Planning ","Environmental change, Ecology ","Public Policy, Evaluation, Impact ","Big Data, Artificial Intelligence ","Equality & Diversity Studies ","Public Health","Inequalities, Poverty, Development ","Human Behaviours, Social Relations ","Gender differences","Emotions ","Language","Human Behaviours, Social Relations","Risks, Crisis Management ","Public Discourse, Rhetorics, Communication ","social dilemma"," social norm ","globalization"]}
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