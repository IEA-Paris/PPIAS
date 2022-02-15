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
    sort: {
      nameasc: {
        icon: 'sort-alphabetical-ascending',
        text: 'by-name-from-a-to-z',
      },
      namedesc: {
        icon: 'sort-alphabetical-descending',
        text: 'by-name-from-z-to-a',
      },
      dateasc: {
        icon: 'sort-calendar-ascending',
        text: 'by-date-most-recent-first',
      },
      datedesc: {
        icon: 'sort-calendar-descending',
        text: 'by-date-oldest-first',
      },
    },
    views: [
      {
        name: 'tiles',
        icon: 'view-quilt',
      },
      {
        name: 'list',
        icon: 'view-list',
      },
      {
        name: 'Texte',
        icon: 'text-long',
      },
    ],
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
