<template>
  <v-app>
    <!--     <PlaceHolder v-if="isProd || mdp !== 'ieaftw'" @submit="mdp = $event"></PlaceHolder>
    <template v-else> -->
    <TopBar />
    <v-main style="padding-bottom: 5rem">
      <v-container fluid>
        <Nuxt />
      </v-container>
      <v-fab-transition>
        <v-btn
          v-show="$store.state.scrolled"
          fixed
          tile
          bottom
          outlined
          right
          contained
          fab
          style="background-color: white"
          :class="{
            'mb-16': $vuetify.breakpoint.xs && !$route.name.startsWith('index'),
          }"
          @click.prevent="$vuetify.goTo(0)"
        >
          <v-icon color="black"> mdi-arrow-up </v-icon>
        </v-btn>
      </v-fab-transition>
    </v-main>
    <Footer />
    <!--    </template> -->
  </v-app>
</template>

<script>
export default {
  scrollToTop: true,
  data() {
    return {
      mdp: '',
      isProd: process.env.NODE_ENV === 'production',
    }
  },

  mounted() {
    this.$nuxt.$loading.finish = function () {
      this.clear()
      this.pause()
      return this
    }
    /*     this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    }) */
  },
  updated() {
    /*   this.$nextTick(() => {
      this.$nuxt.$loading.start()
    }) */
  },
  methods: {},
}
</script>
<style lang="scss"></style>
