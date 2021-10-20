<template>
  <v-dialog v-model="open" fullscreen hide-overlay>
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon x-large class="ma-2" tile v-on="on"><v-icon>mdi-magnify</v-icon></v-btn>
    </template>
    <v-card dark>
      <v-app-bar color="transparent" clipped flat app prominent hide-on-scroll height="168px">
        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex flex-grow-1 align-center">
            <nuxt-link :to="localePath('/')" style="transition: all 500ms ease 0s" @click.native="$vuetify.goTo(0)">
              <v-img src="/logo_text_alt.svg" contain class="menu-logo"></v-img>
            </nuxt-link>
            <v-spacer></v-spacer>
            <v-btn icon x-large @click="open = false"><v-icon>mdi-close</v-icon></v-btn>
          </div>
          <v-divider></v-divider>
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                name="name"
                :label="$t('search')"
                prepend-inner-icon="mdi-magnify"
                class="text-h1"
                height="120"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-app-bar>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      open: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style scoped>
.menu-logo {
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: color, background, text-shadow;
  transition: all 0.5s ease;
  transform-origin: left top;
  width: 600px !important;
  margin-left: 40px;
  margin-bottom: 25px;
}
.v-app-bar--is-scrolled .menu-logo {
  position: relative;
  width: 250px !important;
  height: auto !important;
  transition-delay: 1s;
  -webkit-transform: translateZ(0);
  transform: scale(0.9);
  margin-left: 40px;
  margin-bottom: 15px;
}
</style>
