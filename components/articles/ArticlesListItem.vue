<template>
  <div class="transition-swing">
    <v-card
      nuxt
      :to="localePath('/articles/' + item.slug)"
      class="d-flex transition-swing"
      :class="[$store.state.scrolled ? 'py-3' : 'py-1']"
      flat
    >
      <div class="list-image d-flex">
        <YoutubeThumbnail v-if="item.yt && item.yt.length" :item="item">
          <template #categories>
            <ArticleCategories :item="item" />
          </template>
          <template #date>
            <div class="d-flex">
              <v-sheet
                :color="item.category_1.color"
                class="sideline"
              ></v-sheet>
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
          <template #categories>
            <ArticleCategories :item="item" />
          </template>
          <template #date>
            <div class="d-flex">
              <v-sheet
                :color="item.category_1.color"
                class="sideline"
              ></v-sheet>
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
        <TextFingerprint v-else :item="item" :size="300" :margin="20">
          <template #categories>
            <ArticleCategories :item="item" />
          </template>
          <template #date>
            <div class="d-flex">
              <v-sheet
                :color="item.category_1.color"
                class="sideline"
              ></v-sheet>
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
        <div class="article-title">
          <v-tooltip bottom :disabled="item.article_title.length < 85">
            <!-- eslint-disable-next-line vue/no-unused-vars -->
            <template #activator="{ on, attrs }">
              <div class="text-h6 article-title" v-bind="attrs" v-on="on">
                {{ item.article_title }}
              </div>
            </template>
            <span v-html="item.article_title"></span>
          </v-tooltip>
          <ArticleAuthorsString
            :authors="item.authors"
            class="text-p mt-3 article-authors"
          />
        </div>
        <v-divider vertical class="mr-6 ml-3"></v-divider>
        <div>
          <div class="article-abstract">{{ item.abstract }}</div>
          <v-btn class="mt-6 d-block" tile outlined>Read more</v-btn>
        </div>
      </div>
    </v-card>
    <v-divider></v-divider>
  </div>
</template>
<script>
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
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
.list-image {
  display: flex;
  min-width: 200px;
  width: 200px;
  background-color: black !important;
}
.article-title {
  font-size: 1.4rem !important;
  display: -webkit-box;
  width: 320px;
  min-width: 320px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.article-authors {
  font-size: 1rem !important;
  display: -webkit-box;
  width: 220px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.article-abstract {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
