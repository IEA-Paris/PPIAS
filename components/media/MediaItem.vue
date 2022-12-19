<template>
  <!-- //TODO: get rid of inline styles -->
  <v-card
    id="articleBox"
    ref="articleBox"
    :width="mdAndUp ? '' : '100%'"
    height="100%"
    class="article-box d-flex flex-column align-center justify-center transition-swing"
    raised
    style="background-color=black;"
    min-height="300px"
    nuxt
    :to="
      localePath('/articles/' + item.article_slug + '#youtube_' + item.index)
    "
  >
    <YoutubeThumbnail
      v-if="item.id && item.id.length"
      :key="item.id"
      :item="{ ...item, yt: item.id }"
    >
      <!--       <template #categories>
        <ArticleCategories :item="item" />
      </template> -->
      <template #caption>
        <span v-html="highlightWord(item.caption)"></span
      ></template>
      <template #date>
        <div class="d-flex mx-1">
          {{
            new Date(item.date).toLocaleDateString('en-GB', {
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
      :size="size"
      :src="item.picture"
    >
      <!--       <template #categories>
        <ArticleCategories :item="item" />
      </template> -->
      <template #caption>
        <v-skeleton-loader
          v-if="rootStore.loading"
          type="header"
        ></v-skeleton-loader>
        <span v-else v-html="highlightWord(item.caption)"></span>
      </template>
      <template #author>
        <ArticleAuthorsString v-if="item.authors" :authors="item.authors" />
      </template>
      <template #date>
        <div class="d-flex px-1">
          <v-skeleton-loader
            v-if="rootStore.loading"
            type="header"
          ></v-skeleton-loader>

          <template v-else>
            {{
              new Date(item.date).toLocaleDateString('en-GB', {
                // you can use undefined as first argument
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
            }}
          </template>
        </div>
      </template></PictureItem
    >
  </v-card>
</template>
<script setup>
import { useDisplay } from 'vuetify';
import { highlight } from '~/assets/utils/transforms'
import { useRootStore } from '~/store/root';

const { mdAndUp } = useDisplay()
const rootStore = useRootStore()
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
  },
})

const size = ref(250)

const highlightWord = (word = '') => {
  return rootStore.media.search
    ? highlight(word, rootStore.media.search || '')
    : word
}
</script>
<style scoped>
.article-box {
  background-color: black;
}
</style>
