<template lang="html">
  <div class="loading-page"></div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  border-top: solid 08rem #000 !important;
  top: 0;
  left: 0;
  width: 100%;
  background: black;
}

.loading-page[data-v-96c51598] {
  position: fixed;
  border-top: solid 08rem #000 !important;
  top: 0;
  left: 0;
  width: 100%;
  background: black;
}
</style>
