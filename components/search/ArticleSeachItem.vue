<template>
  <v-list-item
    nuxt
    :to="localePath('/articles/' + item.slug)"
    class="pl-0"
    @click="$emit('close')"
  >
    <v-list-item-icon class="graphIcon">
      <TextFingerprint
        v-if="!(item.yt || item.image)"
        :item="item"
        :size="200"
        :margin="20"
      >
      </TextFingerprint>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ item.article_title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <ArticleAuthorsString :authors="item.authors" />
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
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
<style lang="scss">
.graphIcon {
  display: flex;
  max-width: 90px;
  margin: 0 !important;
}
</style>
