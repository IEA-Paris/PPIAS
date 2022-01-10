<template>
  <v-img
    v-if="doi"
    max-width="200"
    :src="'https://zenodo.org/badge/' + doi + '.svg'"
  ></v-img>
</template>
<script>
export default {
  props: {
    doi: {
      type: String,
      required: true,
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
<style lang="scss"></style>
