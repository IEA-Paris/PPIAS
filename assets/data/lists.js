export default {
  articles: {
    filter: {
      year: {
        type: 'Select',
        rules: {},
        label: 'year',
        items: (articles) => {
          return articles.map((article) => new Date(article.date).getFullYear())
        },
      } /* 
      categories: {
        type: 'TextInput',
        rules: {},
        label: 'Search',
      },
      author: {
        type: 'Autocomplete',
        rules: {},
        label: 'authors',
      }, */,
    },
    sort: {},
  },
  events: {
    search: {
      type: 'Search',
    },
    sortBy: {
      type: 'Select',
      items: ['date'],
    },
    status: {
      type: 'Select',
      items: ['draft', 'published'],
    },
  },
  media: {},
  authors: {},
}
