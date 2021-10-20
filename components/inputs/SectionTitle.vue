<template>
  <div class="my-12">
    <span class="section-title text-h4 text-uppercase">{{ $t(text) }}</span>
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
.section-title {
  border-bottom: 5px solid black;
}
</style>
