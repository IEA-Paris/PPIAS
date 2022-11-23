/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2015,2016,2017,2018,2019,2020,2021,2022]},"language":{"type":"Select","items":["French","English",null]},"issue":{"type":"Select","items":["Agir en temps de crise","Conferences","Our Microbial Lives","Intercontinental Academia 4","WPRN Memorandums","HCERES - PFUE 2022","WPRN21 Videos","WPRN21 Papers","crises-et-prophetes","brains-that-pull-the-triggers","hommage-serge-moscovici","assessing-resilience","identity-from-double-to-avatar","justice-climate-transitions","intellectuals-against-democracy","territories-of-energy-transition","sleep-and-memory","virtual-realities"]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":["Artificial Intelligence","Data science","Deep learning","Responsability","Algorithms","Language","Robots","History of Science, Technology and Medicine","History of Science and Medicine","Online conference","Microbes","Students","Stress","Depression"," mental health","Education","Public Health","Social protection ","Social Relations ","Human Behaviours","Public Policy, Evaluation, Impact","Equality & Diversity Studies","Psychological","covid-19","coronavirus","socialnorms","decision-making","Infection likelihood perception","Human Behaviours, Social Relations ","Risks, Crisis Management","Public Policy","Big Data, Artificial Intelligence ","Consumption and Production Patterns","Firms, Markets, Finance","Human Behaviours, Social Relations","Work, Welfare, Social protection ","Public Policy, Evaluation, Impact ","Risks, Crisis Management ","Culture and The Arts ","Digital Humanities ","Violence, Criminality, Security ","Public Health ","Inequalities, Poverty, Development ","Innovation, R&D ","Public Discourse, Rhetorics, Communication ","Religions and Worldviews ","Dataset, Data Mining ","Qualitative analysis ","Democracy, Civil Society, Governance ","International Relations and Co-operation ","Equality & Diversity Studies ","Policy Document ","Big Data, Artificial Intelligence","Leisure, Tourism ","Environmental change, Ecology ","Cities, Mobility, Urban Planning","Democracy, Civil Society, Governance","Agriculture, Alimentation ","Environmental Studies","Health and well-being","Urban nature","wildland recreation","outcomes","personal development"," outdoor recreation","Work, Welfare, Social protection","Consumption and Production Patterns ","Firms, Markets, Finance ","Education ","Artificial Intelligence ","Stopcovid","police ","privacy"]}}
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