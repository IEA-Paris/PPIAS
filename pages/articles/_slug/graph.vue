<template>
  <TextFingerprint
    ref="articleBox"
    :item="item"
    :size="size"
    :margin="10"
  ></TextFingerprint>
</template>
<script>
export default {
  props: {},
  async asyncData({ $content, params }) {
    const item = await $content('articles', { deep: true })
      .where({
        slug: params.slug,
        published: true,
      })
      .fetch()

    return {
      item,
    }
  },
  data() {
    return {}
  },
  computed: {
    size() {
      switch (this.$vuetify.breakpoint.name) {
        default:
          return this.resizeItem()
      }
    },
  },
  mounted() {},
  destroyed() {},
  methods: {
    resizeItem() {
      const width = this.$refs?.articleBox?.$el.clientWidth
      const height = this.$refs?.articleBox?.$el.clientHeight
      const smallest = Math.min(...[width, height]) || 250
      return Math.min(...[smallest - 10, 400])
      /*    this.$set(this.$refs.articleBox, 'width', widthString) */
    },
  },
}
</script>
<style lang="scss"></style>
