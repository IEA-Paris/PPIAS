<template>
  <div class="">
    <div
      v-if="!item.authors || !item.authors.length"
      class="headline pa-12 text-center"
    >
      {{ $t('no-author-found-matching-this-article') }}
    </div>
    <v-list>
      <ArticleAuthorItem
        v-for="(author, index) in item.authors"
        :key="index"
        :item="{
          ...author,
          formatedName: authorInformations.authors[index],
          slug: slugify(author.lastname),
        }"
        extended
        :index="index"
      ></ArticleAuthorItem>
    </v-list>
    <v-list>
      <ArticleInstutionsItems :institutions="authorInformations.institutions">
      </ArticleInstutionsItems>
    </v-list>
  </div>
</template>
<script>
import { formatAuthors, highlight } from '~/assets/utils/transforms'
import slugify from '~/assets/utils/slugify'
import ArticleInstutionsItems from '~/components/articles/ArticleInstutionsItems'

export default {
  components: {
    ArticleInstutionsItems,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    titles: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    authorInformations() {
      // Generate the authors informations and format them
      // Will return an object of array with institutions and authors formated with exponential
      //
      // Example:
      // {
      //   "institutions": ['institution1', 'institution2'],
      //   "authors": ['<a href="...">author1 <sup>0</sup></a>', '<a href="...">author2<sup>1</sup></a>']
      // }

      const institutions = []
      const authors = []
      this.item.authors.forEach((author) => {
        const highlightedInstitution = this.getFormatedInstitution(
          author.positions_and_institutions
        )
        let indexInstitution = institutions.findIndex(
          (i) => i.name === author.institution
        )
        if (indexInstitution === -1) {
          institutions.push(highlightedInstitution)
          indexInstitution = institutions.length - 1
        }

        authors.push(this.getFormatedAuthors(author, indexInstitution))
      })
      return { institutions, authors }
    },
  },
  mounted() {},
  methods: {
    getFormatedAuthors(author, institutionId) {
      return highlight(
        formatAuthors(
          [author],
          this.$i18n.$t,
          false,
          false,
          this.$config.url,
          institutionId
        ),
        this.$store.state.articles.search || ''
      )
    },
    getFormatedInstitution(positionsAndInstitutions) {
      return highlight(
        (positionsAndInstitutions &&
          positionsAndInstitutions[0] &&
          positionsAndInstitutions[0]?.institution) ||
          '',
        this.$store.state.articles.search || ''
      )
    },
    slugify(str) {
      return slugify(str)
    },
  },
}
</script>
<style lang="scss"></style>
