<template>
  <v-app>
    <TopBar />
    <v-main style="padding-bottom: 5rem">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  components: {},
  scrollToTop: true,
  data() {
    return {}
  },
  mounted() {
    /*  this.$nuxt.$loading.finish = function () {
      this.clear()
      this.pause()
      return this
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
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
