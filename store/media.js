import {
  baseState,
  baseMutations,
  baseActions,
  baseGetters,
} from '~/assets/data/storeListModule'
import lists from '~/assets/data/lists'
const defaultView =
  lists.media.views[
    Object.keys(lists.media.views).find(
      (item) => lists.media.views[item].default === true
    )
  ]
const defaultSort = [
  lists.media.sort[
    Object.keys(lists.media.sort).find(
      (item) => lists.media.sort[item].default === true
    )
  ],
]

export const state = () => ({
  type: 'media',
  items: [],
  total: 0,
  filters: {
    years: [],
    category: [],
    tags: [],
    language: [],
  },
  skip: 0,
  limit: lists.media.perPage.default,
  search: '',
  page: 1,
  view: defaultView.name,
  sortBy: [defaultSort[0].value[0]],
  sortDesc: [defaultSort[0].value[1]] === 'desc',
  numberOfPages: 0,
  itemsPerPage: lists.media.perPage.default,
  itemsPerPageArray: lists.media.perPage.options,
  filtersCount: 0,
})

export const mutations = {
  ...baseMutations,
}
export const actions = { ...baseActions }
export const getters = { ...baseGetters }
