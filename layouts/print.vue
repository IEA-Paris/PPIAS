<template>
  <Nuxt />
</template>

<script>
export default {
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
