<template>
  <ArticleContainer :item="item[0]">
    <div v-intersect="onIntersect"></div>
    <v-expansion-panels v-model="panels" flat tile accordion hover multiple>
      <v-expansion-panel>
        <v-divider></v-divider>
        <v-expansion-panel-header color="rgb(249, 249, 249)">
          <div class="article_cat">
            {{ $t('summary') }}
          </div>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content>
          <ArticleSummary v-if="item.length" :item="item[0]"></ArticleSummary>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-divider></v-divider>
        <v-expansion-panel-header color="rgb(249, 249, 249)">
          <div class="article_cat">
            {{ $t('article') }}
          </div>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="article-panel">
          <Article
            v-if="item.length"
            class="px-0"
            :item="item[0]"
            :title="show"
          ></Article>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar
      v-model="showNote"
      multi-line
      timeout="-1"
      outlined
      style="mt-0"
      class="note-snack"
    >
      <div class="d-flex" align="end">
        <b v-if="footnote" class="mb-2">Footnote {{ noteIndex }}</b>

        <v-btn small icon class="ml-auto" @click="hideSnack">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <nuxt-content v-if="footnote" :document="note" />
      <div v-else class="mt-2" v-html="note"></div>
    </v-snackbar>
  </ArticleContainer>
</template>
<script>
import filtersRaw from '~/assets/data/filters'

export default {
  beforeRouteUpdate(to, from, next) {
    if (to.hash && to.hash.startsWith('#fn-')) {
      this.footnote = true
      const footnote = this.item[0]?.footnotes[+to.hash.substring(4) - 1]

      this.note = {
        body: {
          children: footnote.body.children.shift(),
          ...footnote.body,
        },
        ...footnote,
      }
      this.showNote = true
      this.noteIndex = +to.hash.substring(4)
      window.addEventListener('scroll', this.hideSnack)
    } else if (to.hash && to.hash.startsWith('#bb-')) {
      this.note = this.item[0].bibliography.find(
        (item) => item.id === to.hash.substring(4)
      )[this.$store.state.articles.style]
      if (this.note) {
        this.footnote = false
        this.$nextTick(() => {
          this.showNote = true
        })
        window.addEventListener('scroll', this.hideSnack())
        next(from)
      }
    } else if (to.hash && to.hash.substring(1).startsWith('blfn')) {
      this.$vuetify.goTo(to.hash.replace('#blfn', '#fn'), { offset: 100 })
    } else if (to.hash && to.hash.substring(1).startsWith('blbb')) {
      this.$vuetify.goTo(to.hash.replace('#blbb', '#bb'), { offset: 100 })
    } else if (to.hash && to.hash === '#authors' && !this.panels.includes(0)) {
      this.panels.push(0)
      next()
    } else {
      next()
    }
  },
  props: {},
  async asyncData({ $content, params }) {
    const item = await $content('articles', { deep: true })
      .where({
        slug: params.slug,
        published: true,
      })
      .fetch()

    /*     item.issue = await $content(
      item[0]?.issue.split('/').slice(1).join('/').split('.')[0] || false // TODO shameful => fix
    ).fetch() */

    return {
      item,
    }
  },
  data() {
    return {
      footnote: true,
      noteIndex: 1,
      showNote: false,
      show: false,
      tab: 0,
      note: false,
      loop: false,
      panels: this.$route.hash === '#authors' ? [0, 1] : [1],
    }
  },
  computed: {},
  mounted() {
    this.$store.commit('setLoading', false)
  },
  destroyed() {
    window.removeEventListener('scroll', this.hideSnack)
  },
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
@import '~vuetify/src/styles/settings/_variables';

@media #{map-get($display-breakpoints, 'xs-only')} {
  .article-panel .v-expansion-panel-content__wrap {
    padding-left: 0;
  }
}
.note-snack .v-snack__content {
  padding-right: 0;
}
.article_cat {
  text-transform: uppercase;
  font-weight: bold;
}
.article-panel {
}
.article-panel .v-expansion-panel-content__wrap {
  padding-right: 0;
}
</style>
