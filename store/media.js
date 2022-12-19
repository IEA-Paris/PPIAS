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

export const useMediaStore = defineStore('mediaStore', {
  state: () => ({
    type: 'media',
    items: [],
    total: 0,
    filters: {
      years: [],
      issue: [],
      tags: [],
      language: [],
      thematic: [],
      discipline: [],
      type: [],
    },
    loading: [],
    skip: 0,
    limit: lists.media.perPage.default,
    search: '',
    page: 1,
    view: defaultView.name,
    sortBy: [defaultSort[0].value[0]],
    sortDesc: defaultSort[0].value[1] === 'desc',
    numberOfPages: 0,
    itemsPerPage: lists.media.perPage.default,
    itemsPerPageArray: lists.media.perPage.options,
    filtersCount: 0,
  })
})