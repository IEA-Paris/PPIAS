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
      issueText: this.issue.slice(15, -3),
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
