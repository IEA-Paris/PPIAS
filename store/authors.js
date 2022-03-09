import lists from '~/assets/data/lists'
const defaultView =
  lists.authors.views[
    Object.keys(lists.authors.views).find(
      (item) => lists.authors.views[item].default === true
    )
  ]
const defaultSort = [
  lists.authors.sort[
    Object.keys(lists.authors.sort).find(
      (item) => lists.authors.sort[item].default === true
    )
  ],
]

export const state = () => ({
  type: 'authors',
  items: [{}, {}, {}, {}, {}, {}],
  total: 0,
  filters: {
    years: [],
    category: [],
    tags: [],
    language: [],
  },
  skip: 0,
  limit: lists.authors.perPage.default,
  search: '',
  page: 1,
  view: defaultView.name,
  sortBy: [defaultSort[0].value[0]],
  sortDesc: [defaultSort[0].value[1] === 'desc'],
  numberOfPages: 0,
  itemsPerPage: lists.authors.perPage.default,
  itemsPerPageArray: lists.authors.perPage.options,
  filtersCount: 0,
})
