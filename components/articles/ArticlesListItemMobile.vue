<template>
  <div>
    <v-skeleton-loader
      v-if="rootStore.loading"
      :type="
        isSmDisplay && !filter
          ? 'list-item-avatar-three-line'
          : 'list-item-three-line'
      "
      tile
    ></v-skeleton-loader>
    <v-list-item
      v-else
      nuxt
      :to="localePath('/articles/' + item._path.split('/').at(-1))"
      class="d-flex align-start pl-0"
      :class="(index > 0 ? '' : '', { 'mt-5': smAndDown })"
      flat
    >
      <template #prepend>
      <div
        v-if="
          mdAndUp || (isSmDisplay && !filter)
        "
        size="x-large"
        variant="tile"
        :min-width="lgAndUp ? '20%' : '20%'"
        height="100%"
        >
        <YoutubeThumbnail v-if="item.yt && item.yt.length" :item="item">
          <!--       <template #categories>
            <ArticleCategories :item="item" />
          </template> -->
          <template #date>
            <div class="d-flex px-1">
              {{
                new Date(item.date).toLocaleDateString('en-US', {
                  // you can use undefined as first argument
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              }}
            </div>
          </template>
        </YoutubeThumbnail>
        <PictureItem
          v-else-if="item.picture && item.picture.length"
          :item="item"
          :src="item.picture"
        >
          <!--      <template #categories>
            <ArticleCategories :item="item" />
          </template> -->
          <template #date>
            <div class="d-flex px-1">
              {{
                new Date(item.date).toLocaleDateString('en-US', {
                  // you can use undefined as first argument
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              }}
            </div>
          </template>
        </PictureItem>
        <TextFingerprint
          v-else-if="item.countMap && item.countMap.length"
          :item="item"
          :size="300"
          :margin="20"
        >
          <!--         <template #categories>
            <ArticleCategories :item="item" />
          </template> -->
          <template #date>
            <div class="d-flex px-1">
              {{
                new Date(item.date).toLocaleDateString('en-US', {
                  // you can use undefined as first argument
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              }}
            </div>
          </template>
        </TextFingerprint>
      </div>
    </template>
      <template #default>
        <div
          class="text-h6 article-mobile-title"
          :class="
            isXsDisplay || (isSmDisplay && filter)
              ? ' small'
              : ''
          "
        >
          <IssueBadge :issue="item.issue"></IssueBadge>

          <span v-html="highlightWord(item.article_title)"></span>
          <!--          <ArticleCategories
            v-if="isXsDisplay || (isSmDisplay && filter)"
            :item="item"
            class="pr-2"
            small
          /> -->
        </div>
        <v-list-item-subtitle class="mt-2 d-inline-flex text-subtitle-1">
          <template
            v-if="isXsDisplay || (isSmDisplay && filter)"
          >
            {{
              new Date(item.date).toLocaleDateString('en-US', {
                // you can use undefined as first argument
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
            }}
            -
          </template>
          <ArticleAuthorsString
            v-if="item.authors"
            :authors="item.authors"
            class=""
            small
        /></v-list-item-subtitle>
      </template>
    </v-list-item>
  </div>
</template>
<script setup>
import { useRootStore } from '~/store/root';
import { useDisplay } from 'vuetify';
import useHighlightWord from '~/composables/utils/useHighlightWord';

const rootStore = useRootStore();
const { sm: isSmDisplay, xs: isXsDisplay, smAndDown, mdAndUp, lgAndUp } = useDisplay();

const props = defineProps({
  item: {
    required: true,
    type: Object,
  },
  filter: {
    required: false,
    type: Boolean,
    default: false,
  },
  index: {
    required: true,
    type: Number,
  },
})

const { highlightWord } = useHighlightWord(rootStore.getChildrenStore('articles').search)

</script>
<style lang="scss" scoped>
.article-mobile-title.small {
  font-size: 1rem;
}
.article-mobile-title {
  font-size: 1.3rem;
  margin-top: 0.1rem;
  line-height: 1.7rem;
}
</style>
