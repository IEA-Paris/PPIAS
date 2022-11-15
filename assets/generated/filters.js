/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2015,2016,2017,2018,2019,2020,2021,2022]},"language":{"type":"Select","items":["French","English",null]},"issue":{"type":"Select","items":["Conferences","HCERES - PFUE 2022","intellectuals-against-democracy","WPRN21 Papers","virtual-realities","WPRN21 Videos","Our Microbial Lives","Intercontinental Academia 4","crises-et-prophetes","WPRN Memorandums","assessing-resilience","sleep-and-memory","Agir en temps de crise","identity-from-double-to-avatar","hommage-serge-moscovici","territories-of-energy-transition","justice-climate-transitions","brains-that-pull-the-triggers"]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":["Artificial Intelligence","Data science","Deep learning","Responsability","Algorithms","Language","Robots","History of Science, Technology and Medicine","History of Science and Medicine","Online conference","Microbes","Students","Stress","Depression"," mental health","Education","Public Health","Social protection ","Social Relations ","Human Behaviours","Public Policy, Evaluation, Impact","Equality & Diversity Studies","Psychological","covid-19","coronavirus","socialnorms","decision-making","Infection likelihood perception","Human Behaviours, Social Relations ","Risks, Crisis Management","Public Policy","Public Policy, Evaluation, Impact ","Risks, Crisis Management ","Culture and The Arts ","Digital Humanities ","Work, Welfare, Social protection ","Violence, Criminality, Security ","Public Health ","Inequalities, Poverty, Development ","Innovation, R&D ","Big Data, Artificial Intelligence ","Consumption and Production Patterns","Firms, Markets, Finance","Human Behaviours, Social Relations","Equality & Diversity Studies ","Dataset, Data Mining ","Policy Document ","Big Data, Artificial Intelligence","Public Discourse, Rhetorics, Communication ","Leisure, Tourism ","Environmental change, Ecology ","Cities, Mobility, Urban Planning","Democracy, Civil Society, Governance","Agriculture, Alimentation ","Environmental Studies","Health and well-being","Urban nature","wildland recreation","outcomes","personal development"," outdoor recreation","Religions and Worldviews ","Qualitative analysis ","Democracy, Civil Society, Governance ","International Relations and Co-operation ","Work, Welfare, Social protection","Consumption and Production Patterns ","Firms, Markets, Finance ","Education ","Artificial Intelligence ","Stopcovid","police ","privacy"]}}
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