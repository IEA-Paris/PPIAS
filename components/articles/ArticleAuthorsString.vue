<template>
  <div class="authors" v-html="formatAuthorsProxy()"></div>
</template>
<script>
import { formatAuthors } from '~/assets/utils/transforms'
export default {
  props: {
    authors: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    formatAuthorsProxy() {
      return formatAuthors(this.authors, this.$i18n.$t)
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
