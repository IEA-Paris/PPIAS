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
