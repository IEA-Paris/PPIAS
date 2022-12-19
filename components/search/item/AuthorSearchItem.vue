<template>
  <v-list-item
    nuxt
    :to="localePath('/authors/' + item._path.split('/').at(-1))"
    @click="$emit('close')"
  >
    <v-list-item-icon>
      <v-icon x-large>mdi-account-outline</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ item.firstname + ' ' + item.lastname }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
<style lang="scss"></style>
