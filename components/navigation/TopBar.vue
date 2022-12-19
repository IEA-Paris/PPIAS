<template>
  <v-toolbar
    id="main-app-bar"
    color="white"
    clipped
    flat
    height="140"
    :class="{ loading: nuxtApp.loading }"
  >
    <div class="d-flex flex-grow-1 justify-space-between">
      <Logo />
      <!-- <LanguageSwitcher /> -->
      <div class="d-flex flex-column justify-space-between">
        <div class="text-right">
          <SearchMenu />
          <MainMenu />
        </div>

        <div
          v-if="smAndUp"
          class="d-flex menu"
          transition="v-expand-transition"
        >
          <v-btn
            variant="text"
            nuxt
            color="dark"
            :to="localePath('/articles')"
            @click="handleClick('articles')"
            >{{ $t('articles') }}</v-btn
          >
          <v-btn
            variant="text"
            nuxt
            color="dark"
            :to="localePath('/media')"
            @click="handleClick('media')"
            >{{ $t('media') }}</v-btn
          >
          <v-btn
            variant="text"
            nuxt
            color="dark"
            :to="localePath('/authors')"
            @click="handleClick('authors')"
          >
            {{ $t('authors') }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-toolbar>
</template>
<script setup>
import _sitemap from '~/assets/sitemap'
import { useRootStore } from '~/store/root';
import { useDisplay } from 'vuetify';

const localePath = useLocalePath()
const { smAndUp } = useDisplay();
const nuxtApp = useNuxtApp()

const sitemap = reactive(_sitemap)
const lang = ref('en')

const route = useRoute()
const rootStore = useRootStore()

const handleClick = (type) => {
  if (route.name.startsWith(type)) {
    rootStore.resetState(type)
  }
}
</script>
<style lang="scss">
#main-app-bar {
  padding-bottom: 2.5rem;
  margin-bottom: 2rem;
}
#main-app-bar .v-btn--active.v-btn--router {
  background-color: black;
  color: white;
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
