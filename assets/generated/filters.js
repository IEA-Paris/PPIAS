/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2020,2021,2022]},"language":{"type":"Select","items":["English","French"]},"issue":{"type":"Select","items":["WPRN21"]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":["Big Data, Artificial Intelligence ","Consumption and Production Patterns","Firms, Markets, Finance","Public Health","Human Behaviours, Social Relations","Work, Welfare, Social protection ","History of Science, Technology and Medicine","History of Science and Medicine","Online conference","Microbes","Artificial Intelligence","Data science","Deep learning","Responsability","Algorithms","Language","Robots","covid-19","coronavirus","socialnorms","decision-making","Infection likelihood perception","Human Behaviours, Social Relations ","Risks, Crisis Management","Public Policy","Inequalities, Poverty, Development ","Equality & Diversity Studies ","Work, Welfare, Social protection","Consumption and Production Patterns ","Public Policy, Evaluation, Impact","Firms, Markets, Finance ","Agriculture, Alimentation ","Education ","Agriculture","Food environments","Food security","Nutrition"," Rural development","Sustainable development","Cities, Mobility, Urban Planning","Environmental change, Ecology ","Public Policy, Evaluation, Impact ","Public Discourse, Rhetorics, Communication ","Risks, Crisis Management ","Religions and Worldviews ","Culture and The Arts ","Digital Humanities ","Violence, Criminality, Security ","Public Health ","Innovation, R&D ","Dataset, Data Mining ","Policy Document ","Students","Stress","Depression"," mental health","Education","Social protection ","Social Relations ","Human Behaviours","Equality & Diversity Studies","Psychological","Qualitative analysis ","Democracy, Civil Society, Governance ","International Relations and Co-operation ","Leisure, Tourism ","Democracy, Civil Society, Governance","Environmental Studies","Health and well-being","Urban nature","wildland recreation","outcomes","personal development"," outdoor recreation","Big Data, Artificial Intelligence","Artificial Intelligence ","Stopcovid","police ","\tprivacy"]}}
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