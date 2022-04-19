<template>
  <PageContainer>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <div
          class="main-title"
          :class="$store.state.scrolled ? 'mb-9' : 'mb-6'"
          v-html="$config.full_name"
        ></div>
        <nuxt-content :document="page" />
      </v-col>
    </v-row>

    <LatestIssue
      :issue="latestIssue"
      :articles="latestIssueArticles"
    ></LatestIssue>

    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <!--  Featured articles -->
        <div class="text-h6">{{ $t('featured-articles') }}</div>
        <v-divider></v-divider>
        <em class="py-4 d-block">Coming soon &hellip;</em>
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script>
import LatestIssue from '~/components/issues/LatestIssue.vue'
export default {
  components: { LatestIssue },
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
      .where({ issue: { $regex: latestIssue.path } })
      .sortBy('date')
      .fetch()
    console.log('latestIssue: ', latestIssue)
    console.log('latestIssueArticles: ', latestIssueArticles)
    const featuredArticles = await $content('articles', { deep: true })
      .where({ highlight: true })
      .sortBy('date')
      .limit(4)
      .fetch()
    console.log('featuredArticles: ', featuredArticles)
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
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
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
