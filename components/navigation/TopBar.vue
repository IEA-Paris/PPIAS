<template>
  <v-app-bar
    id="main-app-bar"
    color="white"
    clipped
    flat
    app
    hide-on-scroll
    :height="!$store.state.scrolled ? '200' : '140'"
    :class="{ index: $route.name === 'index' }"
  >
    <div class="d-flex flex-column flex-grow-1">
      <div class="d-flex flex-grow-1 align-center">
        <Logo color="#FFF" />
        <v-spacer></v-spacer>
        <LanguageSwitcher />

        <SearchMenu />
        <MainMenu />
      </div>
      <v-divider></v-divider>
      <div v-if="$vuetify.breakpoint.smAndUp" class="d-flex ml-6 menu" transition="v-expand-transition">
        <v-menu offset-y open-on-hover bottom>
          <template #activator="{ on, attrs }">
            <v-btn v-bind="attrs" text nuxt :to="localePath('/institute')" v-on="on">
              {{ $t('institute') }}
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in institute" :key="index" nuxt :to="item.path">
              <v-list-item-title class="text-uppercase text-button">{{ $t(item.text) }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y open-on-hover bottom>
          <template #activator="{ on, attrs }">
            <v-btn text v-bind="attrs" :to="localePath('/research')" nuxt v-on="on">
              {{ $t('research') }}
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in research" :key="index" nuxt :to="item.path">
              <v-list-item-title class="text-uppercase text-button">{{ $t(item.text) }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn text nuxt to="/events">{{ $t('events') }}</v-btn>
        <v-btn text nuxt to="/library">{{ $t('library') }}</v-btn>
        <v-menu offset-y open-on-hover bottom>
          <template #activator="{ on, attrs }">
            <v-btn v-bind="attrs" text nuxt to="/apply" v-on="on">
              {{ $t('apply') }}
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in apply" :key="index" nuxt :to="item.path">
              <v-list-item-title class="text-uppercase text-button">{{ $t(item.text) }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
.index#main-app-bar {
  border-top: solid 0.8rem #000 !important;
}

#main-app-bar.v-app-bar--is-scrolled,
#main-app-bar:not(.index) {
  border-top: solid 0.4rem #000 !important;
}
</style>
