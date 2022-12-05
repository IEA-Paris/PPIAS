<template>
  <div>
    <v-skeleton-loader
      v-if="$store.state.loading"
      :type="
        $vuetify.breakpoint.sm && !filter
          ? 'list-item-avatar-three-line'
          : 'list-item-three-line'
      "
      tile
    ></v-skeleton-loader>
    <v-list-item
      v-else
      nuxt
      :to="localePath('/articles/' + item.slug)"
      class="d-flex align-start pl-0"
      :class="(index > 0 ? '' : '', { 'mt-5': $vuetify.breakpoint.smAndDown })"
      flat
    >
      <v-list-item-avatar
        v-if="
          $vuetify.breakpoint.mdAndUp || ($vuetify.breakpoint.sm && !filter)
        "
        x-large
        tile
        :min-width="$vuetify.breakpoint.lgAndUp ? '20%' : '20%'"
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
      </v-list-item-avatar>
      <div>
        <div
          class="text-h6 article-mobile-title"
          :class="
            $vuetify.breakpoint.xs || ($vuetify.breakpoint.sm && filter)
              ? ' small'
              : ''
          "
        >
          <IssueBadge :issue="item.issue"></IssueBadge>

          <span v-html="highlightWord(item.article_title)"></span>
          <!--          <ArticleCategories
            v-if="$vuetify.breakpoint.xs || ($vuetify.breakpoint.sm && filter)"
            :item="item"
            class="pr-2"
            small
          /> -->
        </div>
        <v-list-item-subtitle class="mt-2 d-inline-flex text-subtitle-1">
          <template
            v-if="$vuetify.breakpoint.xs || ($vuetify.breakpoint.sm && filter)"
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
      </div>
    </v-list-item>
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
    filter: {
      required: false,
      type: Boolean,
      default: false,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
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
.article-mobile-title.small {
  font-size: 1rem;
}
.article-mobile-title {
  font-size: 1.3rem;
  margin-top: 0.1rem;
  line-height: 1.7rem;
}
</style>
