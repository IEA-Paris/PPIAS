<template>
  <div class="">
    <div
      v-if="!item.authors || !item.authors.length"
      class="headline pa-12 text-center"
    >
      {{ $t('no-author-found-matching-this-article') }}
    </div>
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
    <div v-if="authorInformations.institutions.length" class="mx-0 mt-5">
      <div class="institutions-wrapper mx-0 mb-3">
        <div
          v-for="(institution, index) in authorInformations.institutions"
          :key="index"
          class="institution mt-2"
          :class="{ 'mt-4': smAndDown }"
          v-html="institution"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDisplay } from 'vuetify';
import useArticleAuthors from '~/composables/articles/useArticleAuthors'

const { smAndDown } = useDisplay();

const props = defineProps({
  haveInstitutionsLink: {
    required: false,
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => {},
  },
  titles: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const showInstitution = ref(false)
const { authorInformations, getFormatedAuthors, getFormatedInstitution, slugify } = useArticleAuthors(props.item.authors)

</script>
<style lang="scss">
.show-more-btn::before {
  background-color: transparent !important;
}
.institutions-wrapper {
  .institution {
    display: flex;
    color: #5b5b66;

    .institution-number {
      margin-top: 10px;
      padding-right: 0.4rem;
    }

    .institution-name {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
