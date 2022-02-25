<template>
  <v-card
    outlined
    class="pa-3 mt-3"
    :style="'border-left:' + cat.color + ' 4px solid;'"
    nuxt
    @click="$router.push(path)"
  >
    <v-card-title>{{ cat.title }}</v-card-title>
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
      cat: {
        title: '',
        color: 'white',
      },
      path: '',
    }
  },
  async fetch() {
    this.cat = (
      await this.$content('categories')
        .where({ title: this.item.slice(19, -3) })
        .fetch()
    )[0]

    this.total = (
      await this.$content('articles', { deep: true })
        .where({
          $or: [
            { category_1: { $eq: 'content' + this.cat.path + '.md' } },
            { category_2: { $eq: 'content' + this.cat.path + '.md' } },
          ],
        })
        .only([])
        .fetch()
    ).length

    this.path = `${this.localePath('/')}?filters=%7B%22category%22%3A%5B%22${
      this.cat.title
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
