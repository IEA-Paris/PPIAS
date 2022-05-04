<template>
  <div class="">
    <div
      v-if="!item.authors || !item.authors.length"
      class="headline pa-12 text-center"
    >
      {{ $t('no-author-found-matching-this-article') }}
    </div>
    <v-list dense>
      <ArticleAuthorItem
        v-for="(author, index) in item.authors"
        :key="index"
        :item="{ ...author, slug: slugify(author.lastname) }"
        extended
        :index="index"
      ></ArticleAuthorItem>
    </v-list>
  </div>
</template>
<script>
import slugify from '~/assets/utils/slugify'
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    titles: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    slugify(str) {
      return slugify(str)
    },
  },
}
</script>
<style lang="scss"></style>
