import colors from 'vuetify/es5/util/colors.js'

export default {
  env: { NODE_ENV: 'dev' },
  repo: 'IEA-Paris/PPIAS',
  name: 'PPIAS',
  full_name: 'Proceedings of the Paris Institute for Advanced Study', // set to false if there is none
  full_name_html:
    'Proceedings of the Paris&nbsp;Institute<br>for Advanced&nbsp;Study', // set to false if there is none
  domain: 'paris', // > paris.pias.science
  address: "17, Quai d'Anjou 75004 PARIS - FRANCE",
  phone: '+33(0)1 56 81 00 52',
  email: 'publications@paris-iea.fr',
  subtitle: 'Open source publishing platform for open science.',
  description:
    'The Paris Institute for Advanced Study (Paris IAS) is a transdisciplinary research center that welcomes researchers from all over the world in the fields of humanities and social sciences. These proceedings present the conferences, lecture series and other scientific productions in the form of indexed and quotable publications, often accompanied by videos or podcasts.',
  splash_title: 'Open source publishing platform for open science.',
  recaptcha: '6Lc_xuUUAAAAALwowUq0cC0wFtFnZ2NCi3UH4i1j',
  logo: 'icon.png',
  logo_alt: 'icon_dark.png',
  publisher: 'Paris Institute for Advanced Study',
  contributors: [
    {
      type: 'Organization',
      name: 'Paris Institute for Advanced Study',
      url: 'https://paris-iea.fr/en',
      ror: 'https://ror.org/02rvv6x76',
      role: 'Hosting institution',
    },
  ],
  location: {
    origin:
      'https://www.openstreetmap.org/export/embed.html?bbox=2.356580793857575%2C48.850586483414915%2C2.361644804477692%2C48.85278204589751&amp;layer=mapnik&amp;marker=48.851684276691216%2C2.359112799167633',
    target:
      'https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911',
  },
  // graphqlEndpoint:
  //   'https://mz3e6z5nlngvdls3zh3possona.appsync-api.eu-west-2.amazonaws.com/graphql',
  // graphqlApiKey: 'da2-eb5bkfhsvbdz3mexfykmkwjka4',
  keywords: 'open source, open science, science, vuejs, nuxt, vuetify, vuex',
  url: 'https://paris.pias.science',
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
  // TODO declare the features that should be enabled to customize the website & enforce them
  features: {
    generate: {
      pdf: true,
      thumbnails: true,
      tableOfContent: true,
      bibliography: true,
    },
    disseminate: {
      Zenodo: true,
    },
  },
  theme: {
    loading: 'red',
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
        primary: '#2196f3',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  identifier: {
    ISSN: '2826-2832',
  },
  modules: {
    sentry: {
      dsn: 'https://18d0920f9ee09e51960add3e3bb03dcd@sentry.paris-ias.io/13',
    },
    ackee: {
      domain: '0406b6c9-6dfc-44de-bb13-83bc0607cb14',
      server: 'https://ackee.paris-ias.io/',
    },
    zenodo: {
      token: process.env.ZENODO_TOKEN,
      sandboxToken: process.env.ZENODO_SANDBOX_TOKEN,
      sandbox: false,
      // Must be the community slug (path segment from the Zenodo URL),
      // not the display title — Zenodo accepts the request either way
      // but only the slug resolves the community association.
      community: 'proceedings-of-the-institutes-for-advanced-studies',
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
        'Bodoni Moda': [500, 700],
        'Open Sans': [500, 700],
      },
    },
    bibliography: {
      defaultStyle: 'APA',
      styles: [],
    },
    robots: [
      {
        UserAgent: '*',
        Allow: '/',
        Disallow: ['/admin/', '/print/'],
        CrawlDelay: 1,
      },
      {
        UserAgent: 'Googlebot-Scholar',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'bingbot',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'SemanticScholar',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'WebofScienceBot',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'ElsevierBot',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'OpenAlexBot',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'DimensionsBot',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'ResearchGate',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'Academia.edu',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'CrossrefBot',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'CORE-bot',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
      {
        UserAgent: 'BASEBot',
        Allow: ['/', '/article/', '/articles/', '/pdfs/'],
        Disallow: ['/admin/', '/print/'],
      },
    ],
  },
}
