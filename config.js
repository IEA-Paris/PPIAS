import colors from 'vuetify/es5/util/colors'

export default {
  name: 'wprn',
  full_name: 'World Pandemic Research Network', // set to false if there is none
  subtitle:
    'Public initiative to publish and share in one single place the list of all research initiatives and surveys about the current pandemic of Covid-19 coronavirus.',
  description:
    'Public initiative to publish and share in one single place the list of all research initiatives and surveys about the current pandemic of Covid-19 coronavirus. (TEST)',
  splash_title: 'Societal impacts and aftermath of Covid-19:<br> A global searchable directory',
  item_sg: 'Project',
  item_pl: 'Projects',
  recaptcha: '6Lc_xuUUAAAAALwowUq0cC0wFtFnZ2NCi3UH4i1j',
  graphqlEndpoint: 'https://mz3e6z5nlngvdls3zh3possona.appsync-api.eu-west-2.amazonaws.com/graphql',
  graphqlApiKey: 'da2-eb5bkfhsvbdz3mexfykmkwjka4',
  keywords: 'boilerplate, vuejs, nuxt, vuetify, vuex',
  url: 'https://wprn.org',
  lang: {
    default: 'en',
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'French',
        file: 'fr.json',
        dir: 'ltr',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr',
      },
    ],
  },
  features: {
    theme: true,
    referents: true,
    publicAlerts: true,
    projectAlerts: true,
  },
  splash: {
    colour1: '#2196f3',
    colour2: '#144DDB',
    count: 3,
    dy: 0.05,
    offset: 0.5,
    opacity: 0.4,
    peak: 4,
    scale: 0.11,
    speed: 0.05,
  },
  theme: {
    loading: '#2196f3',
    dark: false,
    themes: {
      light: {
        primary: '#2196f3',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: colors.blue,
        accent: colors.grey.darken3,
        secondary: colors.grey.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.darken3,
        error: colors.deepOrange.darken3,
        success: colors.green.accent3,
      },
    },
  },
  modules: {
    sentry: {
      dsn: 'https://933066c491f04f9a8b15141c68c7a0a8@sentry.paris-ias.io/9',
    },
    ackee: {
      domain: '86fe4dda-a275-4eed-8d95-cbea7e2b38e4',
      server: 'https://ackee.paris-ias.io/',
    },
    image: {
      domains: [
        'https://picsum.photos',
        // snipcart.nuxtjs.org',
        'source.unsplash.com',
      ],
    },
    deepl: {
      key: process.env.DEEPL_KEY,
    },
    fonts: {
      families: {
        Petrona: [500, 700],
        'Open Sans': [500, 700],
      },
    },
  },
}
