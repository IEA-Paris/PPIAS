<template>
  <div class="d-flex" align="center">
    <v-tooltip v-if="loading" bottom>
      <template #activator="{ on, attrs }">
        <v-progress-circular
          v-bind="attrs"
          indeterminate
          color="primary"
          v-on="on"
        ></v-progress-circular>
      </template>
      <span v-html="$t('saving-and-ellipsis')"></span>
    </v-tooltip>
    <v-tooltip v-else bottom>
      <template #activator="{ on, attrs }">
        <v-icon color="primary" dark v-bind="attrs" v-on="on">mdi-check</v-icon>
      </template>
      <span v-html="$t('saved')"></span>
    </v-tooltip>
  </div>
</template>
<script setup>

const props = defineProps({ loading: Boolean })
</script>
<style lang="scss"></style>
