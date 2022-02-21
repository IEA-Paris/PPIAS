<template>
  <div>
    <v-card
      nuxt
      :to="localePath('/articles/' + item.slug)"
      class="d-flex py-6"
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
                new Date(item.date).toLocaleDateString('EN', {
                  timezone: 'UTC',
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
                new Date(item.date).toLocaleDateString('EN', {
                  timezone: 'UTC',
                })
              }}
            </div>
          </template>
        </TextFingerprint>
      </div>
      <div class="ml-6 my-3 d-flex mt-n2">
        <div>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <div class="article-title text-h6" v-bind="attrs" v-on="on">
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
          {{ item.abstract }} <br />
          <v-btn class="mt-6" tile outlined>Read more</v-btn>
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
  min-width: 25%;
  max-width: 400px;
  background-color: black;
}
.article-title {
  font-size: 1.4rem !important;
  display: -webkit-box;
  width: 260px;
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
</style>
