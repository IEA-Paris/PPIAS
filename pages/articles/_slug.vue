<template>
  <div>
    <PageTitle :text="item[0].article_title" />
    <Article v-if="item.length" :item="item[0]"></Article>
  </div>
</template>
<script>
export default {
  props: {},
  async asyncData({ $content, params }) {
    console.log(params.slug)
    const item = await $content('articles')
      .where({
        slug: params.slug,
      })
      .fetch()
    console.log(item)
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
<style lang="scss"></style>
