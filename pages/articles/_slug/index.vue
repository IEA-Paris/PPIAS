<template>
  <v-row justify="center">
    <v-col cols="12" md="12" lg="10" xl="10">
      <v-card>
        <v-btn v-intersect="onIntersect" plain text nuxt :to="localePath('/articles')">
          <v-icon left>mdi-chevron-left</v-icon>
          {{ $t('back') }}
        </v-btn>
        <PageTitle :text="item[0] && item[0].article_title" class="pa-6" />

        <v-tabs background-color="transparent" color="black" class="mb-6" right>
          <v-tab nuxt :to="localePath('/articles/' + $route.params.slug)">Article</v-tab>
          <v-tab @click="$router.replace({ query: { ...query, tab: 'Media' } })">Media</v-tab>
          <v-tab @click="$router.replace({ query: { ...query, tab: 'Authors' } })">Author(s)</v-tab>
        </v-tabs>

        <Article v-if="item.length" :item="item[0]" :title="show"></Article>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  beforeRouteUpdate(to, from, next) {
    console.log('TOOOOOOOOOOO: ', to)
    // react to route changes...
    next()
  },
  props: {},
  async asyncData({ $content, params }) {
    console.log(params.slug)
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
