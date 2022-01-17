<template>
  <ZenArticle :item="item" print />
</template>
<script>
export default {
  props: {},
  async asyncData({ $content, params }) {
    const item = (
      await $content('articles', { deep: true })
        .where({
          slug: params.slug,
        })
        .fetch()
    )[0]
    if (item) {
      if (item.category_1 && item.category_1?.length) {
        item.category_1 = await $content(
          item?.category_1.split('/').slice(1).join('/').split('.')[0] || false
        ).fetch()
      }
      if (item.category_2 && item.category_2?.length) {
        item.category_2 = await $content(
          item?.category_2.split('/').slice(1).join('/').split('.')[0] || false
        ).fetch()
      }
    }
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
<style lang="scss"></style>
