<template>
  <div class="mb-6">
    <template v-for="(tag, index) in tags">
      <Tag
        v-if="expanded || index < 10"
        :key="index"
        :tag="tag[0]"
        :weight="tag[1]"
        small
        class="mb-1 mr-1"
      ></Tag>
    </template>
    <v-btn color="primary" size="small" variant="text" @click="expanded = !expanded">
      {{ expanded ? 'Show less' : 'See all tags' }}
    </v-btn>
  </div>
</template>
<script setup>

const route = useRoute()
const tags = reactive([])
const expanded = ref(false)
const articles = reactive([])

const { fetch, fetchState } = useFetch(async () => {
  articles = await queryContent('articles').where({published: true}).only(['tags']).find()

  const tagsCountedSortedUniques = new Map(
    Array.from(
      articles
        // get only the tags
        .flatMap((post) => post.tag)
        // count them
        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
    )
      // sort them by count from biggest to lowest
      .sort((a, b) => {
        return b[1] - a[1]
      })
  )

  // if one of the tag searched is not displayed (not in the 10 first tags) we expand the tag filter to display it
  if (
    route.query.tags &&
    Array.isArray(route.query.tags) &&
    route.query.tags.some((tag) => !tagsCountedSortedUniques.has(tag))
  ) {
    expanded.value = true
  }

  tags.value = tagsCountedSortedUniques
})

onMounted(() => {
  if (route.query?.tags?.length) {
    fetch()
  }
})
</script>
