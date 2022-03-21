<template>
  <PageContainer>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <div
          class="main-title"
          :class="$store.state.scrolled ? 'mb-9' : 'mb-6'"
          v-html="$t('page-not-found')"
        ></div>
        <nuxt-content :document="page" />
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script>
export default {
  props: {},
  async asyncData({ $content }) {
    const page = await $content('pages/about').fetch()
    return {
      page,
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
