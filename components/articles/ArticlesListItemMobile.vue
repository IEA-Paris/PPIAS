<template>
  <div>
    <v-skeleton-loader
      v-if="$store.state.loading && index % 2"
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
      class="mb-6 d-flex align-start pl-0"
      :class="index > 0 ? '' : ''"
      flat
    >
      <v-list-item-avatar
        v-if="
          $vuetify.breakpoint.mdAndUp || ($vuetify.breakpoint.sm && !filter)
        "
        x-large
        tile
        min-width="25%"
        height="100%"
      >
        <YoutubeThumbnail v-if="item.yt && item.yt.length" :item="item">
          <!--       <template #categories>
            <ArticleCategories :item="item" />
          </template> -->
          <template #date>
            <div class="d-flex px-1">
              {{
                new Date(item.date).toLocaleDateString('EN', {
                  timezone: 'UTC',
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
                new Date(item.date).toLocaleDateString('EN', {
                  timezone: 'UTC',
                })
              }}
            </div>
          </template>
        </PictureItem>
        <TextFingerprint v-else :item="item" :size="300" :margin="20">
          <!--         <template #categories>
            <ArticleCategories :item="item" />
          </template> -->
          <template #date>
            <div class="d-flex px-1">
              {{
                new Date(item.date).toLocaleDateString('EN', {
                  timezone: 'UTC',
                })
              }}
            </div>
          </template>
        </TextFingerprint>
      </v-list-item-avatar>
      <div>
        <div
          class="article-mobile-title"
          :class="
            $vuetify.breakpoint.xs || ($vuetify.breakpoint.sm && filter)
              ? ' small'
              : ''
          "
        >
          <ArticleCategories
            v-if="$vuetify.breakpoint.xs || ($vuetify.breakpoint.sm && filter)"
            :item="item"
            class="pr-2"
            small
          />
          {{ item.article_title }}
        </div>
        <v-list-item-subtitle class="mt-3 d-inline-flex">
          <template
            v-if="$vuetify.breakpoint.xs || ($vuetify.breakpoint.sm && filter)"
          >
            {{
              new Date(item.date).toLocaleDateString('en-GB', {
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
        /></v-list-item-subtitle>
      </div>
    </v-list-item>
  </div>
</template>
<script>
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
  methods: {},
}
</script>
<style lang="scss" scoped>
.article-mobile-title.small {
  font-size: 1rem;
}
.article-mobile-title {
  font-size: 1.3rem;
}
</style>
