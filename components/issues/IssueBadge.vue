<template>
  <v-chip
    v-if="!$route.name.startsWith('issue')"
    small
    class="d-inline-block issue-badge"
    :inline="inline"
    @click.prevent="$router.push('/issue/' + issueText)"
  >
    {{ issueText }}
  </v-chip>
</template>
<script>
import rawFilters from '~/static/generated/filters'
export default {
  props: {
    issue: {
      type: String,
      required: true,
      default: '',
    },
    inline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      issueText:
        rawFilters.articles.filters.issue.items.find(
          (item) => item.value === this.issue.slice(15, -3)
        )?.text || this.issue.slice(15, -3),
    }
  },

  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
.issue-badge {
  font-family: 'Open sans', sans-serif !important;
}
</style>
