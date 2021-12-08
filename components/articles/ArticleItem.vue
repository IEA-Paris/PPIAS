<template>
  <v-card>
    <TextFingerprint :cells="cells" :stats="stats" :size="100"></TextFingerprint>
    <v-card-title>{{ article.article_title }}</v-card-title>
  </v-card>
</template>
<script>
export default {
  components: {},
  props: {
    article: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      cells: this.article?.body?.children.map((child, index) => {
        return {
          ...child,
          countChars: this.article.countMap[index],
          countRefs: Math.floor(this.article.countRefs[index]),
        }
      }),
      stats: {
        countRefs: Math.floor(this.article.countRefs.length / 2),
        countLines: this.article.countMap.length,
        countChars: this.article.countMap.reduce((partialSum, a) => partialSum + a, 0),
        countContributors: 3,
        countHeadings: this.article?.toc?.length,
        countMediaCells: 2,
        countCodeCells: 10,
        countCells: this.article?.children?.length,
        extentChars: [Math.min(...this.article.countMap), Math.max(...this.article.countMap)],
        extentRefs: [Math.min(...this.article.countRefs), Math.max(...this.article.countRefs)],
      },
    }
  },
  computed: {},
  mounted() {
    console.log(
      'gdt',
      this.article.body.children
        .flatMap(({ type, value }) => {
          return { type, value }
        })
        .filter(({ type }) => type === 'text')
        .map((item) => item.value)
        .reduce((a, b) => a + b),
    )
  },
  methods: {},
}
</script>
<style lang="scss"></style>
