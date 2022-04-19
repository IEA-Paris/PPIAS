import Vue from 'vue'
import filtersRaw from '~/assets/data/filters'
import lists from '~/assets/data/lists'

export const state = () => ({
  scrolled: process.browser ? window.pageYOffset > 0 : false,
  logo: 0,
  loading: true,
  resetFilters: false,
})

export const mutations = {
  setLogo(state, value) {
    Vue.set(state, 'logo', value)
    state.logo = value
  },
  setLoading(state, value) {
    Vue.set(state, 'loading', value)
  },
  setScrolled(state) {
    if (process.browser) {
      Vue.set(state, 'scrolled', window.pageYOffset > 0)
    }
  },

  loadRouteQuery(state, type, rootState) {
    const query = this.app.router.currentRoute.query
    if (query.search) {
      Vue.set(state[type], 'search', query.search)
    }
    if (query.filters) {
      const filters = JSON.parse(query.filters)
      Object.keys(filters).forEach((filter) => {
        Vue.set(state[type].filters, filter, filters[filter])
      })
    }

    if (query.view) Vue.set(state[type], 'view', query.view)
    if (query.page) {
      Vue.set(state[type], 'page', query.page)
    } else {
      Vue.set(state[type], 'page', 1)
    }

    const defaultSort = [
      lists[type].sort[
        Object.keys(lists[type].sort).find(
          (item) => lists[type].sort[item].default === true
        )
      ],
    ]
    if (query.sortBy) Vue.set(state[type], 'sortBy', [query.sortBy])

    if (typeof query.sortDesc !== 'undefined') {
      Vue.set(state[type], 'sortDesc', !!(query.sortDesc === 'true'))
    } else {
      Vue.set(state[type], 'sortDesc', !!(defaultSort[0].value[1] === 'desc'))
    }
  },
  setSearch(state, { search, type }) {
    Vue.set(state[type], 'search', search)
  },
  setItems(state, { type, ...values }) {
    Vue.set(state[type], 'items', values.items)
    Vue.set(state[type], 'total', values.total)
    Vue.set(state[type], 'numberOfPages', values.numberOfPages)
  },
  setItemsPerPage(state, { value, type }) {
    state[type].itemsPerPage = value
  },
  setPage(state, { page, type }) {
    Vue.set(state[type], 'page', page)
  },
  setFilters(state, { filters, type }) {
    if (filters[Object.keys(filters)[0]].length)
      state[type].loading.push(Object.keys(filters)[0])
    Vue.set(
      state[type].filters,
      Object.keys(filters)[0],
      filters[Object.keys(filters)[0]]
    )
  },
  setSort(state, { value, type }) {
    Vue.set(state[type], 'sortBy', [value[0]])
    Vue.set(state[type], 'sortDesc', value[1] === 'desc')
  },
  setView(state, { value, type }) {
    Vue.set(state[type], 'view', value)
  },
  setFiltersCount(state, type) {
    const filters = state[type].filters
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
    Vue.set(state[type], 'filtersCount', filtersCount)
  },
  setBlankState(state, type) {
    Vue.set(state, 'resetFilters', true)

    console.log('RESET STATE', type)
    const defaultView =
      lists[type].views[
        Object.keys(lists[type].views).find(
          (item) => lists[type].views[item].default === true
        )
      ]
    const defaultSort = [
      lists[type].sort[
        Object.keys(lists[type].sort).find(
          (item) => lists[type].sort[item].default === true
        )
      ],
    ]
    // TODO make dynamic based on an ~/assets located file
    Vue.set(state[type], 'filters', {
      years: [],
      issue: [],
      tags: [],
      language: [],
      thematic: [],
      discipline: [],
      type: [],
    })

    Vue.set(state[type], 'search', '')
    Vue.set(state[type], 'view', defaultView.name)
    Vue.set(state[type], 'sortBy', [defaultSort[0].value[0]])
    Vue.set(state[type], 'sortDesc', defaultSort[0].value[1] === 'desc')
    Vue.set(state, 'resetFilters', false)
  },
  setBlankFilterLoad(state, type) {
    Vue.set(state[type], 'loading', [])
  },
  setStyle(state, style) {
    console.log('style: ', style)
    Vue.set(state.articles, 'style', style)
  },
}

