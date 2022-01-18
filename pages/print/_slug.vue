<template>
  <article class="printpanel page" style="background-color: white">
    <div class="page-title">{{ item.article_title }}</div>
    <nuxt-content :document="item" class="d-block" />
  </article>
</template>
<script>
export default {
  layout: 'print',
  props: {},
  async asyncData({ $content, params }) {
    const item = (
      await $content('articles', { deep: true })
        .where({
          slug: params.slug,
        })
        .fetch()
    )[0]
    return {
      item,
    }
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
.printpanel,
.page {
  padding: 10vh 15vw;
}
.printpanel .index {
  display: none;
}
</style>
