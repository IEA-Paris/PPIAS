<template>
  <nuxt-link :to="localePath('/author/' + path)" @click="$emit('close')">
    <span v-html="item.formatedName"></span>
    <AuthorOrcidIdBadge
      v-if="item.social_channels && item.social_channels.orcid"
      :orcid="item.social_channels.orcid"
    ></AuthorOrcidIdBadge>
    {{ (separator && ',') || '' }}
  </nuxt-link>
</template>
<script>
import { formatAuthors, highlight } from '~/assets/utils/transforms'
import { getAuthorSlug } from '~/assets/utils/slugify'

export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
    separator: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      path: getAuthorSlug(this.item),
    }
  },
  computed: {},
  mounted() {},
  methods: {
    formatAuthorsProxy() {
      // TODO move the institution in v-list-subtitle
      return [
        highlight(
          formatAuthors([this.item], this.$i18n.$t, false, false),
          this.$store.state.articles.search || ''
        ),
        highlight(
          (this.item?.positions_and_institutions &&
            this.item?.positions_and_institutions[0] &&
            this.item.positions_and_institutions[0]?.institution) ||
            '',
          this.$store.state.articles.search || ''
        ),
      ]
    },
  },
}
</script>
<style lang="scss"></style>
