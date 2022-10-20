<template>
  <v-list-item
    nuxt
    :to="localePath('/authors/' + path)"
    @click="$emit('close')"
  >
    <v-list-item-icon>
      <v-icon>{{
        item.firstname ? 'mdi-account-outline' : 'mdi-domain'
      }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        <AuthorOrcidIdBadge
          v-if="item.social_channels.orcid"
          :orcid="item.social_channels.orcid"
        ></AuthorOrcidIdBadge>
        <span v-html="formatAuthorsProxy()[0]"></span>
      </v-list-item-title>
      <v-list-item-subtitle v-html="formatAuthorsProxy()[1]">
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
import { formatAuthors, highlight } from '~/assets/utils/transforms'
import slugify from '~/assets/utils/slugify'
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      path: slugify(
        this.item.lastname +
          (this.item.firstname && this.item.firstname.length
            ? '_' + this.item.firstname || ''
            : '')
      ),
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
