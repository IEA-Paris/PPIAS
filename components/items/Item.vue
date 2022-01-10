<template>
  <v-card
    :width="$vuetify.breakpoint.mdAndUp ? '' : '100%'"
    class="d-flex flex-column"
    raised
    min-height="100px"
    to="/"
  >
    <OptimizedImage
      v-if="item.image"
      :src="item.image"
      :expanded="scroll"
      :class="{ expanded: scroll }"
      :ratio="first ? 8 / 9 : 16 / 9"
      :tags="item.tags"
    >
      <template #caption>
        {{ item.title }}
      </template>
      <template #author>
        {{ item.author }}
      </template>
      <template #date>
        {{ item.date }}
      </template>
    </OptimizedImage>
    <TextFingerprint
      v-else
      :cells="cells"
      :stats="stats"
      :size="size"
    ></TextFingerprint>
  </v-card>
</template>
<script>
import quotes from '~/assets/data/quotes'
import tags from '~/assets/data/tags'

export default {
  props: {
    first: {
      type: Boolean,
      default: false,
    },
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
      quotes,
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
        countChars: this.item.countMap.reduce(
          (partialSum, a) => partialSum + a,
          0
        ),
        countContributors: 3,
        countHeadings: this.item?.toc?.length,
        countMediaCells: 2,
        countCodeCells: 10,
        countCells: this.item.body.children.length,
        extentChars: [
          Math.min(...this.item.countMap),
          Math.max(...this.item.countMap),
        ],
        extentRefs: [
          Math.min(...this.item.countRefs),
          Math.max(...this.item.countRefs),
        ],
      },
    }
  },
  methods: {
    matchWidth() {
      const widthString = this.$refs.articleBox.clientWidth + 'px'

      this.size = widthString
      this.$set(this.$refs.articleBox, 'width', widthString)
    },
  },
}
</script>
<style></style>
