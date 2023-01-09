/* eslint-disable prettier/prettier */
const filters = {
  years: { type: 'Select', items: [2021, 2022] },
  language: { type: 'Select', items: ['English'] },
  issue: {
    type: 'Autocomplete',
    items: [
      {
        text: 'Intellectuals against democracy',
        value: 'intellectuals-against-democracy',
      },
      { text: 'HCERES - PFUE 2022', value: 'HCERES - PFUE 2022' },
      {
        text: 'Intercontinental Academia 4',
        value: 'Intercontinental Academia 4',
      },
      { text: 'Guest lectures', value: 'guest_lectures' },
    ],
  },
  discipline: { type: 'Autocomplete', items: [] },
  thematic: { type: 'Autocomplete', items: [] },
  type: { type: 'Autocomplete', items: [] },
  tag: {
    type: 'Autocomplete',
    items: [
      'Artificial Intelligence',
      'Data science',
      'Deep learning',
      'Responsability',
      'Algorithms',
      'Language',
      'Robots',
    ],
  },
}
const mediaTags = { type: 'Autocomplete', items: [] }
export default {
  articles: {
    filters,
    sort: {},
  },
  media: {
    filters: { ...filters, tag: mediaTags },
    sort: {},
  },
  authors: {
    filters: {
      years: filters.years,
      language: filters.language,
      issue: filters.issue,
    },
    sort: {},
  },
}
