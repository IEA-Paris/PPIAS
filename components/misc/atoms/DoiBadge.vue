<!-- eslint-disable vuejs-accessibility/anchor-has-content -->
<template>
  <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
  <!--   <a :href="'https://doi.org/' + doi" target="_blank"> -->
  <a :href="'https://sandbox.zenodo.org/record/' + doi" target="_blank">
    <v-img
      max-width="200"
      :src="'https://sandbox.zenodo.org/badge/DOI/' + doi + '.svg'"
      alt="DOI"
    ></v-img
  ></a>
</template>
<script setup>
const props = defineProps({ doi: String })
</script>
<style lang="scss"></style>
