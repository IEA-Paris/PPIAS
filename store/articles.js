import lists from '~/assets/data/lists'
const defaultView =
  lists.articles.views[
    Object.keys(lists.articles.views).find(
      (item) => lists.articles.views[item].default === true
    )
  ]
const defaultSort = [
  lists.articles.sort[
    Object.keys(lists.articles.sort).find(
      (item) => lists.articles.sort[item].default === true
    )
  ],
]

export const state = () => ({
  type: 'articles',
  items: [],
  total: 0,
  filters: {
    years: [],
    category: [],
    tags: [],
    language: [],
  },
  skip: 0,
  limit: lists.articles.perPage.default,
  search: '',
  page: 1,
  view: defaultView.name,
  sortBy: [defaultSort[0].value[0]],
  sortDesc: [defaultSort[0].value[1] === 'desc'],
  numberOfPages: 0,
  itemsPerPage: lists.articles.perPage.default,
  itemsPerPageArray: lists.articles.perPage.options,
  filtersCount: 0,
})
