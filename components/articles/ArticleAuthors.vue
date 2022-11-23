<template>
  <div class="">
    <div
      v-if="!item.authors || !item.authors.length"
      class="headline pa-12 text-center"
    >
      {{ $t('no-author-found-matching-this-article') }}
    </div>
    <v-list>
      <ArticleAuthorItem
        v-for="(author, index) in item.authors"
        :key="index"
        :item="{
          ...author,
          formatedName: authorInformations.authors[index],
          slug: slugify(author.lastname),
        }"
        extended
        :index="index"
      ></ArticleAuthorItem>
    </v-list>
    <v-list v-if="authorInformations.institutions.length">
      <ArticleInstutionsItems :institutions="authorInformations.institutions">
      </ArticleInstutionsItems>
    </v-list>
  </div>
</template>
<script>
import ArticleAuthorsMixin from '~/mixins/ArticleAuthors'

export default {
  mixins: [ArticleAuthorsMixin],
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
    return {
      authors: this.item.authors,
    }
  },
}
</script>
<style lang="scss"></style>
