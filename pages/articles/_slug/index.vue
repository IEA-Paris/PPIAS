<template>
  <ArticleContainer :item="item[0]">
    <div v-intersect="onIntersect"></div>
    <Article v-if="item.length" :item="item[0]" :title="show"></Article>
    <v-bottom-sheet v-model="showNote" hide-overlay>
      <v-sheet class="text-center d-flex flex-grow-1" color="red">
        <div class="py-3">{{ note }}</div>
      </v-sheet>
    </v-bottom-sheet>
  </ArticleContainer>
</template>
<script>
export default {
  beforeRouteUpdate(to, from, next) {
    if (to.hash && to.hash.substring(1).startsWith('fn')) {
      console.log('to.hash.substring(4): ', to.hash.substring(4))
      this.note = this.item[0].footnotes[+to.hash.substring(4) - 1]
      this.showNote = true
      console.log('this.item[0]: ', this.item[0])
      console.log(' this.note: ', this.note)

      next(from.path)
    } else {
      next()
    }
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
      showNote: false,
      show: false,
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
