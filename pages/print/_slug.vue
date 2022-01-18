<template>
  <article class="printpanel page a4" style="background-color: white">
    <div class="page-title">{{ item.article_title }}</div>
    <div v-if="item.abstract && item.abstract.length" class="overline mt-12">
      {{ $t('abstract') }}
    </div>
    <div class="abstract">{{ item.abstract }}</div>
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
