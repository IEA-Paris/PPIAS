export default defineNuxtPlugin(nuxtApp => {
  const { $vuetify } = nuxtApp
  if (
    typeof Storage !== 'undefined' &&
    localStorage.getItem('darkMode') !== null
  ) {
    $vuetify.theme.dark = localStorage.getItem('darkMode') === 'true'
  }
});
