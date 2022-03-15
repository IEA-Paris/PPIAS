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
    this.issue = (
      await this.$content('issues')
        .where({ title: this.item.slice(19, -3) })
        .fetch()
    )[0]

    this.total = (
      await this.$content('articles', { deep: true })
        .where({ issue: { $eq: 'content' + this.issue.path + '.md' } })
        .only([])
        .fetch()
    ).length

    this.path = `${this.localePath('/')}?filters=%7B%issue%22%3A%5B%22${
      this.issue.title
    }%22%5D%7D`
  },
  computed: {},
  mounted() {
    this.$fetch()
  },
  methods: {},
}
</script>
<style lang="scss"></style>
