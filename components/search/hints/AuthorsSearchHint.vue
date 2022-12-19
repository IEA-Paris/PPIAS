<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-icon v-bind="attrs" small v-on="on">
        {{ outline ? 'mdi-help-circle-outline' : 'mdi-help-circle' }}</v-icon
      >
    </template>
    <span>{{
      $t('the-author-search-is-based-on-their-lastname-titles-or-institutions')
    }}</span>
  </v-tooltip>
</template>
<script setup>
const props = defineProps({
  outline: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
<style lang="scss"></style>
