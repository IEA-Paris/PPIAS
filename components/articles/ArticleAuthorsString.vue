<template>
  <div class="authors" v-html="formatAuthorsProxy()"></div>
</template>
<script>
import { formatAuthors, highlight } from '~/assets/utils/transforms'
export default {
  props: {
    authors: {
      required: true,
      type: Array,
    },
    full: {
      required: false,
      type: Boolean,
      default: false,
    },
    initials: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    formatAuthorsProxy() {
      return highlight(
        formatAuthors(this.authors, this.$i18n.$t, this.full, this.initials),
        this.$store.state.articles.search || ''
      )
    },
  },
}
</script>
<style lang="scss">
.authors {
  word-wrap: normal;
  line-break: normal;
}
</style>
