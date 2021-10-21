<template>
  <v-app-bar id="main-app-bar" color="white" clipped flat app hide-on-scroll height="160">
    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex flex-grow-1">
        <Logo color="#FFF" />
        <v-spacer></v-spacer>
        <!-- <LanguageSwitcher /> -->
        <div class="d-flex flex-column justify-space-between">
          <div class="text-right">
            <SearchMenu />
            <MainMenu />
          </div>

          <div v-if="$vuetify.breakpoint.smAndUp" class="d-flex ml-6 menu" transition="v-expand-transition">
            <v-btn text nuxt :to="localePath('/')">{{ $t('home') }}</v-btn>
            <v-btn text nuxt :to="localePath('/media')">{{ $t('media') }}</v-btn>
            <v-btn text nuxt :to="localePath('/articles')">{{ $t('articles') }}</v-btn>
            <v-btn text nuxt :to="localePath('/authors')">{{ $t('authors') }}</v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-app-bar>
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
  mounted() {
    console.log(this.$route.name)
  },
}
</script>
<style lang="scss">
#main-app-bar {
  border-top: solid 0.8rem #000 !important;
}

#main-app-bar.v-app-bar--is-scrolled {
  border-top: solid 0.4rem #000 !important;
}
</style>