// ACTIONS
export const actions = {
  async resetState({ dispatch, commit, state }, type) {
    commit('setBlankState', type)
    commit('setPage', { page: 1, type })
    await dispatch('update', type)
  },
  async updateSort({ dispatch, commit, state }, { value, type }) {
    commit('setSort', { value, type })
    commit('setPage', { page: 1, type })
    await dispatch('update', type)
  },
  async updateView({ dispatch, commit, state }, { value, type }) {
    commit('setView', { value, type })
    await dispatch('update', type)
  },
  async updateFilters({ dispatch, commit, state }, { filters, type }) {
    commit('setFilters', { filters, type })
    commit('setPage', { page: 1, type })
    await dispatch('update', type)
  },
  async updateItemsPerPage({ dispatch, commit, state }, { value, type }) {
    commit('setPage', { page: 1, type })
    commit('setItemsPerPage', { value, type })
    await dispatch('update', type)
  },
  async updatePage({ dispatch, commit, state }, { page, type }) {
    commit('setPage', { page, type })
    await dispatch('update', type)
  },
  async updateSearch({ dispatch, commit, state }, { search, type }) {
    commit('setPage', { page: 1, type })
    commit('setSearch', { search, type })
    await dispatch('update', type)
  },
  async update({ dispatch, commit, state, getters, rootState }, type) {
    console.log('UPDATE type: ', type)
    console.log('STORE OFF')
    commit('setLoading', true)
    // TODO re-enable when it works as intended once deployed
    /*     if (
      process.client &&
      Object.keys(window.$nuxt.$root.$loading).length &&
      process.env.NODE_ENV === 'production'
    ) {
      window.$nuxt.$root.$loading.start()
    } */
    const pipeline = {
      // default filters
      ...filtersRaw[type],
    }
    const queryFilters = {}
    pipeline.$or = []
    const filters = rootState[type].filters

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
        if (['tag', 'thematic', 'discipline', 'type'].includes(filter)) {
          pipeline[filter] = { $containsAny: val }
          // years to date special case
          // TODO make a fancy feature to limit the gte lt
        } else if (['language'].includes(filter)) {
          pipeline.language = { $containsAny: val }
        } else if (filter === 'issue') {
          pipeline.issue =
            val.length > 1
              ? {
                  $in: val.map((item) => 'content/issues/' + item + '.md'),
                }
              : 'content/issues/' + val[0] + '.md'
        } else if (filter === 'years') {
          const yearsToInt = val.map((i) => +i)
          if (['articles', 'media'].includes(type)) {
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
    const count = await this.$content(type, { deep: true })
      .search(rootState[type].search)
      .where(pipeline)
      .only('[]')
      .fetch()

    const totalItems = count.length
    console.log('totalItems: ', totalItems)

    // use Math.ceil to round up to the nearest whole number
    const lastPage = Math.ceil(totalItems / rootState[type].itemsPerPage)
    console.log('lastPage: ', lastPage)

    // use the % (modulus) operator to get a whole remainder
    const lastPageCount = totalItems % rootState[type].itemsPerPage
    const skipNumber = () => {
      if (+rootState[type].page === 1) {
        return 0
      }
      if (+rootState[type].page === lastPage) {
        if (lastPageCount === 0) {
          return totalItems - rootState[type].itemsPerPage
        }

        return totalItems - lastPageCount
      }
      return (+rootState[type].page - 1) * rootState[type].itemsPerPage
    }
    console.log('skipNumber: ', skipNumber())
    console.log('pipeline: ', pipeline)
    const sortArray =
      rootState[type].view === 'issues'
        ? [
            'issueIndex',
            rootState[type].sortDesc ? 'asc' : 'desc',
            'date',
            rootState[type].sortDesc ? 'asc' : 'desc',
          ]
        : [rootState[type].sortBy[0], rootState[type].sortDesc ? 'desc' : 'asc']
    console.log('sortArray: ', sortArray)
    let items = await this.$content(type, { deep: true })
      .where(pipeline)
      .search(rootState[type].search)
      .sortBy(sortArray[0], sortArray[1])
      .sortBy(sortArray[2], sortArray[3])
      .skip(skipNumber())
      .limit(rootState[type].itemsPerPage)
      .fetch()
    const defaultView =
      lists[type].views[
        Object.keys(lists[type].views).find(
          (item) => lists[type].views[item].default === true
        )
      ]
    const defaultSort =
      lists[type].sort[
        Object.keys(lists[type].sort).find(
          (item) => lists[type].sort[item].default === true
        )
      ]
    console.log('defaultView: ', defaultView)
    console.log('defaultSort: ', defaultSort)
    // update route
    const query = {
      ...(rootState[type].search &&
        typeof rootState[type].search !== 'undefined' && {
          search: rootState[type].search,
        }),
      ...(rootState[type].page > 1 && {
        page: rootState[type].page.toString(),
      }),
      ...(rootState[type].sortBy?.length &&
        rootState[type].sortBy[0] !== defaultSort.value[0] && {
          sortBy: rootState[type].sortBy[0],
        }),
      ...(typeof rootState[type].sortDesc !== 'undefined' &&
        (rootState[type].sortDesc ? 'desc' : 'asc') !==
          defaultSort.value[1] && {
          sortDesc: !!rootState[type].sortDesc,
        }),
      ...(rootState[type].view &&
        rootState[type].view !== defaultView.name && {
          view: rootState[type].view,
        }),
      ...(Object.keys(filters)?.length && {
        filters: JSON.stringify(queryFilters),
      }),
    }
    const sortObject = (obj) => Object.fromEntries(Object.entries(obj).sort())
    console.log('query: ', JSON.stringify(query))

    Object.keys(query).forEach((key) =>
      query[key] === undefined
        ? delete query[key]
        : // convert boolean to string
        typeof query[key] === 'boolean'
        ? query[key] === query[key].toString()
        : {}
    )
    console.log(JSON.stringify(sortObject(query)))
    console.log(JSON.stringify(sortObject(this.$router.currentRoute.query)))
    console.log(
      'should replace',
      JSON.stringify(sortObject(this.$router.currentRoute.query)) !==
        JSON.stringify(sortObject(query))
    )
    if (
      JSON.stringify(this.$router.currentRoute.query) !==
      JSON.stringify(sortObject(query))
    ) {
      // TODO fix these damn false positives (lead: see if pre-resolving the route before replacing it is possible/relevant or come up with another way to compare query & store)
      this.$router.replace({
        query,
      })
    }

    // fetch the item categories
    if (['articles', 'media'].includes(type)) {
      items = await Promise.all(
        await items.map((item) => {
          if (item.issue && item.issue.length) {
            console.log(item.issue)
            /*           item.issue = await this.$content(
              item.issue.split('/').slice(1).join('/').split('.')[0] // TODO fix (cmon)
            )
              .only(['title', 'color'])
              .fetch() */
          }
          return item
        })
      )
    }
    /*     const isDesc = rootState[type].sortDesc[0] || defaultSort.value[1]
    const sorter = rootState[type].sortBy[0] || defaultSort.value[0]
    console.log('sorter: ', sorter)
    items = items.sort(
      (a, b) =>
        (isDesc ? a[sorter] : b[sorter]) - (isDesc ? b[sorter] : a[sorter])
    ) */
    commit('setFiltersCount', type)
    commit('setBlankFilterLoad', type)
    commit('setItems', {
      items,
      total: totalItems,
      numberOfPages: lastPage,
      type,
    })
    commit('setLoading', false)

    if (
      process.client &&
      window.$nuxt.$root.$loading &&
      process.env.NODE_ENV === 'production'
    ) {
      // TODO wheck and find out why the object below is not available in some cases when deployed
      /*  window.$nuxt.$root.$loading.stop() */
    }
    /* HIGHLIGHT MECHANISM (disabled until reassessment of its usefulness & relevance
    //TODO deal with that ) 
    // on mobile or list view, highlight slots are the first ones
    if (
      window.$nuxt.$root.$vuetify.breakpoint.mobile ||
      ['list', 'text'].includes(rootState[type].view)
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
      const availableSlots = rootState[type].itemsPerPage / 3

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
export const getters = {}
