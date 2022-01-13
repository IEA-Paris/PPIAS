<template>
  <ArticleContainer :item="item[0]">
    <ArticleOverview v-if="item.length" :item="item[0]"></ArticleOverview>
  </ArticleContainer>
</template>
<script>
export default {
  props: {},
  async asyncData({ $content, params }) {
    const item = await $content('articles', { deep: true })
      .where({
        slug: params.slug,
      })
      .fetch()
    return {
      item,
    }
  },
  data() {
    return {
      noteIndex: 1,
      showNote: false,
      show: false,
      tab: 0,
      note: false,
      loop: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
.note-snack .v-snack__content {
  padding-right: 0;
}
</style>
