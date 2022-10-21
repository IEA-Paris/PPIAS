<template>
  <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
  <a
    :href="'https://sandbox.zenodo.org/record/' + doi.split('.').pop()"
    target="_blank"
  >
    <v-img
      max-width="200"
      :src="'https://sandbox.zenodo.org/badge/DOI/' + doi + '.svg'"
      alt="DOI"
    ></v-img
  ></a>
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
