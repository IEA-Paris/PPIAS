<template>
  <div class="transition-swing">
    <v-card
      v-if="$store.state.loading"
      class="d-flex transition-swing"
      :class="[$store.state.scrolled ? 'py-3' : 'py-1']"
      flat
    >
      <v-skeleton-loader type="image" width="200"></v-skeleton-loader>
      <div
        class="ml-6 my-3 d-flex flex-grow-1"
        :class="index > 0 ? 'mt-n1' : ' mt-0'"
      >
        <div class="article-title">
          <v-skeleton-loader
            type="heading"
            width="100%"
            class="my-3"
          ></v-skeleton-loader>
          <v-skeleton-loader type="text" max-width="30%"></v-skeleton-loader>
          <v-skeleton-loader type="text" max-width="50%"></v-skeleton-loader>
        </div>
        <v-divider vertical class="mr-6 ml-3"></v-divider>
        <div class="d-flex flex-grow-1">
          <v-skeleton-loader
            type="paragraph, button"
            class="mt-3"
            width="100%"
          ></v-skeleton-loader>
        </div>
      </div>
    </v-card>
    <v-card
      v-else
      nuxt
      :to="localePath('/article/' + item.slug)"
      class="d-flex transition-swing"
      :class="[$store.state.scrolled ? 'py-3' : 'py-1']"
      flat
    >
      <div class="list-image d-flex">
        <YoutubeThumbnail v-if="item.yt && item.yt.length" :item="item">
          <!--           <template #categories>
            <IssueBadge :name="item.issue.slice(15, -3)"></IssueBadge>
          </template> -->
          <template #date>
            <div class="d-flex px-1">
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
          :src="item.picture"
        >
          <!--           <template #categories>
            <IssueBadge :name="item.issue.slice(15, -3)"></IssueBadge>
          </template> -->
          <template #date>
            <div class="d-flex px-1">
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
        </PictureItem>
        <TextFingerprint
          v-else-if="item.countMap && item.countMap.length"
          :item="item"
          :size="300"
          :margin="20"
        >
          <!--           <template #categories>
            <IssueBadge :name="item.issue.slice(15, -3)"></IssueBadge>
          </template> -->
          <template #date>
            <div class="d-flex px-1">
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
        </TextFingerprint>
      </div>
      <div class="ml-6 my-3 d-flex" :class="index > 0 ? 'mt-n1' : ' mt-0'">
        <div class="article-title-container">
          <v-tooltip bottom :disabled="item.article_title.length < 104">
            <!-- eslint-disable-next-line vue/no-unused-vars -->
            <template #activator="{ on, attrs }">
              <h1
                class="article-title"
                v-bind="attrs"
                v-on="on"
                v-html="highlightWord(item.article_title)"
              ></h1>
            </template>
            <span v-html="item.article_title"></span>
          </v-tooltip>
          <IssueBadge :issue="item.issue"></IssueBadge>
          <ArticleAuthorsString
            v-if="item.authors"
            :authors="item.authors"
            class="article-authors"
          />
        </div>
        <template v-if="excerpt">
          <v-divider vertical class="mr-6 ml-3"></v-divider>
          <div>
            <div
              class="article-abstract"
              v-html="highlightWord(item.abstract)"
            ></div>
            <v-btn class="mt-6" tile outlined>{{ $t('read-more') }}</v-btn>
          </div>
        </template>
      </div>
    </v-card>
    <v-divider></v-divider>
  </div>
</template>
<script>
import { highlight } from '~/assets/utils/transforms'
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
    excerpt: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    highlightWord(word = '', query) {
      return this.$store.state.articles.search
        ? highlight(word, this.$store.state.articles.search || '')
        : word
    },
  },
}
</script>
<style lang="scss" scoped>
.list-image {
  display: flex;
  min-width: 200px;
  width: 200px;
  background-color: black !important;
}
.article-title {
  font-size: 1.4rem !important;
  display: -webkit-box;
  width: 380px;
  min-width: 380px;
  font-family: 'Bodoni Moda';
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 0.4rem;
}
.article-authors {
  font-size: 0.8rem !important;
  display: -webkit-box;
  width: 220px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 0.4rem;
}
.article-abstract {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  margin-top: 0.4rem;
  overflow: hidden;
}
</style>
