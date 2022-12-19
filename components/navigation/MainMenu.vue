<template>
  <v-dialog fullscreen hide-overlay transition="none">
    <!-- ACTIVATOR BTN -->
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="icon" size="x-large" tile>
        <v-icon color="black">mdi-menu</v-icon>
      </v-btn>
    </template>
    <!-- APP BAR WITH LOGO -->
    <template #default="{ isActive }">
      <v-card dark color="black">
        <v-app-bar color="transparent" clipped flat density="prominent" hide-on-scroll height="140">
          <div class="d-flex flex-column flex-grow-1">
            <div class="d-flex flex-grow-1 align-start">
              <v-img
                class="mr-2 mt-4 logo-container-white"
                src="/logo_w.png"
                contain
                max-height="120"
                max-width="120"
                style="cursor: pointer"
              ></v-img>
              <v-spacer></v-spacer>
              <v-btn
                variant="icon"
                size="x-large"
                class="ma-2 mr-2 mb-4"
                tile
                @click="isActive.value = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
        </v-app-bar>
        <v-row class="ml-2 mt-6">
          <v-col
            cols="12"
            md="4"
            :order="smAndDown ? 'last' : 'first'"
          >
            <!-- SMALL PAGES LINKS (FOOTER) -->
            <div :class="{ 'ml-6': mdAndUp }">
              <v-divider style="border-color: white"></v-divider>
              <v-list dark color="black" bg-color="transparent">
                <v-list-item
                  v-for="(item, i) in footer"
                  :key="i"
                  :to="item.path"
                  @click="isActive.value = false"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-uppercase text-button mb-6"
                      v-text="$t(item.text)"
                    ></v-list-item-title>
                    <v-divider
                      v-if="i < Object.keys(footer).length - 1"
                    ></v-divider>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
          <!-- MAIN MENU -->
          <v-col cols="12" md="4">
            <v-divider style="border-color: white"></v-divider>
            <!-- HOME/ARTICLES -->
            <v-list dark bg-color="transparent" color="black">
              <v-list-item :to="localePath('/articles')" @click="isActive.value = false">
                <v-list-item-title class="text-uppercase text-h5 mt-3 mb-6">
                  {{ $t('articles') }}
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <!-- MEDIA -->
              <v-list-item :to="localePath('/media')" @click="isActive.value = false">
                <v-list-item-title class="text-uppercase text-h5 mt-3 mb-6">
                  {{ $t('media') }}
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <!-- AUTHORS -->
              <v-list-item :to="localePath('/authors')" @click="isActive.value = false">
                <v-list-item-title class="text-uppercase text-h5 mt-3 mb-6">
                  {{ $t('authors') }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <!-- SOCIAL ICONS -->
          <v-col cols="12" md="4" order="last">
            <v-divider></v-divider>
            <div class="overline ma-3">{{ $t('follow-us') }}</div>
            <v-tooltip v-for="(item, index) in social" :key="index" location="bottom">
              <template #activator="{ on }">
                <v-btn
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="item.url"
                  variant="outlined"
                  dark
                  icon
                  color="grey"
                  class="ma-3"
                  v-on="on"
                >
                  <!-- variant="outlined" -->
                  <v-icon color="white">mdi-{{ item.icon }}</v-icon>
                </v-btn>
              </template>
              <span>{{ $t(item.text) }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import { useDisplay } from 'vuetify'
import _sitemap from '~/assets/sitemap'
import _social from '~/assets/social'

const { footer } = _sitemap
const sitemap = reactive(footer)
const social = reactive(_social)

const { smAndDown, mdAndUp } = useDisplay()
</script>
<style scoped>
.v-app-bar--is-scrolled .menu-logo-text {
  position: relative;
  max-width: 150px !important;
  height: auto !important;
  transition-delay: 1s;
  -webkit-transform: translateZ(0);
  transform: scale(0.9);
  margin-left: 40px;
  margin-bottom: 15px;
}
.menu {
  margin-top: 15px;
}
.v-app-bar--is-scrolled .menu {
  margin-top: 5px;
}
.menu-logo-text,
.menu-logo-text:link,
.menu-logo-text:visited,
.menu-logo-text:hover,
.menu-logo-text:active,
.menu-logo-text {
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: color, background, text-shadow;
  transition: all 0.5s ease;
  transform-origin: left top;
  max-width: 600px !important;
  width: 100%;
  margin-left: 40px;
  margin-bottom: 25px;
  line-height: 6rem;
  color: white;
  text-decoration: none;
  margin-top: 1rem;
  margin-bottom: 1.8rem;
  margin-left: 2.4rem;
}
.logo-container-white {
  border: 4px white solid;
}
.menu-logo-1 {
  font-size: 6rem;
  font-weight: 700;
  font-family: 'Bodoni Moda';
  letter-spacing: 0.2px;
}
.menu-logo-2 {
  font-size: 6.3rem;
  font-family: 'Roboto';
  font-weight: 100;
}
.v-app-bar--is-scrolled .menu-logo-text {
  line-height: 3rem;
  color: white;
  text-decoration: none;
  margin-top: 0.6rem;
  margin-bottom: 1.2rem;
}
.v-app-bar--is-scrolled .menu-logo-1 {
  font-size: 3rem !important;
  font-weight: 700;
  font-family: 'Bodoni Moda';
  letter-spacing: 0.2px;
}
.v-app-bar--is-scrolled .menu-logo-2 {
  font-size: 3.2rem !important;
  font-family: 'Roboto';
  font-weight: 100;
}
</style>
