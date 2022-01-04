<template>
  <v-card
    id="articleBox"
    ref="articleBox"
    :width="$vuetify.breakpoint.mdAndUp ? '' : '100%'"
    :height="bestHeight"
    class="d-flex flex-column align-center justify-center"
    raised
    min-height="100px"
    nuxt
    :to="'/articles/' + item.slug"
  >
    <TextFingerprint
      :cells="cells"
      :stats="stats"
      :size="size"
      :src="item.image"
      :expanded="scroll"
      :class="{ expanded: scroll }"
      :tags="item.tags"
    >
      <template #caption>
        {{ item.article_title }}
      </template>
      <template #author>
        <div>
          <template v-if="item.authors.length === 2">
            {{
              item.authors[0].lastname +
              ',&nbsp;' +
              item.authors[0].firstname +
              '&nbsp;and ' +
              item.authors[1].lastname +
              ',&nbsp;' +
              item.authors[1].firstname
            }}
          </template>
          <span v-for="(author, index2) in item.authors" v-else :key="index2">
            <template v-if="index2 < 2">
              <template v-if="index2 < 2">{{ author.lastname + ', ' + author.firstname }}</template>
              <template v-if="item.authors.length > 1 && index2 === 0">,&nbsp;</template>
              <template v-if="index2 === 1 && item.authors.length > 2">et&nbsp;al.</template>
            </template>
          </span>
        </div>
      </template>
      <template #date>
        {{
          new Date(item.date).toLocaleDateString('EN', {
            timezone: 'UTC',
          })
        }}
      </template>
    </TextFingerprint>
  </v-card>
</template>
<script>
export default {
  components: {},
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
      bestHeight: '100%',
      size: 250,
      cells: this.item?.body?.children.map((child, index) => {
        return {
          ...child,
          countChars: this.item.countMap[index],
          countRefs: Math.floor(this.item.countRefs[index]),
        }
      }),
      stats: {
        countRefs: Math.floor(this.item.countRefs.length / 2),
        countLines: this.item.countMap?.length,
        countChars: this.item.countMap.reduce((partialSum, a) => partialSum + a, 0),
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
    console.log(
      'ARTICLE',
      new Date(this.item.date).toLocaleDateString('EN', {
        timezone: 'UTC',
      }),
    )
    /*   this.matchWidth() */
  },
  methods: {
    matchWidth() {
      const width = this.$refs.articleBox.$el.clientWidth + 'px'
      console.log('widthString: ', width)
      console.log(
        'Math.min([this.$refs.articleBox.$el.clientWidth, this.$refs.articleBox.$el.clientHeight]): ',
        Math.min(...[this.$refs.articleBox.$el.clientWidth, this.$refs.articleBox.$el.clientHeight]),
      )
      if (this.item.pinned && this.$vuetify.breakpoint.mdAndUp) {
        // we go for 16/ 8 ratio

        this.size = this.$refs.articleBox.$el.clientWidth < 250 ? this.$refs.articleBox.$el.clientWidth : 250
      } else if (Math.min([this.$refs.articleBox.$el.clientWidth, this.$refs.articleBox.$el.clientHeight]) < 250) {
        console.log(
          'Math.min([this.$refs.articleBox.$el.clientWidth, this.$refs.articleBox.$el.clientHeight]): ',
          Math.min([this.$refs.articleBox.$el.clientWidth, this.$refs.articleBox.$el.clientHeight]),
        )
        this.size = Math.min([this.$refs.articleBox.$el.clientWidth, this.$refs.articleBox.$el.clientHeight])
      }
      this.size = this.$refs.articleBox.$el.clientWidth < 250 ? this.$refs.articleBox.$el.clientWidth : 250
      this.isReady = true
      /*    this.$set(this.$refs.articleBox, 'width', widthString) */
    },
  },
}
</script>
<style lang="scss">
#articleBox {
  background: linear-gradient(315deg, #2d3436 0%, #000000 74%);
}
</style>
