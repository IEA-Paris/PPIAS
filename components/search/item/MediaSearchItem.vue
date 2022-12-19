<template>
  <v-list-item
    nuxt
    :to="
      localePath('/articles/' + item.article_slug + '#youtube_' + item.index)
    "
    @click="$emit('close')"
  >
    <v-list-item-icon>
      <v-icon x-large>mdi-play-circle-outline</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ item.caption }}
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
