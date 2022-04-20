<template>
  <v-card
    outlined
    class="pa-3 mt-3"
    :style="'border-left:' + issue.color + ' 4px solid;'"
    nuxt
    @click="$router.push(path)"
  >
    <v-card-title>{{ issue.title }}</v-card-title>
    <v-card-actions v-if="total > 1">
      <v-spacer></v-spacer>
      <v-btn x-large tile outlined>
        {{ $t('see-all-results-articlescount', [total]) }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      total: 0,
      issue: {
        title: '',
        color: 'white',
      },
      path: '',
    }
  },
  async fetch() {
    // TODO rationalize
    this.issue = (
      await this.$content('issues', { deep: true })
        .where({ title: this.item.slice(15, -3) })
        .fetch()
    )[0]

    this.total = (
      await this.$content('articles', { deep: true })
        .where({
          issue: { $eq: 'content' + this.issue.path + '.md' },
          published: true,
        })
        .only([])
        .fetch()
    ).length
    // 192.168.0.50:3000/articles?filters=%257B%25issue%2522%253A%255B%2522WPRN21%2522%255D%257D
    this.path = `${this.localePath(
      '/articles'
    )}?view=issues&filters={"issue"%3A["${this.issue.title}"]}`
  },
  computed: {},
  mounted() {
    this.$fetch()
  },
  methods: {},
}
</script>
<style lang="scss"></style>
