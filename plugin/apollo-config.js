import { InMemoryCache } from 'apollo-cache-inmemory'
import env from '../config.js'

export default ({ app }) => {
  return {
    httpEndpoint: env.graphqlEndpoint,
    httpLinkOptions: {
      headers: {
        /* lang: app.i18n.locale, TODO fix */
        lang: 'en',
        'x-api-key': env.graphqlApiKey,
      },
    },
    cache: new InMemoryCache({ addTypename: false }),
  }
}
