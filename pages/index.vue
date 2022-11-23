<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing"
    :class="{ 'py-0': !$store.state.scrolled }"
    fluid
  >
    <v-row class="transition-swing">
      <v-col class="transition-swing" cols="12">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <div
              class="main-title transition-swing"
              :class="$store.state.scrolled ? 'mb-16 mt-8' : 'mb-8 mt-2'"
              v-html="$config.full_name_html"
            ></div>
            <nuxt-content :document="page" />
          </v-col>
        </v-row>

        <LatestIssue
          :issue="latestIssue"
          :articles="latestIssueArticles"
        ></LatestIssue>

        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <!--  Featured articles -->
            <div class="text-h6">{{ $t('featured-articles') }}</div>
            <v-divider></v-divider>
            <v-list three-line>
              <ArticlesListItemMobile
                v-for="(article, index) in featuredArticles"
                v-bind="$attrs"
                :key="index"
                :index="index"
                :item="article"
                :scroll="$store.state.scrolled"
              ></ArticlesListItemMobile>
            </v-list>
          </v-col>
        </v-row> </v-col
    ></v-row>
  </v-container>
</template>
<script>
export default {
  props: {},
  async asyncData({ $content, store }) {
    const page = await $content('pages/about').fetch()
    const latestIssue = (
      await $content('issues', { deep: true })
        .sortBy('date', 'desc')
        .limit(1)
        .fetch()
    )[0]
    const latestIssueArticles = await $content('articles', { deep: true })
      .where({ issue: { $regex: latestIssue.path }, published: true })
      .sortBy('date', 'asc')
      .limit(3)
      .fetch()
    const featuredArticles = await $content('articles', { deep: true })
      .where({ highlight: true, published: true })
      .sortBy('date', 'desc')
      .limit(3)
      .fetch()
    store.commit('setLoading', false) /* commit('setItems', {
      items: latestIssueArticles,
      total: latestIssueArticles.length,
      numberOfPages: 1,
      type: 'articles', 
    }) */
    return {
      page,
      featuredArticles,
      latestIssueArticles,
      latestIssue,
    }
  },
  data() {
    return {
      page: {},
      featuredArticles: [],
      latestIssueArticles: [],
      latestIssue: {},
    }
  },
  async fetch() {
    this.page = await this.$content('pages/about').fetch()
    this.latestIssue = (
      await this.$content('issues', { deep: true })
        .sortBy('date', 'desc')
        .limit(1)
        .fetch()
    )[0]
    this.latestIssueArticles = await this.$content('articles', { deep: true })
      .where({ issue: { $regex: this.latestIssue.path }, published: true })
      .sortBy('date', 'asc')
      .limit(3)
      .fetch()
    this.featuredArticles = await this.$content('articles', { deep: true })
      .where({ highlight: true, published: true })
      .sortBy('date', 'desc')
      .limit(3)
      .fetch()
    this.$store.commit('setLoading', false)
    /* commit('setItems', {
      items: latestIssueArticles,
      total: latestIssueArticles.length,
      numberOfPages: 1,
      type: 'articles', 
    }) */
  },
  computed: {},
  mounted() {
    this.$fetch()
  },
  methods: {
    onScroll() {
      this.$store.commit('setScrolled')
    },
  },
}
</script>
<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';
.main-title {
  font-family: 'Bodoni Moda';
  font-size: 3rem !important;
  font-weight: 500 !important;
  line-height: 3.5rem;
  max-width: 100%;
}
@media #{map-get($display-breakpoints, 'sm-only')} {
  .main-title {
    font-size: 2.4rem !important;
    line-height: 3rem;
  }
}
@media #{map-get($display-breakpoints, 'xs-only')} {
  .main-title {
    font-size: 2rem !important;
    line-height: 2.5rem;
  }
}
</style>
