export default {
  articles: {
    perPage: {
      options: [9, 12, 16],
      default: 9,
    },
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
        value: ['article_title', 'asc'],
      },
      namedesc: {
        icon: 'sort-alphabetical-descending',
        text: 'by-name-from-z-to-a',
        value: ['article_title', 'desc'],
      },
      dateasc: {
        icon: 'sort-calendar-descending',
        text: 'by-date-most-recent-first',
        value: ['date', 'desc'],
        default: true,
      },
      datedesc: {
        icon: 'sort-calendar-ascending',
        text: 'by-date-oldest-first',
        value: ['date', 'asc'],
      },
    },
    views: [
      {
        name: 'list',
        icon: 'view-list',
        default: true,
      },
      {
        name: 'tiles',
        icon: 'view-quilt',
      },
      {
        name: 'issues',
        icon: 'view-carousel',
      },
    ],
  },
  media: {
    perPage: {
      options: [9, 12, 16],
      default: 9,
    },
    sort: {
      nameasc: {
        icon: 'sort-alphabetical-ascending',
        text: 'by-name-from-a-to-z',
        value: ['article_title', 'asc'],
      },
      namedesc: {
        icon: 'sort-alphabetical-descending',
        text: 'by-name-from-z-to-a',
        value: ['article_title', 'desc'],
      },
      dateasc: {
        icon: 'sort-calendar-ascending',
        text: 'by-date-most-recent-first',
        value: ['date', 'desc'],
        default: true,
      },
      datedesc: {
        icon: 'sort-calendar-descending',
        text: 'by-date-oldest-first',
        value: ['date', 'asc'],
      },
    },
    views: [
      {
        name: 'tiles',
        icon: 'view-quilt',
        default: true,
      },
    ],
  },
  authors: {
    perPage: {
      options: [30, 60, 90],
      default: 30,
    },
    filter: {},
    sort: {
      nameasc: {
        icon: 'sort-alphabetical-ascending',
        text: 'by-name-from-a-to-z',
        value: ['lastname', 'asc'],
        default: true,
      },
      namedesc: {
        icon: 'sort-alphabetical-descending',
        text: 'by-name-from-z-to-a',
        value: ['lastname', 'desc'],
      },
    },
    views: [
      {
        name: 'text',
        icon: 'text-long',
        default: true,
      },
      {
        name: 'list',
        icon: 'view-list',
      },
    ],
  },
}
