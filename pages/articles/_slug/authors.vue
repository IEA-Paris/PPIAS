<template>
  <ArticleContainer :item="item[0]">
    <div v-intersect="onIntersect"></div>
    <ArticleAuthors
      v-if="item.length"
      :item="item[0]"
      :title="show"
    ></ArticleAuthors>
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
      show: true,
      tab: 0,
      note: false,
      loop: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.show = entries[0].isIntersecting
    },
  },
}
</script>
<style lang="scss"></style>
