<template>
  <v-card
    outlined
    class="pa-3 mt-3"
    :style="'border-left:' + cat.color + ' 4px solid;'"
    nuxt
    :to="path"
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
    console.log('this.cat: ', this.cat)
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

    console.log('this.localePath ', this.localePath('/'))

    this.path = `${this.localePath('/')}?filters=%7B%22category%22%3A%5B%22${
      this.cat.title
    }%22%5D%7D`
    console.log('this.item.slice(19, -3): ', this.item.slice(19, -3))
    console.log('this.item.path: ', 'content' + this.cat.path + '.md')
    console.log(' this.total: ', this.total)
  },
  computed: {},
  mounted() {
    this.$fetch()
  },
  methods: {},
}
</script>
<style lang="scss"></style>
