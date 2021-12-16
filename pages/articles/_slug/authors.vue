<template>
  <ArticleContainer :item="item[0]">
    <div v-intersect="onIntersect"></div>
    <Article v-if="item.length" :item="item[0]" :title="show"></Article>
    <v-bottom-sheet v-model="note">
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="red" @click="sheet = !sheet">close</v-btn>
        <div class="py-3">{{ note }}</div>
      </v-sheet>
    </v-bottom-sheet>
  </ArticleContainer>
</template>
<script>
export default {
  beforeRouteUpdate(to, from, next) {
    if (to.hash && to.hash.substring(1).startsWith('fn') && !this.loop) {
      console.log('to.hash: ', to.hash)
      this.loop = true
      this.$router.replace({ hash: undefined })
      console.log('this.$(to.hash): ', document.getElementById(to.hash))
      this.note = this.$(to.hash).innerHtml
      next()
    } else {
      this.loop = false
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
