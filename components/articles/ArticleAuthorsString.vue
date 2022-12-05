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
import ArticleAuthorsMixin from '~/mixins/ArticleAuthorsMixin'

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
  font-size: 16px;
  max-width: 100%;
}
.institution-name {
  padding-left: 5px;
}
.institutions-group {
  margin-top: 15px;
  .institutions {
    sup {
      font-style: normal;
    }
    word-wrap: normal;
    line-break: normal;
    font-size: 12px;
    font-weight: 300;
    font-style: italic;
    margin-top: 5px;
    font-weight: 300;
    color: #202020;
  }
}
</style>
