import Vue from 'vue'
import filtersRaw from '~/assets/data/filters'
import lists from '~/assets/data/lists'

export const baseMutations = {
  loadRouteQuery(state) {
    const query = this.app.router.currentRoute.query
    let pristine = true
    if (query.search) {
      state.search = query.search
      pristine = false
    }
    if (query.filters) {
      pristine = false
      const filters = JSON.parse(query.filters)
      Object.keys(filters).forEach((filter) => {
        Vue.set(state.filters, filter, filters[filter])
      })
    }
    console.log('LOAD ROUTE QUREYR')

    if (query.view) Vue.set(state, 'view', query.view)
    if (query.page) {
      Vue.set(state, 'page', query.page)
    } else {
      Vue.set(state, 'page', 1)
    }
    if (query.sortBy) Vue.set(state, 'sortBy', query.sortBy)
    console.log('query.sortDesc: ', query.sortDesc)
    if (query.sortDesc) Vue.set(state, 'sortDesc', query.sortDesc)
  },
  setSearch(state, search) {
    state.search = search
  },
  setItems(state, values) {
    state.items = values.items
    state.total = values.total
    state.numberOfPages = values.numberOfPages
  },
  setItemsPerPage(state, value) {
    state.itemsPerPage = value
  },
  setPage(state, page) {
    console.log('page: ', page)
    Vue.set(state, 'page', page)
    console.log('state.apge', state.page)
  },
  setFilters(state, filters) {
    Vue.set(
      state.filters,
      Object.keys(filters)[0],
      filters[Object.keys(filters)[0]]
    )
  },
  setSort(state, values) {
    console.log('values: ', values)
    state.sortBy = [values[0]]
    state.sortDesc = [values[1] === 'desc']
  },
  setView(state, value) {
    state.view = value
  },
  setFiltersCount(state) {
    const filters = state.filters
    const filtersCount = Object.keys(filters)
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
    state.filtersCount = filtersCount
  },
  setBlankState(state) {
    console.log('RESET STATE')
    const defaultView =
      lists[state.type].views[
        Object.keys(lists[state.type].views).find(
          (item) => lists[state.type].views[item].default === true
        )
      ]
    const defaultSort = [
      lists[state.type].sort[
        Object.keys(lists[state.type].sort).find(
          (item) => lists[state.type].sort[item].default === true
        )
      ],
    ]
    console.log('defaultSort: ', defaultSort)
    Vue.set(state, 'filters', {
      years: [],
      category: [],
      tags: [],
      language: [],
    })

    Vue.set(state, 'search', '')
    Vue.set(state, 'view', defaultView.name)
    Vue.set(state, 'sortBy', [defaultSort[0].value[0]])
    Vue.set(state, 'sortDesc', [defaultSort[0].value[1]] === 'desc')
  },
}
export const baseActions = {
  async resetState({ dispatch, commit, state }, value) {
    commit('setBlankState')
    commit('setPage', 1)
    await dispatch('update')
  },
  async updateSort({ dispatch, commit, state }, value) {
    commit('setSort', value)
    commit('setPage', 1)
    await dispatch('update')
  },
  async updateView({ dispatch, commit, state }, value) {
    commit('setView', value)
    await dispatch('update')
  },
  async updateFilters({ dispatch, commit, state }, value) {
    commit('setFilters', value)
    commit('setPage', 1)
    await dispatch('update')
  },
  async updateItemsPerPage({ dispatch, commit, state }, value) {
    commit('setPage', 1)
    commit('setItemsPerPage', value)
    await dispatch('update')
  },
  async updatePage({ dispatch, commit, state }, page) {
    commit('setPage', page)
    await dispatch('update')
  },
  async updateSearch({ dispatch, commit, state }, search) {
    commit('setSearch', search)
    await dispatch('update')
  },
  async update({ dispatch, commit, state, getters }, value = {}) {
    const pipeline = {
      // default filters
      ...filtersRaw[state.type],
    }
    const queryFilters = {}
    console.log('state', state)
    pipeline.$or = []
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
        // check if we are matching against an array value
        if (['tags'].includes(filter)) {
          pipeline[filter] = { $containsAny: val }
          // years to date special case
          // TODO make a fancy feature to limit the gte lt
        } else if (['language'].includes(filter)) {
          pipeline.language = { $containsAny: val }
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
        } else if (filter === 'years') {
          const yearsToInt = val.map((i) => +i)
          if (['articles', 'media'].includes(state.type)) {
            pipeline[filter] = { $in: yearsToInt }
          } else {
            pipeline[filter] = { $containsAny: yearsToInt }
          }
        } else {
          pipeline[filter] = Array.isArray(val) ? val[0] : val
        }
      }
    })
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
      return (+state.page - 1) * state.itemsPerPage
    }
    console.log('pipeline: ', pipeline)

    let items = await this.$content(state.type, { deep: true })
      .where(pipeline)
      .search(state.search)
      .sortBy(state.sortBy[0], state.sortDesc[0] ? 'desc' : 'asc')
      .skip(skipNumber())
      .limit(state.itemsPerPage)
      .fetch()
    // update route
    const query = {
      ...(state.search &&
        typeof state.search !== 'undefined' && { search: state.search }),
      ...(state.page > 1 && { page: state.page.toString() }),
      ...(state.sortBy?.length &&
        state.sortBy[0] !== getters.defaultSort.value[0] && {
          sortBy: state.sortBy[0],
        }),
      ...(state.sortDesc?.length &&
        (state.sortDesc[0] ? 'desc' : 'asc') !==
          getters.defaultSort.value[1] && {
          sortDesc: !!(
            state.sortDesc[0] || getters.defaultSort.value[1] === 'desc'
          ),
        }),
      ...(state.view &&
        state.view !== getters.defaultView.name && { view: state.view }),
      ...(Object.keys(filters)?.length && {
        filters: JSON.stringify(queryFilters),
      }),
    }
    const sortObject = (obj) => Object.fromEntries(Object.entries(obj).sort())
    console.log('query: ', JSON.stringify(query))
    console.log(
      'query12: ',
      JSON.stringify(this.$router.currentRoute.query).replace('"true"', 'true')
    )

    Object.keys(query).forEach((key) =>
      query[key] === undefined ? delete query[key] : {}
    )
    console.log(
      'should replace',
      JSON.stringify(sortObject(this.$router.currentRoute.query)) !==
        JSON.stringify(sortObject(query))
    )
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
        await items.map(async (item) => {
          if (item.category_1 && item.category_1.length)
            item.category_1 = await this.$content(
              item.category_1.split('/').slice(1).join('/').split('.')[0]
            )
              .only(['title', 'color'])
              .fetch()
          if (item.category_2 && item.category_2.length)
            item.category_2 = await this.$content(
              // TODO fix (or keep as a lesson) this shameful display of bad string manipulation. One slice could do it, no?
              item.category_2.split('/').slice(1).join('/').split('.')[0]
            )
              .only(['title', 'color'])
              .fetch()
          return item
        })
      )
    }
    console.log('items: ', items)
    /*     const isDesc = state.sortDesc[0] || getters.defaultSort.value[1]
    const sorter = state.sortBy[0] || getters.defaultSort.value[0]
    console.log('sorter: ', sorter)
    items = items.sort(
      (a, b) =>
        (isDesc ? a[sorter] : b[sorter]) - (isDesc ? b[sorter] : a[sorter])
    ) */
    commit('setFiltersCount')
    commit('setItems', {
      items,
      total: totalItems,
      numberOfPages: lastPage,
    })
    /* HIGHLIGHT MECHANISM (disabled until reassessment of its usefulness & relevance
    //TODO deal with that ) 
    // on mobile or list view, highlight slots are the first ones
    if (
      window.$nuxt.$root.$vuetify.breakpoint.mobile ||
      ['list', 'text'].includes(state.view)
    ) {
      items = items.sort((a, b) => b.highlight - a.highlight)
      console.log('length2', items.length)
      commit('setFiltersCount')
      commit('setItems', {
        items,
        total: totalItems,
        numberOfPages: lastPage,
      })
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
      commit('setFiltersCount')
      commit('setItems', {
        items: sortedItems,
        total: totalItems,
        numberOfPages: lastPage,
      })
    } */
  },
}
export const baseGetters = {
  filtersCount: (state) => {},
  defaultView: (state) => {
    return lists[state.type].views[
      Object.keys(lists[state.type].views).find(
        (item) => lists[state.type].views[item].default === true
      )
    ]
  },

  defaultSort: (state) => {
    return lists[state.type].sort[
      Object.keys(lists[state.type].sort).find(
        (item) => lists[state.type].sort[item].default === true
      )
    ]
  },
}
