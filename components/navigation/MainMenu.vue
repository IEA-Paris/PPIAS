<template>
  <v-dialog v-model="open" fullscreen hide-overlay transition="none">
    <!-- CLOSE BTN -->
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon x-large class="ma-2" tile v-on="on">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>
    <!-- APP BAR WITH LOGO -->
    <v-card dark color="black">
      <v-app-bar
        color="transparent"
        clipped
        flat
        hide-on-scroll
        :height="!$store.state.scrolled ? '180' : '120'"
      >
        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex flex-grow-1 align-center">
            <Logo color="#FFF" />
            <v-spacer></v-spacer>
            <v-btn icon x-large class="ma-2 mr-4 mb-4" @click="open = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-app-bar>
      <v-row class="ml-2">
        <v-col
          cols="12"
          md="4"
          :order="$vuetify.breakpoint.smAndDown ? 'last' : 'first'"
        >
          <!-- SMALL PAGES LINKS (FOOTER) -->
          <div :class="{ 'ml-6': $vuetify.breakpoint.mdAndUp }">
            <v-divider style="border-color: white"></v-divider>
            <v-list dark color="black">
              <v-list-item
                v-for="(item, i) in footer"
                :key="i"
                :to="item.path"
                @click="open = false"
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
          <v-list dark color="black">
            <v-list-item :to="localePath('/')" @click="open = false">
              <v-list-item-title class="text-uppercase text-h5 mt-3 mb-6">
                {{ $t('articles') }}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <!-- MEDIA -->
            <v-list-item :to="localePath('/media')" @click="open = false">
              <v-list-item-title class="text-uppercase text-h5 mt-3 mb-6">
                {{ $t('media') }}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <!-- AUTHORS -->
            <v-list-item :to="localePath('/authors')" @click="open = false">
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
          <v-tooltip v-for="(item, index) in social" :key="index" bottom>
            <template #activator="{ on }">
              <v-btn
                target="_blank"
                rel="noopener noreferrer"
                :href="item.url"
                fab
                dark
                outlined
                color="grey"
                class="ma-3"
                v-on="on"
              >
                <v-icon color="white">mdi-{{ item.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $t(item.text) }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import sitemap from '~/assets/sitemap'
import social from '~/assets/social'
export default {
  props: {},
  data() {
    return {
      ...sitemap,
      social,
      open: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
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
