<template>
  <v-chip
    small
    class="d-inline-block issue-badge"
    nuxt
    :to="'/issue/' + issue.slice(15, -3)"
    :inline="inline"
  >
    {{ issue.slice(15, -3) }}
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
    return {}
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
