/* eslint-disable prettier/prettier */
  const filters = {"years":{"type":"Select","items":[2015,2016,2017,2018,2019,2020,2021,2022,2023]},"language":{"type":"Select","items":["French","English"]},"issue":{"type":"Autocomplete","items":[{"text":"Paysages Alimentaires","value":"paysages-alimentaires"},{"text":"Intellectuals against democracy","value":"intellectuals-against-democracy"},{"text":"HCERES - PFUE 2022","value":"HCERES - PFUE 2022"},{"text":"WPRN21 Papers","value":"WPRN21 Papers"},{"text":"Virtual realities","value":"virtual-realities"},{"text":"WPRN21 Videos","value":"WPRN21 Videos"},{"text":"Our Microbial Lives","value":"Our Microbial Lives"},{"text":"Intercontinental Academia 4","value":"Intercontinental Academia 4"},{"text":"Guest lectures","value":"guest_lectures"},{"text":"Crises et nouveaux prophètes","value":"crises-et-prophetes"},{"text":"WPRN Memorandums","value":"WPRN Memorandums"},{"text":"Assessing Territorial Resilience","value":"assessing-resilience"},{"text":"Sleep and Memory","value":"sleep-and-memory"},{"text":"Agir en Temps de Crise","value":"Agir en temps de crise"},{"text":"From the Double to the Avatar ","value":"identity-from-double-to-avatar"},{"text":"Hommage à Serge Moscovici","value":"hommage-serge-moscovici"},{"text":"Les territoires de la transition énergétique","value":"territories-of-energy-transition"},{"text":"Justice, climate, transitions","value":"justice-climate-transitions"},{"text":"The brain that pull the triggers","value":"brains-that-pull-the-triggers"}]},"discipline":{"type":"Autocomplete","items":[]},"thematic":{"type":"Autocomplete","items":[]},"type":{"type":"Autocomplete","items":[]},"tag":{"type":"Autocomplete","items":["Artificial Intelligence","Data science","Deep learning","Responsability","Algorithms","Language","Robots","History of Science, Technology and Medicine","History of Science and Medicine","Online conference","Microbes","covid-19","coronavirus","socialnorms","decision-making","Infection likelihood perception","Public Health","Human Behaviours, Social Relations ","Risks, Crisis Management","Public Policy","Students","Stress","Depression"," mental health","Education","Social protection ","Social Relations ","Human Behaviours","Public Policy, Evaluation, Impact","Equality & Diversity Studies","Psychological","Public Policy, Evaluation, Impact ","Risks, Crisis Management ","Culture and The Arts ","Digital Humanities ","Work, Welfare, Social protection ","Violence, Criminality, Security ","Public Health ","Inequalities, Poverty, Development ","Innovation, R&D ","Big Data, Artificial Intelligence ","Consumption and Production Patterns","Firms, Markets, Finance","Human Behaviours, Social Relations","Equality & Diversity Studies ","Dataset, Data Mining ","Policy Document ","Big Data, Artificial Intelligence","Public Discourse, Rhetorics, Communication ","Religions and Worldviews ","Qualitative analysis ","Democracy, Civil Society, Governance ","International Relations and Co-operation ","Leisure, Tourism ","Environmental change, Ecology ","Cities, Mobility, Urban Planning","Democracy, Civil Society, Governance","Agriculture, Alimentation ","Environmental Studies","Health and well-being","Urban nature","wildland recreation","outcomes","personal development"," outdoor recreation","Work, Welfare, Social protection","Consumption and Production Patterns ","Firms, Markets, Finance ","Education ","Artificial Intelligence ","Stopcovid","police ","privacy"]}}
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
      language: filters.language,
      issue: filters.issue
      },
      sort:{}
    }
  }