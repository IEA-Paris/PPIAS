<template>
  <ArticleContainer :item="item[0]">
    <div v-intersect="onIntersect"></div>
    <ArticleMedia
      v-if="item.length"
      :item="item[0]"
      :title="show"
    ></ArticleMedia>
  </ArticleContainer>
</template>
<script>
export default {
  beforeRouteUpdate(to, from, next) {
    if (to.hash && to.hash.substring(1).startsWith('fn')) {
      console.log('to.hash: ', to)
      next(from.path)
    } else {
      next()
    }
    // react to route changes...
  },
  props: {},
  async asyncData({ $content, params }) {
    const item = await $content('articles')
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
      show: false,
      tab: 0,
      note: false,
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
