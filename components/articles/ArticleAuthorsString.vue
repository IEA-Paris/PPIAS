<template>
  <div>
    <template v-if="showInstitution">
      <div
        v-for="(author, index) in authorInformations.authors"
        :key="index"
        class="authors"
        v-html="author"
      />
      <div
        v-show="authorInformations.institutions.length"
        class="institutions-group"
      >
        <div
          v-for="(institution, index) in authorInformations.institutions"
          :id="`institution-${index}`"
          :key="index"
          class="institutions"
          v-html="institution"
        />
      </div>
    </template>
    <template v-else>
      <nuxt-link v-if="link" :to="link"> </nuxt-link>
      <div v-else class="authors" v-html="formatAuthorsProxy()"></div>
    </template>
  </div>
</template>
<script>
import { formatAuthors, highlight } from '~/assets/utils/transforms'
import ArticleAuthorsMixin from '~/mixins/ArticleAuthors'

export default {
  mixins: [ArticleAuthorsMixin],
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
    link: {
      required: false,
      type: Boolean,
      default: false,
    },
    showInstitution: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  mounted() {},
  methods: {
    formatAuthorsProxy() {
      return highlight(
        formatAuthors(
          this.authors,
          this.$i18n.$t,
          this.full,
          this.initials,
          this.$config.url
        ),
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
  font-size: 1.3rem;
}

.institutions-group {
  margin-top: 0.8rem;
  .institutions {
    sup {
      font-style: normal;
    }
    word-wrap: normal;
    line-break: normal;
    font-size: 0.8rem;
    font-weight: 300;
    font-style: italic;
  }
}
</style>
