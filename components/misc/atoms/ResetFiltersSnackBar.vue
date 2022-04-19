<template>
  <v-snackbar v-model="$store.state.resetFilters" :timeout="2000">
    <v-icon tile>mdi-filters</v-icon>
    {{ $t('resetting-the-filters-and-hellip') }};
  </v-snackbar>
</template>
<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
