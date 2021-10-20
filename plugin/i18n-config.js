// ~/plugins/i18n.js

export default function ({ app, store }) {
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    if (!newLocale?.length) {
      console.log('newLocale: ', newLocale)
    }
  }
}
