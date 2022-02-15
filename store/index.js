export const state = () => ({
  scrolled: process.browser ? window.pageYOffset > 0 : false,
  logo: 0,
})

export const mutations = {
  setLogo(state, value) {
    state.logo = value
  },
  setScrolled(state) {
    if (process.browser) {
      state.scrolled = window.pageYOffset > 0
    }
  },
  updateUser(state, field, value) {
    state[field] = value
  },
}
export const actions = {}
export const getters = {
  filtersCount: (state) => (type) => {
    const filters = state[type].filters
    return (
      Object.keys(filters)
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
    )
  },
}
