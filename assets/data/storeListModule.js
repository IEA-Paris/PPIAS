import filtersRaw from '~/assets/data/filters'
export const baseState = {
  type: 'articles',
  items: [],
  display: 0,
  views: [],
  total: 0,
  filters: {
    years: [],
    category: [],
    tags: [],
    language: [],
  },
  skip: 0,
  limit: 20,
  search: '',
  page: 1,
  sortBy: [],
  sortDesc: [true],
  numberOfPages: 0,
  itemsPerPage: 9,
  itemsPerPageArray: [9, 12, 16],
  filtersCount: 0,
}
export const baseMutations = {
  setSearch(state, search) {
    state.search = search
  },
  setItems(state, values) {
    state.items = values.items
    state.total = values.total
    state.numberOfPages = values.numberOfPages
    console.log('state2: ', state)
  },
  setItemsPerPage(state, value) {
    state.itemsPerPage = value
  },
  setPage(state, page) {
    console.log('state: ', state)
    state.page = page
    if (page) {
      if (page <= Math.ceil(state.total / state.itemsPerPage)) {
        if (state.page > 1) {
          this.app.router.push({
            query: { ...this.app.router.currentRoute.query, page: state.page },
          })
        } else {
          this.app.router.push({
            query: { ...this.app.router.currentRoute.query, page: undefined },
          })
        }
      }
    }
  },
  setFilters(state, filters) {
    console.log('filters: ', filters)
    state.filters[Object.keys(filters)[0]] = filters[Object.keys(filters)[0]]
  },
  setSort(state, values) {
    console.log('values: ', values)
    state.sortBy = [values[0]]
    state.sortDesc = [values[1]]
  },
  setFiltersCount(state) {
    const filters = state.filters
    state.filtersCount = Object.keys(filters)
      // remove empty values
      .filter(
        (filter) =>
          (typeof filters[filter] === 'boolean' &&
            filters[filter] !== null &&
            filters[filter] !== undefined) ||
          (Array.isArray(filters[filter]) && filters[filter].length) ||
          (typeof filters[filter] === 'object' &&
            Object.keys(filters[filter]).length)
      ).length
  },
}
export const baseActions = {
  async updateSort({ dispatch, commit, state }, value) {
    commit('setSort', value)
    await dispatch('update')
  },
  async updateFilters({ dispatch, commit, state }, value) {
    commit('setFilters', value)
    await dispatch('update')
  },
  async updateItemsPerPage({ dispatch, commit, state }, value) {
    commit('setPage', 1)
    console.log('setItemsPerPage: ', value)
    commit('setItemsPerPage', value)
    await dispatch('update')
  },
  async updatePage({ dispatch, commit, state }, page) {
    console.log('page: ', page)
    commit('setPage', page)
    await dispatch('update')
  },
  async updateSearch({ dispatch, commit, state }, search) {
    console.log('search: ', search)
    commit('setSearch', search)
    await dispatch('update')
  },
  async update({ dispatch, commit, state }, value = {}) {
    console.log('type: ', state.type)
    console.log('search', state.search)
    const pipeline = {
      // default filters
      ...filtersRaw[state.type],
    }
    const queryFilters = {}

    pipeline.$or = []
    console.log('filtersRaw[type]: ', filtersRaw[state.type])
    console.log(' state.filters: ', state.filters)
    const filters = state.filters

    Object.keys(filters).forEach((filter) => {
      // remove empty values
      if (
        !(
          (typeof filters[filter] === 'boolean' &&
            filters[filter] !== null &&
            filters[filter] !== undefined) ||
          (Array.isArray(filters[filter]) && filters[filter].length) ||
          (typeof filters[filter] === 'object' &&
            Object.keys(filters[filter]).length)
        )
      ) {
        delete filters[filter]
        return
      }
      // update route query
      queryFilters[filter] = filters[filter]
      const val = filters[filter]
      // convert filters into mongo-like loki query & push in the pipeline
      if (
        filters[filter] ||
        (Array.isArray(filters[filter]) && filters[filter].length)
      ) {
        console.log('val: ', val)
        // check if we are matching against an array value
        if (['tags'].includes(filter)) {
          pipeline[filter] = { $containsAny: val }
          // years to date special case
          // TODO make a fancy feature to limit the gte lt
        } else if (['language'].includes(filter)) {
          pipeline.language = { $in: val }
        } else if (filter === 'years') {
          console.log('year: ', new Date(+val[0] + 1, 0))
          if (val.length > 1) {
            pipeline.$or.push(
              val.map((year) => {
                return {
                  date: {
                    $regex: year,
                  },
                }
              })
            )
          } else {
            pipeline.date = { $regex: val[0] }
          }
        } else if (filter === 'category') {
          pipeline.$or.push(
            ...[
              {
                category_1:
                  val.length > 1
                    ? {
                        $in: val.map(
                          (item) => 'content/categories/' + item + '.md'
                        ),
                      }
                    : 'content/categories/' + val[0] + '.md',
              },
              {
                category_2:
                  val.length > 1
                    ? {
                        $in: val.map(
                          (item) => 'content/categories/' + item + '.md'
                        ),
                      }
                    : 'content/categories/' + val[0] + '.md',
              },
            ]
          )
        }
      }
    })
    console.log('pipeline: ', pipeline)
    console.log('queryFilters: ', queryFilters)
    if (!pipeline.$or.length) {
      delete pipeline.$or
    } else {
      pipeline.$or = pipeline.$or.flat()
    }
    console.log('pipeline: ', pipeline)
    const count = await this.$content(state.type, { deep: true })
      .search(state.search)
      .where(pipeline)
      .only('[]')
      .fetch()

    const totalItems = count.length
    console.log('totalItems: ', totalItems)

    // use Math.ceil to round up to the nearest whole number
    const lastPage = Math.ceil(totalItems / state.itemsPerPage)

    // use the % (modulus) operator to get a whole remainder
    const lastPageCount = totalItems % state.itemsPerPage
    const skipNumber = () => {
      if (+state.page === 1) {
        return 0
      }
      if (+state.page === lastPage) {
        if (lastPageCount === 0) {
          return totalItems - state.itemsPerPage
        }

        return totalItems - lastPageCount
      }
      return (state.page - 1) * state.itemsPerPage
    }
    console.log('skipNumber(): ', {
      [state.sortBy[0] || 'date']: state.sortDesc[0] ? 'desc' : 'asc',
    })

    let items = await this.$content(state.type, { deep: true })
      .where(pipeline)
      .search(state.search)
      .sortBy({
        [state.sortBy[0] || 'date']: state.sortDesc[0] || 'desc',
      })
      .limit(state.itemsPerPage)
      .skip(skipNumber())
      .fetch()
    // update route
    const query = {
      ...(state.search && { search: state.search }),
      ...(state.page > 1 && { page: state.page }),
      ...(state.sortBy?.length && { sortBy: state.sortBy[0] }),
      ...(state.sortDesc?.length > 1 && {
        sortDesc: state.sortDesc,
      }),
      ...(Object.keys(filters)?.length && {
        filters: JSON.stringify(queryFilters),
      }),
    }
    console.log('query: ', query)
    if (
      JSON.stringify(this.$router.currentRoute.query) !== JSON.stringify(query)
    ) {
      this.$router.replace({
        query,
      })
    }

    const pinnedItem = false
    // fetch the item categories
    if (['articles', 'media'].includes(state.type)) {
      items = await Promise.all(
        items.map(async (item) => {
          if (item.category_1 && item.category_1.length)
            item.category_1 = await this.$content(
              item.category_1.split('/').slice(1).join('/').split('.')[0]
            )
              .only(['name', 'color'])
              .fetch()
          if (item.category_2 && item.category_2.length)
            item.category_2 = await this.$content(
              item.category_2.split('/').slice(1).join('/').split('.')[0] // TODO fix (or keep) this shameful display of bad string manipulation. One slice could do it no?
            )
              .only(['name', 'color'])
              .fetch()
          return item
        })
      )
    }

    // on mobile highlight slots are the first ones
    if (window.$nuxt.$root.$vuetify.breakpoint.mobile) {
      items = items.sort((a, b) => b.highlight - a.highlight)
      console.log('sortedItems: ', items)
      commit('update', items)
    } else {
      // on md highlight slots are on a 1/5/6 pattern
      const availableSlots = state.itemsPerPage / 3

      const highlightedItems = items.filter((item) => item.highlight)

      const slotedHighlightedItems = highlightedItems.slice(0, availableSlots)

      const regularItems = [
        ...highlightedItems.slice(availableSlots),
        ...items.filter((item) => !item.highlight),
      ]

      const sortedItems = []
      slotedHighlightedItems.forEach((element, index) => {
        sortedItems.push(element)
        sortedItems.push(...regularItems.splice(index * 2, 2))
      })
      sortedItems.push(...regularItems)
      console.log('sortedItems: ', sortedItems)
      commit('setFiltersCount')
      commit('setItems', {
        items: sortedItems,
        total: totalItems,
        numberOfPages: lastPage,
      })
    }
  },
}
export const baseGetters = {
  filtersCount: (state) => {},
}
