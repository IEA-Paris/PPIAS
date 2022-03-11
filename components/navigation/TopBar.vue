<template>
  <v-toolbar
    id="main-app-bar"
    color="white"
    clipped
    flat
    height="140"
    :class="{ loading: $nuxt.loading }"
  >
    <div class="d-flex flex-grow-1 justify-space-between">
      <Logo class="" />
      <!-- <LanguageSwitcher /> -->
      <div class="d-flex flex-column justify-space-between">
        <div class="text-right">
          <SearchMenu />
          <MainMenu />
        </div>

        <div
          v-if="$vuetify.breakpoint.smAndUp"
          class="d-flex menu"
          transition="v-expand-transition"
        >
          <v-btn text nuxt :to="localePath('/')">{{ $t('articles') }}</v-btn>
          <v-btn text nuxt :to="localePath('/media')">{{ $t('media') }}</v-btn>
          <v-btn text nuxt :to="localePath('/authors')">
            {{ $t('authors') }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-toolbar>
</template>
<script>
import sitemap from '~/assets/sitemap'
export default {
  props: {},
  data() {
    return {
      ...sitemap,
      lang: 'en',
    }
  },
  computed: {},
  mounted() {},
}
</script>
<style lang="scss">
#main-app-bar {
  padding-bottom: 2.5rem;
  margin-bottom: 2rem;
}
/* #main-app-bar.loading {
  border-top: none;
} */
/* #main-app-bar:not(.loading) {
  border-top: solid 0.3rem #000 !important;
}
#main-app-bar.v-app-bar--is-scrolled {
  border-top: solid 0.3rem #000 !important;
} */
</style>
