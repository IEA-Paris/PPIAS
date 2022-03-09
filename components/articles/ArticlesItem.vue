<template>
  <v-card
    ref="articleBox"
    :width="$vuetify.breakpoint.mdAndUp ? '' : '100%'"
    height="100%"
    class="box d-flex flex-column align-center justify-center transition-swing"
    min-height="250px"
    :max-height="highlighted ? '' : '500px'"
    nuxt
    :to="localePath('/articles/' + item.slug)"
  >
    <YoutubeThumbnail v-if="item.yt && item.yt.length" :item="item">
      <!--      <template #categories>
        <ArticleCategories :item="item" />
      </template> -->
      <template #caption class="mt-3">
        {{ item.article_title }}
      </template>
      <template #author>
        <ArticleAuthorsString v-if="item.authors" :authors="item.authors" />
      </template>
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
      :size="size"
      :src="item.picture"
    >
      <!--       <template #categories>
        <ArticleCategories :item="item" />
      </template> -->
      <template #caption>
        {{ item.article_title }}
      </template>
      <template #author>
        <ArticleAuthorsString v-if="item.authors" :authors="item.authors" />
      </template>
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
      </template></PictureItem
    >
    <TextFingerprint v-else :item="item" :size="size" :margin="10">
      <!--      <template #categories>
        <ArticleCategories :item="item" />
      </template> -->
      <template #caption>
        {{ item.article_title }}
      </template>
      <template #author>
        <ArticleAuthorsString v-if="item.authors" :authors="item.authors" />
      </template>
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
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
    highlighted: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    size() {
      switch (this.$vuetify.breakpoint.name) {
        default:
          return this.resizeItem()
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    resizeItem() {
      const width = this.$refs?.articleBox?.$el.clientWidth
      const height = this.$refs?.articleBox?.$el.clientHeight
      const smallest = Math.min(...[width, height]) || 250
      return Math.min(...[smallest - 10, 400])
      /*    this.$set(this.$refs.articleBox, 'width', widthString) */
    },
  },
}
</script>
<style lang="scss">
.box {
  background: linear-gradient(315deg, #2d3436 0%, #000000 74%);
  overflow: hidden;
}
.underline-color {
  height: 2px;
  width: 33%;
  z-index: 100;
}
.sideline {
  height: 2.2rem;
  width: 4px;
  padding-right: 0.4rem;
}
</style>
