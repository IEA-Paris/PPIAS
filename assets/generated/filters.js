/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2019,2020,2021,2022]},"language":{"type":"Select","items":["French","English"]},"issue":{"type":"Select","items":["HCERES - PFUE 2022","WPRN21 Papers","WPRN21 Videos","Our Microbial Lives","Intercontinental Academia 4","WPRN Memorandums","Agir en temps de crise"]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":["Artificial Intelligence","Data science","Deep learning","Responsability","Algorithms","Language","Robots","History of Science, Technology and Medicine","History of Science and Medicine","Online conference","Microbes","Students","Stress","Depression"," mental health","Education","Public Health","Social protection ","Social Relations ","Human Behaviours","Public Policy, Evaluation, Impact","Equality & Diversity Studies","Psychological","Big Data, Artificial Intelligence ","Consumption and Production Patterns","Firms, Markets, Finance","Human Behaviours, Social Relations","Work, Welfare, Social protection ","Equality & Diversity Studies ","Inequalities, Poverty, Development ","Public Health ","Public Policy, Evaluation, Impact ","Dataset, Data Mining ","Policy Document ","Human Behaviours, Social Relations ","Risks, Crisis Management ","Culture and The Arts ","Digital Humanities ","Violence, Criminality, Security ","Innovation, R&D ","Big Data, Artificial Intelligence","Public Discourse, Rhetorics, Communication ","Risks, Crisis Management","Religions and Worldviews ","Qualitative analysis ","Democracy, Civil Society, Governance ","International Relations and Co-operation ","Leisure, Tourism ","Environmental change, Ecology ","Cities, Mobility, Urban Planning","Democracy, Civil Society, Governance","Agriculture, Alimentation ","Environmental Studies","Health and well-being","Urban nature","wildland recreation","outcomes","personal development"," outdoor recreation","covid-19","coronavirus","socialnorms","decision-making","Infection likelihood perception","Public Policy","Work, Welfare, Social protection","Consumption and Production Patterns ","Firms, Markets, Finance ","Education ","Artificial Intelligence ","Stopcovid","police ","privacy"]}}
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