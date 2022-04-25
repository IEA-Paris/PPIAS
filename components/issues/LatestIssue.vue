<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6" xl="6">
      <!--   Latest issue -->
      <div class="text-h6 grey--text text--darken-2">
        {{ $t('latest-issue') }}
      </div>
      <v-divider></v-divider>
      <div class="text-h6 mb-6">{{ issue.title }}</div>
      <ArticlesListItemMobile
        v-for="(article, index) in articles.slice(0, 3)"
        v-bind="$attrs"
        :key="index"
        :index="index"
        :item="article"
        :scroll="$store.state.scrolled"
      ></ArticlesListItemMobile>

      <!--eslint-disable-next-line vue/no-parsing-error eslint-disable-next-line vue/attribute-hyphenation-->
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn text :to="localePath('/issue/' + issue.slug)">{{
          $t('see-all-results-articlescount', [articles.length])
        }}</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    issue: {
      type: [Object, Boolean],
      default: false,
    },
    articles: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      path: `${this.localePath('/articles')}?view=issues&filters={"issue"%3A["${
        this.issue.title
      }"]}`,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
