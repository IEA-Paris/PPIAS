const pristineFilters = () => ({
  field: [],
  type: [],
  thematic: [],
  state: null,
  continent: [],
  country: [],
  verified: false,
  featured: false,
  showAllProjects: false,
  conf: false,
  sortBy: '',
  status: '',
})

export const state = () => ({
  items: [],
  total: 0,
  filters: pristineFilters(),
  loading: false,
  skip: 0,
  limit: 20,
  search: '',
  page: 1,
  sortBy: [],
  sortDesc: [true],
  itemsPerPage: 10,
})
export const mutations = {
  update(state, filters) {
    console.log('filters: ', filters)
    const queries = Object.fromEntries(
      Object.entries(filters).map(([key, val]) => [
        key,
        val ? JSON.stringify(val) : undefined,
      ])
    )
    delete queries.items
    console.log('queries.length: ', queries)
    console.log(
      'this.app.router.currentRoute.query.length: ',
      this.app.router.currentRoute.query
    )
    if (
      process.client &&
      (Object.keys(this.app.router.currentRoute.query).length ||
        Object.keys(queries).length)
    ) {
      console.log('  this.app.router: ', this.app.router)
      this.app.router.push({
        path: this.app.router.currentRoute.path,
        query: {
          ...this.app.router.currentRoute.query,
          ...queries,
        },
      })
    }

    Object.keys(filters).forEach((key) => {
      state[key] = filters[key]
    })
  },
  setLoading(state, value) {
    state.loading = value
  },
  nextPage(state, value) {
    if (state.page + 1 <= Math.ceil(state.total / state.itemsPerPage)) {
      state.page += 1
      this.app.router.push({
        query: { ...this.app.router.currentRoute.query, page: state.page },
      })
    }
  },
  formerPage(state, value) {
    if (state.page - 1 >= 1) {
      state.page -= 1
      this.app.router.push({
        query: { ...this.app.router.currentRoute.query, page: state.page },
      })
    }
  },
  updateItemsPerPage(state, value) {
    state.itemsPerPage = value
  },
}
export const actions = {
  search({ dispatch, commit }, filters) {
    console.log('search', filters)
  },
}

export const getters = {
  activeFiltersCounter(state) {
    return Object.values(state.filters).filter((e) => {
      if (Array.isArray(e)) return e.length
      else {
        return typeof e === 'number' || e
      }
    }).length
  },
}
