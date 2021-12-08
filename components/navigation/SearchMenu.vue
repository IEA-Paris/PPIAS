<template>
  <v-dialog v-model="open" fullscreen hide-overlay>
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon x-large class="ma-2" tile v-on="on"><v-icon>mdi-magnify</v-icon></v-btn>
    </template>
    <v-card dark color="black">
      <v-app-bar color="transparent" clipped flat hide-on-scroll :height="!$store.state.scrolled ? '180' : '120'">
        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex flex-grow-1 align-center">
            <Logo color="#FFF" />
            <v-spacer></v-spacer>
            <v-btn icon x-large class="ma-2 mr-4 mb-4" @click="open = false"><v-icon>mdi-close</v-icon></v-btn>
          </div>
        </div>
      </v-app-bar>
      <v-text-field
        id="search"
        name="search"
        :label="$t('search')"
        prepend-inner-icon="mdi-magnify"
        class="search"
      ></v-text-field>
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
<style scoped lang="scss">
$input-font-size: 48px;
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
#search {
  height: 120px;
  font-size: 48pt;
}
.search label[for] {
  height: 120px;
  font-size: 48pt;
}
</style>
