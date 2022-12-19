<template>
  <v-snackbar v-model="rootStore.resetFilters" :timeout="2000">
    <v-icon tile>mdi-filters</v-icon>
    {{ $t('resetting-the-filters-and-hellip') }};
  </v-snackbar>
</template>
<script setup>
</script>
<style lang="scss"></style>
