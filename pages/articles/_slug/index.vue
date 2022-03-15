<template>
  <ArticleContainer :item="item[0]">
    <div v-intersect="onIntersect"></div>

    <Article v-if="item.length" :item="item[0]" :title="show"></Article>
    <v-snackbar
      v-model="showNote"
      multi-line
      timeout="-1"
      outlined
      style="mt-0"
      class="note-snack"
    >
      <div class="d-flex" align="end">
        <b class="mb-2">Footnote {{ noteIndex }}</b>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              class="ml-auto"
              v-on="on"
              @click="hideSnack"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>close</span>
        </v-tooltip>
      </div>
      <div class="mt-2" v-html="note"></div>
    </v-snackbar>
  </ArticleContainer>
</template>
<script>
export default {
  beforeRouteUpdate(to, from, next) {
    if (to.hash && to.hash.substring(1).startsWith('fn')) {
      this.note = this.item[0]?.footnotes[+to.hash.substring(4) - 1]
      this.showNote = true
      this.noteIndex = +to.hash.substring(4)

      window.addEventListener('scroll', this.hideSnack)
      next(from.path)
    } else {
      next()
    }
  },
  props: {},
  async asyncData({ $content, params }) {
    const item = await $content('articles', { deep: true })
      .where({
        slug: params.slug,
      })
      .fetch()

    item.issue = await $content(
      item[0]?.issue.split('/').slice(1).join('/').split('.')[0] || false // TODO shameful => fix
    ).fetch()

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
  methods: {
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.show = entries[0].isIntersecting
    },
    hideSnack() {
      this.showNote = false
      window.removeEventListener('scroll', this.hideSnack)
    },
  },
}
</script>
<style lang="scss">
.note-snack .v-snack__content {
  padding-right: 0;
}
</style>
