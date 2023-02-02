<!-- eslint-disable vuejs-accessibility/anchor-has-content -->
<template>
  <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
  <!--   <a :href="'https://doi.org/' + doi" target="_blank"> -->
  <a
    :href="
      $config.modules.zenodo.sandbox
        ? 'https://sandbox.zenodo.org/badge/DOI/' + doi
        : 'https://doi.org/' + doi.slice(3)
    "
    target="_blank"
  >
    <v-img
      max-width="200"
      :src="
        $config.modules.zenodo.sandbox
          ? 'https://sandbox.zenodo.org/badge/DOI/' + doi + '.svg'
          : 'https://doi.org/' + doi.slice(3)
      "
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
