import EventEmitter from 'events'
import config from './config.js'
import contentHooks from './tools/content'
import { writePrintRoutes } from './tools/lib/contentUtilities.js'
EventEmitter.defaultMaxListeners = 20
export default {
  env: { config },
  server: {
    port: 3000, // par défaut: 3000
    host: '0.0.0.0', // par défaut: localhost
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: true,
  generate: {
    // TODO double-check that it is necessary to decalre routes:
    // somehow the integrated crawler doesn't do the job of matching dynamic routes.
    // I see 2 possible reasons and probably missed some other ones:
    // 1 - it is a store related issue > when the route slug is fetched from store, the crawler doesn't wait for it.
    // 2 - the pdf generation module is tempering with the routes generation, thus preventing the crawler from doing its job
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await Promise.all([
        '/articles',
        '/media',
        '/authors',
        ...(
          await $content('articles', { deep: true }).only(['slug']).fetch()
        ).map((file) => '/articles/' + file.slug),
        ...(
          await $content('media', { deep: true }).only(['slug']).fetch()
        ).map((file) => '/media/' + file.slug),
        ...(
          await $content('authors', { deep: true }).only(['slug']).fetch()
        ).map((file) => '/authors/' + file.slug),
        /*   await $content('issues', { deep: true }).only(['slug']).fetch()
        ).map((file) => '/issues/' + file.slug), */
      ])

      return files
    },
  },
  /* Global page headers: https://go.nuxtjs.dev/c onfig-head
  
  Headers of the page
    - Nuxt.js uses vue-meta to update the headers and html attributes of your application.
    - Nuxt.js configures vue-meta with these options:
      {
        keyName: 'head', // the component option name that vue-meta looks for meta info on.
        attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
        ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
        tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
      }
  */
  head: {
    // The value of title will be injected into the %s placeholder in titleTemplate before being rendered.
    // The original title will be available on metaInfo.titleChunk.
    titleTemplate: `%s - ${config.full_name}`,
    // Maps to the inner-text value of the <title> element.
    title: config.name,
    // Each item in the array maps to a newly-created <script> element,
    // where object properties map to attributes.
    // Example output: <script type="application/ld+json">{ "@context": "http://schema.org" }</script>
    script: [
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver',
        body: true,
      },
    ],

    // Nuxt.js lets you define all default <meta> tags for your application inside nuxt.config.js. Define them using the same head property:
    // Each item in the array maps to a newly-created <meta> element, where object properties map to attributes.
    // Example output:
    // <meta charset="utf-8">
    // <meta name="viewport" content="width=device-width, initial-scale=1">
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
        content: `${config.name} • ${config.description}`,
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
      // Since v1.5.0 of vue-meta, you can now set up meta templates that work similar to the titleTemplate:
      // Example output:
      // <meta charset="utf-8">
      // <meta name="og:title" property="og:title" content="Test title - My page">
      {
        vmid: 'og:title',
        property: 'og:title',
        content: config.name,
        template: (chunk) => `Article - ${chunk}`, // or as string template: '%s - My page'
      },
    ],
    // Each item in the array maps to a newly-created <link> element,
    // where object properties map to attributes.
    /*    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }], */
    // Each key:value maps to the equivalent attribute:value of the <body> element.
    // Example output: <body bar="baz">Foo Bar</body>
    /*    bodyAttrs: {
      bar: 'baz'
    }, */

    // Maps to a newly-created <base> element, where object properties map to attributes.
    // Example output: <base target="_blank" href="/">
    /*     base: {
      target: '_blank',
      href: '/' 
    }, */

    // Each item in the array maps to a newly-created <noscript> element,
    // where object properties map to attributes.
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],

    // By default, vue-meta sanitizes HTML entities in every property. You can disable this behaviour on a per-property basis
    // using __dangerouslyDisableSantizers. Just pass it a list of properties you want sanitization to be disabled on:
    // Example output:
    // <title>&lt;I will be sanitized&gt;</title>
    // <meta vmid="description" name="description" content="& I will not be <sanitized>">
    /*   __dangerouslyDisableSanitizers: ['meta'], */

    // Provides same functionality as __dangerouslyDisableSanitizers but you can specify which property for which tagIDKeyName's sanitization should be disabled.
    // It expects an object with the vmid's as key and an array with property names value:
    // Example output:
    // <title>&lt;I will be sanitized&gt;</title>
    // <meta vmid="description" name="still-&amp;-sanitized" content="& I will not be <sanitized>">
    /*    __dangerouslyDisableSanitizersByTagID: {
      description: ['content'],
    }, */

    // Will be called when the client metaInfo updates/changes. Receives the following parameters:
    // newInfo | (Object) | The new state of the metaInfo object.
    // addedTags | ([HTMLElement]) | a list of elements that were added.
    // removedTags | ([HTMLElement]) | a list of elements that were removed.
    /*     changed(newInfo, addedTags, removedTags) {
      console.log('Meta info was updated!')
    }, */
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
    /*    { src: '~/plugin/vuex-persist', ssr: false }, */
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
    '~/modules/nuxt-pdf',
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
    // https://github.com/f/vue-wait
    /*   ['vue-wait/nuxt', { useVuex: true }], */
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
    /*     basePlugins: [
      'remark-squeeze-paragraphs',
      'rehype-slug',
      'rehype-autolink-headings',
      'rehype-external-links',
      'remark-gfm',
      'remark-bibliography',
    ], */
    fullTextSearchFields: [
      'lastname',
      'authors.$.lastname',
      'article_title',
      'caption',
      'institution',
    ],
  },

  // Content hooks
  ...contentHooks,
  loading: {
    color: 'black',
    height: '5px',
  },
  /*   // Customize the loading indicator (https://nuxtjs.org/api/configuration-loading-indicator)
  loadingIndicator: {
    name: '~/assets/loader.html',
    color: config.theme.themes.light.primary,
    background: config.theme.themes.light.secondary,
  }, */
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
    langDir: 'translations/',
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
      width: 2048,
      height: 3508,
    },

    /*
     * Enable i18n support.
    // TODO: reactivate
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
    },

    /*
     * PDF generation routes. (expanding nuxt.generate)
     */
    routes: async () => await writePrintRoutes(),
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
