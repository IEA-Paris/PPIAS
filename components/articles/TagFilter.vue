<template>
  <div class="mb-6">
    <template v-for="(tag, index) in tags">
      <Tag v-if="expanded || index < 10" :key="index" :tag="tag[0]" :weight="tag[1]" small class="mb-1 mr-1"></Tag>
    </template>
    <v-btn color="primary" small text @click="expanded = !expanded">
      {{ expanded ? 'Show less' : 'See all tags' }}
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return { tags: [], expanded: false }
  },
  async fetch() {
    const rst = await this.$content('articles').where({ published: true }).only(['tags']).fetch()

    const tagsCountedSortedUniques = new Map(
      Array.from(
        rst
          // get only the tags
          .flatMap((post) => post.tags)
          // count them
          .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()),
      )
        // sort them by count from biggest to lowest
        .sort((a, b) => {
          return b[1] - a[1]
        }),
    )
    // if one of the tag searched is not displayed (not in the 10 first tags) we expand the tag filter to display it
    if (
      this.$route.query.tags &&
      JSON.parse(this.$route.query.tags).find((tag) => [...tagsCountedSortedUniques.keys()].indexOf(tag) > 9)
    ) {
      this.expanded = true
    }
    this.tags = tagsCountedSortedUniques
  },
  mounted() {
    if (this.$route.query?.tags?.length) {
      this.$fetch()
    }
  },
}
</script>
