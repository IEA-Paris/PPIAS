/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2020,2021,2022]},"language":{"type":"Select","items":["English","French"]},"issue":{"type":"Select","items":["WPRN21","OML","ICA","WPRN"]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":["Artificial Intelligence","Data science","Deep learning","Responsability","Algorithms","Language","Robots","History of Science, Technology and Medicine","History of Science and Medicine","Online conference","Microbes","Big Data, Artificial Intelligence ","Consumption and Production Patterns","Firms, Markets, Finance","Public Health","Human Behaviours, Social Relations","Work, Welfare, Social protection ","covid-19","coronavirus","socialnorms","decision-making","Infection likelihood perception","Human Behaviours, Social Relations ","Risks, Crisis Management","Public Policy","Agriculture","Food environments","Food security","Nutrition"," Rural development","Sustainable development","Cities, Mobility, Urban Planning","Environmental change, Ecology ","Public Policy, Evaluation, Impact ","Public Discourse, Rhetorics, Communication ","Risks, Crisis Management ","Religions and Worldviews ","Work, Welfare, Social protection","Inequalities, Poverty, Development ","Equality & Diversity Studies ","Consumption and Production Patterns ","Public Policy, Evaluation, Impact","Firms, Markets, Finance ","Agriculture, Alimentation ","Education ","Culture and The Arts ","Digital Humanities ","Violence, Criminality, Security ","Public Health ","Innovation, R&D ","Dataset, Data Mining ","Policy Document ","Students","Stress","Depression"," mental health","Education","Social protection ","Social Relations ","Human Behaviours","Equality & Diversity Studies","Psychological","Big Data, Artificial Intelligence","Artificial Intelligence ","Democracy, Civil Society, Governance","Stopcovid","police ","\tprivacy","Leisure, Tourism ","Environmental Studies","Health and well-being","Urban nature","wildland recreation","outcomes","personal development"," outdoor recreation","Qualitative analysis ","Democracy, Civil Society, Governance ","International Relations and Co-operation "]}}
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