<template>
  <v-list-item
    nuxt
    :to="localePath('/authors/' + item.slug)"
    @click="$emit('close')"
  >
    <v-list-item-icon>
      <v-icon>mdi-account-outline</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title v-html="formatAuthorsProxy()"> </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import { formatAuthors, highlight } from '~/assets/utils/transforms'

export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    formatAuthorsProxy() {
      // TODO move the institution in v-list-subtitle
      return highlight(
        formatAuthors([this.item], this.$i18n.$t, true, false),
        this.$store.state.articles.search || ''
      )
    },
  },
}
</script>
<style lang="scss"></style>
