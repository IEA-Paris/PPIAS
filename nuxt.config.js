import config from './config.js'
import contentHooks from './tools/content'
export default {
  env: { config },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    fallback: true,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s - ${config.title}`,
    title: config.title,

    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { charset: 'utf-8' },
      {
        name: 'keywords',
        content: config.keywords,
      },
      {
        name: 'X-UA-Compatible',
        content: 'IE=edge, chrome=1',
      },
      {
        itemprop: 'name',
        content: `${config.name} • ${config.shortDescription}`,
      },
      {
        itemprop: 'description',
        content: config.description,
      },
      {
        itemprop: 'image',
        content: `${process.config.BASE_URL}/banner.jpg`,
      },
      // Add to homescreen for Chrome on Android. Fallback for PWA (handled by nuxt)
      {
        name: 'application-name',
        content: config.name,
      },
      // Windows phone tile icon
      {
        name: 'msapplication-TileImage',
        content: `/icon.png`,
      },
      {
        name: 'msapplication-TileColor',
        content: config.theme.themes.light.secondary,
      },
      {
        name: 'msapplication-tap-highlight',
        content: 'no',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  server: {
    port: 3000, // par défaut: 3000
    host: '0.0.0.0', // par défaut: localhost
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@mdi/font/css/materialdesignicons.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugin/config',
    { src: '~plugin/i18n-config.js' },
    { src: '~/plugin/vuetify-theme', mode: 'client' },
    /*  { src: '~/plugin/apollo-config', mode: 'client' }, */
    { src: '~/plugin/vue-youtube', mode: 'client' },
    '~/plugin/jsonld',
    { src: '~/plugin/vuex-persist', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    loader: true,
    dirs: [{ path: '~/components', pathPrefix: false }],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://github.com/robcresswell/nuxt-compress
    'nuxt-compress',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    '@nuxt/image',
    // https://github.com/nuxt-community/html-validator-module#readme
    /*     '@nuxtjs/html-validator', */
    // https://ackee.nuxtjs.org/
    '@nuxtjs/ackee',
    '@nuxtjs/composition-api/module',
    // https://github.com/ch99q/nuxt-pdf
    'nuxt-pdf',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/api/auth/
    /*  '@nuxtjs/auth', */
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/i18n-module
    '@nuxtjs/i18n',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap',
    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',

    // https://sentry.nuxtjs.org/
    '@nuxtjs/sentry',
    // https://github.com/nuxt-community/apollo-module
    /*  '@nuxtjs/apollo', */
  ],
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // MODULES CONFIGURATIONS
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  /*
   ** Sentry module configuration
   ** https://github.com/nuxt-community/sentry-module#options
   */
  sentry: {
    dsn: config.modules.sentry.dsn,
    config: config.modules.sentry.config, // Additional config
  },
  /*
   ** Ackee module configuration
   ** https://github.com/nuxt-community/ackee-module
   ** https://ackee.nuxtjs.org/
   */
  ackee: {
    server: config.modules.ackee.server,
    domainId: config.modules.ackee.domain,
    // see documentation for more!
    ignoreOwnVisits: false,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration (https://pwa.nuxtjs.org/setup)
  pwa: {
    meta: {
      name: `${config.name} - ${config.shortDescription}`,
      description: config.description,
      ogHost: process.env.BASE_URL,
      ogImage: `${process.env.BASE_URL}/banner.jpg`,
      twitterCard: 'summary_large_image',
      /* twitterSite: env.social.twitter,
     twitterCreator: env.social.twitter, */
      theme_color: config.theme.themes.light.secondary,
    },
    manifest: {
      name: config.name,
      short_name: config.name,
      description: config.shortDescription,
      start_url: '/?source=pwa',
      background_color: config.theme.themes.light.secondary,
      lang: config.lang.default,
    },
    icon: {},
  },
  /*
   ** robots module configuration
   ** https://github.com/nuxt-community/robots-module#options
   */
  // Robots module configuration (https://github.com/nuxt-community/robots-module)
  robots: {
    UserAgent: '*',
    Disallow: '',
    Allow: '/',
    Sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  },
  // https://image.nuxtjs.org
  image: {
    screens: {
      avatarSm: 24,
      avatarLg: 48,
      logo: 32,
      migration: 536,
      blogImage: 864,
    },
    domains: config.modules.image.providers,
  },
  // ESLint module configuration (https://github.com/nuxt-community/eslint-module)
  eslint: {
    fix: true,
    emitWarning: true,
    quiet: true,
  },
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    basePlugins: [
      'remark-squeeze-paragraphs',
      'remark-slug',
      'remark-autolink-headings',
      'remark-external-links',
      'remark-footnotes',
      'remark-bibliography',
    ],
    fullTextSearchFields: [
      'lastname',
      'article_title',
      'caption',
      'institution',
    ],
  },
  // Content hooks
  ...contentHooks,
  loading: {
    color: config.theme.themes.loading,
    height: '5px',
  },
  // Customize the loading indicator (https://nuxtjs.org/api/configuration-loading-indicator)
  loadingIndicator: {
    name: '~/assets/loader.html',
    color: config.theme.themes.light.primary,
    background: config.theme.themes.light.secondary,
  },
  googleFonts: {
    families: config.modules.fonts.families,
    download: true,
    base64: true,
    inject: true,
  },
  /*
   ** Sitemap module configuration
   ** https://github.com/nuxt-community/sitemap-module#setup-a-sitemap
   */
  sitemap: {
    hostname: config.url,
    gzip: true,
    exclude: [],
    icons: [],
  },
  styleResources: {
    scss: [
      './assets/*.scss',
      './node_modules/lite-youtube-embed/src/lite-yt-embed.css',
    ],
  },
  // https://i18n.nuxtjs.org/
  i18n: {
    langDir: 'i18n/',
    locales: config.lang.locales,
    defaultLocale: config.lang.default,
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: config.lang.default,
    },
    baseUrl: config.url,
    lazy: true,
    detectBrowserLanguage: {
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
  },
  /*
   ** Auth module configuration
   ** https://auth.nuxtjs.org/providers/auth0.html
   */
  /*   auth: {
    cookie: false,
    strategies: {
      local: false,
      apollo: {
        _scheme: '~/plugins/apollo-schema.js',
        name: 'apollo',
        provider: 'apollo',
        token_type: '',
        default: true,
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    localStorage: {
      prefix: 'auth.',
    },
  }, */
  /*
   ** Apollo module configuration
   ** https://github.com/nuxt-community/apollo-module
   */
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
    },
    authenticationType: '',
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    iconfont: 'mdi',
    options: {
      customProperties: true,
    },
    defaultAssets: {
      font: false,
      icons: false,
    },
    treeShake: true,
    theme: {
      dark: config.theme.dark,
      themes: {
        dark: {
          primary: config.theme.themes.dark.primary,
          accent: config.theme.themes.dark.accent,
          secondary: config.theme.themes.dark.secondary,
          info: config.theme.themes.dark.info,
          warning: config.theme.themes.dark.warning,
          error: config.theme.themes.dark.error,
          success: config.theme.themes.dark.success,
        },
        light: {
          primary: config.theme.themes.light.primary,
          accent: config.theme.themes.light.accent,
          secondary: config.theme.themes.light.secondary,
          info: config.theme.themes.light.info,
          warning: config.theme.themes.light.warning,
          error: config.theme.themes.light.error,
          success: config.theme.themes.light.success,
        },
      },
    },
  },
  pdf: {
    /*
     * Output folder for generated pdf.
     */
    dir: 'static',

    /*
     * Function options for page.pdf([options])
     * Read more: https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-pagepdfoptions
     */
    pdf: {
      // Change the format of the pdfs.
      format: 'A4', // This is optional
      printBackground: true, // Include background in pdf.
    },

    /*
     * Function options for page.setViewport([options])
     * Read more: https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-pagesetviewportviewport
     */
    viewport: {
      // override the default viewport
      width: 1280,
      height: 800,
    },

    /*
     * Enable i18n support.
     */
    i18n: false,

    /*
     * Add options to the puppeteer launch.
     * Read more: https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-puppeteerlaunchoptions
     */
    /*     puppeteer: {
      // Puppeteer options here... E.g. env: {}
    }, */

    /*
     * PDF Meta configuration. (inspired by vue-meta)
     */
    meta: {
      title: '%s',
      titleTemplate: 'PIAS ─ %s',

      author: 'Antoine Cordelois',
      subject: 'Example',

      producer: 'Example Inc.',

      // Control the date the file is created.
      creationDate: new Date(),

      keywords: ['pdf', 'nuxt'],
    },

    /*
     * PDF generation routes. (expanding nuxt.generate)
     */
    routes: [
      {
        // Output file inside output folder.
        /*  file: "downloads/documentation.pdf", */

        // Route to content that should be converted into pdf.
        route: 'articles',

        // Default option is to remove the route after generation so it is not accessible
        keep: false, // defaults to false

        // Specifify language for pdf. (Only when i18n is enabled!)
        locale: 'da',

        // Override global meta with individual meta for each pdf.
        meta: {
          title: 'Home',
        },
        pdf: {
          // route specific pdf options
          landscape: true, // Include background in pdf.
        },
        viewport: {
          // route specific viewport
          width: 1280,
          height: 800,
        },
      },
      {
        // Output: static/downloads/documentation-vue.pdf
        file: 'articles/documentation-vue.pdf',

        // Will generate route https://localhost:3000/docs/vue
        route: 'articles/_slug',

        // Title will be Documentation - Vue
        meta: {
          title: 'Vue',
        },
      },
    ],
  },
  /*
   ** Page Layout transition
   ** https://nuxtjs.org/guides/features/transitions#the-layouttransition-property
   */
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
    beforeEnter(el) {
      console.log('TRANSITION : Before enter...')
    },
    afterLeave(el) {
      console.log('TRANSITION : afterLeave', el)
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
    babel: {
      compact: true,
    },
  },
}
