<template>
  <v-card outlined class="px-3 pb-3" nuxt :to="'/issue/' + issue.slug">
    <v-card-title v-html="issue.name_of_the_issue"></v-card-title>
    <v-card-content
      v-if="issue.body && issue.body.children && issue.body.children.length"
    >
      <nuxt-content :document="issue" class="mx-6" />
    </v-card-content>
    <v-card-actions v-if="total > 1 && !$route.name.startsWith('print')">
      <v-spacer></v-spacer>
      <v-btn x-large tile outlined>
        {{ $t('see-the-complete-issue') + ' (' + total + ')' }}</v-btn
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
        .where({ slug: this.item.slice(15, -3) })
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
    /* this.path = `${this.localePath(
      '/articles'
    )}?view=issues&filters={"issue"%3A["${this.issue.slug}"]}` */
    this.path = `${this.localePath(
      '/articles'
    )}?view=issues&filters={"issue"%3A["${this.issue.slug}"]}`
  },
  computed: {},
  mounted() {
    this.$fetch()
  },
  methods: {},
}
</script>
<style lang="scss"></style>
