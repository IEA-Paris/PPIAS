import filtersRaw from '~/assets/data/filters'
import lists from '~/assets/data/lists'
import {useArticlesStore} from '~/store/articles'
import {useAuthorsStore} from '~/store/authors'
import {useMediaStore} from '~/store/media'

const childrenStores = {
  articles: useArticlesStore(),
  authors: useAuthorsStore(),
  media: useMediaStore()
}

export const useRootStore = defineStore('rootStore', {


  getters: {
    getChildrenStore: () => (nameChildrenStore) => childrenStores[nameChildrenStore],
  },

  state: () => ({
    scrolled: process.browser ? window.pageYOffset > 0 : false,
    logo: 0,
    loading: true,
    resetFilters: false,
  }),

  actions: {
    setLogo(value) {
      this.logo = value
    },
    setLoading(value) {
      this.loading = value
    },
    setScrolled() {
      if (process.browser) {
        this.scrolled = window.pageYOffset > 0
      }
    },
  
    loadRouteQuery(type) {
      const { currentRoute } = useRouter();
      const query = currentRoute.value.query
  
      if (query.search) {
        childrenStores[type].search = query.search
      }
      if (query.filters) {
        const filters = JSON.parse(query.filters)
        Object.keys(filters).forEach((filter) => {
          childrenStores[type].filters[filter] = filters[filter]
        })
      }
  
      if (query.view) {
        childrenStores[type].view = query.view
      }
      if (query.page) {
        childrenStores[type].page = +query.page
      } else {
        childrenStores[type].page = 1
      }
  
      const defaultSort = [
        lists[type].sort[
          Object.keys(lists[type].sort).find(
            (item) => lists[type].sort[item].default === true
          )
        ],
      ]
      if (query.sortBy) {
        childrenStores[type].sortBy = [query.sortBy]
      }
  
      if (typeof query.sortDesc !== 'undefined') {
        childrenStores[type].sortDesc = !!(query.sortDesc === 'true')
      } else {
        childrenStores[type].sortDesc = !!(defaultSort[0].value[1] === 'desc')
      }
    },
    setSearch({ search, type }) {
      childrenStores[type].search = search
    },
    setItems({ type, ...values }) {
      childrenStores[type].items = values.items
      childrenStores[type].total = values.total
      childrenStores[type].numberOfPages = values.numberOfPages
    },
    setItemsPerPage({ value, type }) {
      childrenStores[type].itemsPerPage = value
    },
    setPage({ page, type }) {
      childrenStores[type].page = page
    },
    setFilters({ filters, type }) {
      if (filters[Object.keys(filters)[0]].length)
        childrenStores[type].loading.push(Object.keys(filters)[0])

      childrenStores[type].filters[Object.keys(filters)[0]] = filters[Object.keys(filters)[0]]
    },
    setSort({ value, type }) {
      childrenStores[type].sortBy = [value[0]]
      childrenStores[type].sortDesc = value[1] === 'desc'
    },
    setView({ value, type }) {
      childrenStores[type].view = value
    },
    setFiltersCount(type) {
      const filters = childrenStores[type].filters
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
      childrenStores[type].filtersCount = filtersCount
    },
    setBlankState(type) {
      this.resetFilters = true
  
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
      childrenStores[type].filters = {
        years: [],
        issue: [],
        tags: [],
        language: [],
        thematic: [],
        discipline: [],
        type: [],
      }
      childrenStores[type].search = ''
      childrenStores[type].view = defaultView.value
      childrenStores[type].sortBy = defaultSort[0].value[0]
      childrenStores[type].sortDesc = defaultSort[0].value[1] === 'desc'
      childrenStores[type].resetFilters = false
    },
    setBlankFilterLoad(type) {
      childrenStores[type].loading = []
    },
    setStyle(style) {
      childrenStores.articles.style = style
    },

    resetState(type) {
      this.setBlankState(type)
      this.setPage({ page: 1, type })
      this.update(type)
    },
    updateSort({ value, type }) {
      this.setSort({ value, type })
      this.setPage({ page: 1, type })
      this.update(type)
    },
    updateView({ value, type }) {
      this.setView({ value, type })
      this.update(type)
    },
    updateFilters({ filters, type }) {
      this.setFilters({ filters, type })
      this.setPage({ page: 1, type })
      this.update(type)
    },
    updateItemsPerPage({ value, type }) {
      this.setPage({ page: 1, type })
      this.setItemsPerPage({ value, type })
      this.update(type)
    },
    updatePage({ page, type }) {
      this.setPage({ page, type })
      this.update(type)
    },
    updateSearch({ search, type }) {
      this.setPage({ page: 1, type })
      this.setSearch({ search, type })
      this.update(type)
    },
    async update(type) {
      const router = useRouter();
      this.setLoading(true)
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
      const filters = childrenStores[type].filters
  
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
      
      const count = await queryContent(type)
                          //   .search(childrenStores[type].search)
                            .where(pipeline)
                            .only('[]')
                            .find()
  
      const totalItems = count.length
  
      // use Math.ceil to round up to the nearest whole number
      const lastPage = Math.ceil(totalItems / childrenStores[type].itemsPerPage)
  
      // use the % (modulus) operator to get a whole remainder
      const lastPageCount = totalItems % childrenStores[type].itemsPerPage
      const skipNumber = () => {
        if (+childrenStores[type].page === 1) {
          return 0
        }
        if (+childrenStores[type].page === lastPage) {
          if (lastPageCount === 0) {
            return totalItems - childrenStores[type].itemsPerPage
          }
  
          return totalItems - lastPageCount
        }
        return (+childrenStores[type].page - 1) * childrenStores[type].itemsPerPage
      }
  
      const sortArray =
        childrenStores[type].view === 'issues'
          ? [
              'issueIndex',
              childrenStores[type].sortDesc ? 1 : -1,
              'date',
              childrenStores[type].sortDesc ? 1 : -1,
            ]
          : [childrenStores[type].sortBy[0], childrenStores[type].sortDesc ? -1 : 1]
  
      const items = await queryContent(type)
                          // .search(childrenStores[type].search)
                            .where(pipeline)
                            .sort({ [sortArray[0]]: sortArray[1] })
                            .sort({ [sortArray[2]]: sortArray[3] })
                            .skip(skipNumber())
                            .limit(childrenStores[type].itemsPerPage)
                            .find()
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
  
      // update route
      const query = {
        ...(childrenStores[type].search &&
          typeof childrenStores[type].search !== 'undefined' && {
            search: childrenStores[type].search,
          }),
        ...(childrenStores[type].page > 1 && {
          page: childrenStores[type].page.toString(),
        }),
        ...(childrenStores[type].sortBy?.length &&
          childrenStores[type].sortBy[0] !== defaultSort.value[0] && {
            sortBy: childrenStores[type].sortBy[0],
          }),
        ...(typeof childrenStores[type].sortDesc !== 'undefined' &&
          (childrenStores[type].sortDesc ? 'desc' : 'asc') !==
            defaultSort.value[1] && {
            sortDesc: !!childrenStores[type].sortDesc,
          }),
        ...(childrenStores[type].view &&
          childrenStores[type].view !== defaultView.name && {
            view: childrenStores[type].view,
          }),
        ...(Object.keys(filters)?.length && {
          filters: JSON.stringify(queryFilters),
        }),
      }
      const sortObject = (obj) => Object.fromEntries(Object.entries(obj).sort())
  
      Object.keys(query).forEach((key) =>
        query[key] === undefined
          ? delete query[key]
          : // convert boolean to string
          typeof query[key] === 'boolean'
          ? query[key] === query[key].toString()
          : {}
      )
  
      if (
        JSON.stringify(router.currentRoute.value.query) !==
        JSON.stringify(sortObject(query))
      ) {
        // TODO fix these damn false positives (lead: see if pre-resolving the route before replacing it is possible/relevant or come up with another way to compare query & store)
        router.replace({
          query,
        })
      }
  
      // fetch the item categories
      /*     if (['articles', 'media'].includes(type)) {
        items = await Promise.all(
          await items.map((item) => {
            if (item.issue && item.issue.length) {
              /*           item.issue = await this.$content(
                item.issue.split('/').slice(1).join('/').split('.')[0] // TODO fix (cmon)
              )
                .only(['title', 'color'])
                .fetch() 
            }
            return item
          })
        )
      } */
      /*     const isDesc = childrenStores[type].sortDesc[0] || defaultSort.value[1]
      const sorter = childrenStores[type].sortBy[0] || defaultSort.value[0]
      
      items = items.sort(
        (a, b) =>
          (isDesc ? a[sorter] : b[sorter]) - (isDesc ? b[sorter] : a[sorter])
      ) */
      this.setFiltersCount(type)
      this.setBlankFilterLoad(type)
      this.setItems({
        items,
        total: totalItems,
        numberOfPages: lastPage,
        type,
      })
      this.setLoading(false)
  
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
        ['list', 'text'].includes(rootStore[type].view)
      ) {
        items = items.sort((a, b) => b.highlight - a.highlight)
        
        this.setFiltersCount(        this.setItems({
          items,
          total: totalItems,
          numberOfPages: lastPage,
        })
      } else {
        // on md highlight slots are on a 1/5/6 pattern
        const availableSlots = rootStore[type].itemsPerPage / 3
  
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
        this.setFiltersCount(        this.setItems({
          items: sortedItems,
          total: totalItems,
          numberOfPages: lastPage,
        })
      } */
    }
  }
})
