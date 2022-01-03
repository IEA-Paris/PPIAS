<template>
  <v-card nuxt :to="'/articles/' + item.slug" max-width="250" class="d-flex align-center flex-column">
    <TextFingerprint :cells="cells" :stats="stats" :size="300"></TextFingerprint>
    <v-card-title>{{ item.article_title }}</v-card-title>
  </v-card>
</template>
<script>
export default {
  components: {},
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
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
    console.log('ARTICLE', this.item)
  },
  methods: {},
}
</script>
<style lang="scss"></style>
