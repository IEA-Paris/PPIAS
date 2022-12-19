// plugins/vuetify.js
import colors from 'vuetify/lib/util/colors'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const theme = {
    defaultTheme: 'light',
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
      }
    },
  }
  const vuetify = createVuetify({
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
    components,
    directives,
    theme,
  })

  nuxtApp.vueApp.use(vuetify)
})