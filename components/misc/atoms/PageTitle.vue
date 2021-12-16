<template>
  <div class="page-title text-center" :class="$store.state.scrolled ? 'mb-12' : 'mb-6'">
    {{ $t(text) }}
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
.page-title {
  font-family: 'Bodonis Moda';
  font-size: 4rem !important;
  font-weight: 700 !important;
}
</style>
