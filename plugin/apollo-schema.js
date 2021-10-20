import getUser from '~/graphql/queries/getUser.gql'
import login from '~/graphql/queries/login.gql'

export default class ApolloScheme {
  constructor(auth, options) {
    this.$auth = auth
    this.$apollo = auth.ctx.app.apolloProvider.defaultClient
    this.$apolloHelpers = auth.ctx.app.$apolloHelpers
    this._name = options._name
  }

  login({ data, tokenKey = 'token', userKey = 'user' }) {
    try {
      return this.$apollo
        .query({
          query: login,
          variables: data,
        })
        .then((data) => {
          this.setUserToken(data?.data?.login?.accessToken)
        })
    } catch (error) {}
  }

  setToken(tokenValue) {
    return this.$apolloHelpers.onLogin(tokenValue).then(() => this.$auth.setToken(this._name, tokenValue))
  }

  setUser(user) {
    return this.$auth.setUser(user)
  }

  setUserToken(tokenValue) {
    return this.setToken(tokenValue).then(() => this.fetchUser())
  }

  check() {
    const status = !!this.$auth.getToken(this._name) && this.$auth.getToken(this._name) !== this._name
    return status
  }

  fetchUser() {
    if (!this.check()) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(false)
    }

    return this.$apollo.query({ query: getUser }).then(({ data }) => {
      this.setUser(data?.getUser)
    })
  }

  logout() {
    return this.$apolloHelpers.onLogout().then(() => this.reset())
  }

  reset() {
    return this.setToken(this._name, null).then(() => this.setUser(null))
  }
}
