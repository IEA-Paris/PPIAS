<template>
  <v-card
    v-show="ready"
    id="articleBox"
    ref="articleBox"
    :width="$vuetify.breakpoint.mdAndUp ? '' : '100%'"
    height="100%"
    class="d-flex flex-column align-center justify-center transition-swing"
    raised
    min-height="300px"
    nuxt
    :to="localePath('/articles/' + item.slug)"
  >
    <TextFingerprint
      v-if="ready && !(item.yt || item.image)"
      :cells="cells"
      :stats="stats"
      :size="size"
      :src="item.image"
      :expanded="scroll"
      :class="{ expanded: scroll }"
    >
      <template #categories>
        <v-chip :color="item.category1.color" label class="white--text">
          {{ item.category1.text }}
        </v-chip>
        <v-chip v-if="item.category2" :color="item.category2.color" label class="white--text">
          {{ item.category2.text }}
        </v-chip>
      </template>
      <template #caption>
        {{ item.article_title }}
      </template>
      <template #author>
        <ArticleAuthorsString :authors="item.authors" />
        <div class="underline" :style="'background-color:' + item.category1.color"></div>
      </template>
      <template #date>
        {{
          new Date(item.date).toLocaleDateString('EN', {
            timezone: 'UTC',
          })
        }}
      </template>
    </TextFingerprint>
    <YoutubeThumbnail v-if="item.yt && item.yt.length" :item="item">
      <template #categories>
        <v-chip :color="item.category1.color" label class="white--text">
          {{ item.category1.text }}
        </v-chip>
        <v-chip v-if="item.category2" :color="item.category2.color" label class="white--text">
          {{ item.category2.text }}
        </v-chip>
      </template>
      <template #caption>
        {{ item.article_title }}
      </template>
      <template #author>
        <ArticleAuthorsString :authors="item.authors" />
        <div class="underline" :style="'background-color:' + item.category1.color"></div>
      </template>
      <template #date>
        {{
          new Date(item.date).toLocaleDateString('EN', {
            timezone: 'UTC',
          })
        }}
      </template>
    </YoutubeThumbnail>
  </v-card>
</template>
<script>
export default {
  props: {
    scroll: {
      type: Boolean,
      default: false,
    },
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      ready: false,
      size: 250,
      cells: this.item?.body?.children.map((child, index) => {
        return {
          ...child,
          countChars: this.item.countMap[index],
          countRefs: Math.floor(this.item.countRefs[index]),
        }
      }),
      stats: {
        countRefs: Math.floor(this.item?.countRefs?.length / 2),
        countLines: this.item?.countMap?.length,
        countChars: this.item?.countMap.reduce((partialSum, a) => partialSum + a, 0),
        countContributors: 3,
        countHeadings: this.item?.toc?.length,
        countMediaCells: 2,
        countCodeCells: 10,
        countCells: this.item.body.children.length,
        extentChars: [Math.min(...this.item.countMap), Math.max(...this.item.countMap)],
        extentRefs: [Math.min(...this.item.countRefs), Math.max(...this.item.countRefs)],
      },
    }
  },
  computed: {},
  mounted() {
    this.resizeItem()
  },
  methods: {
    resizeItem() {
      const width = this.$refs.articleBox.$el.clientWidth
      const height = this.$refs.articleBox.$el.clientHeight
      const smallest = Math.min(...[width, height])
      console.log('widthString: ', width)
      console.log(
        'Math.min([this.$refs.articleBox.$el.clientWidth, this.$refs.articleBox.$el.clientHeight]): ',
        Math.min(...[width, height]),
      )

      this.size = Math.min(...[smallest - 10, 500])
      console.log('this.size : ', this.size)
      this.ready = true
      /*    this.$set(this.$refs.articleBox, 'width', widthString) */
    },
  },
}
</script>
<style lang="scss"></style>
