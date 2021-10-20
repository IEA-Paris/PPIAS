export default (context) => {
  if (typeof Storage !== 'undefined' && localStorage.getItem('darkMode') !== null) {
    context.$vuetify.theme.dark = localStorage.getItem('darkMode') === 'true'
  }
}
