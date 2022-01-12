<template>
  <div v-html="formatAuthorsProxy()"></div>
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
      console.log(
        'formatAuthors(this.authors, this.$i18n): ',
        formatAuthors(this.authors, this.$i18n)
      )
      return formatAuthors(this.authors, this.$i18n)
    },
  },
}
</script>
<style lang="scss"></style>
