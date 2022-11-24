<template>
  <div class="">
    <div
      v-if="!item.authors || !item.authors.length"
      class="headline pa-12 text-center"
    >
      {{ $t('no-author-found-matching-this-article') }}
    </div>
    <div>
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
        class="mr-1"
        :separator="index < item.authors.length - 1"
      ></ArticleAuthorItem>
    </div>
    <div v-if="authorInformations.institutions.length" class="mt-3">
      <div v-if="showInstitution" class="institutions-wrapper mb-3">
        <span
          v-for="(institution, index) in authorInformations.institutions"
          :key="index"
          class="institution"
          v-html="institution"
        >
        </span>
      </div>
      <v-btn
        class="pa-0 ma-0 show-more-btn"
        small
        tile
        text
        :ripple="false"
        @click="showInstitution = !showInstitution"
      >
        {{ showInstitution ? $t('show-less') : $t('show-more') }}
        <v-icon>{{
          showInstitution ? 'mdi-chevron-up' : 'mdi-chevron-down'
        }}</v-icon>
      </v-btn>
    </div>
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
      showInstitution: false,
    }
  },
}
</script>
<style lang="scss">
.show-more-btn::before {
  background-color: transparent !important;
}
.institutions-wrapper {
  .institution {
    sup {
      margin-right: 0.5rem;
    }
    display: inline-block;
    font-size: 0.9rem;
    margin-top: 0.3rem;
    margin-left: 0.3rem;
    color: #666;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 1rem;
}
</style>
