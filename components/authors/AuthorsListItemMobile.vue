<template>
  <div>
    <v-skeleton-loader
      v-if="$store.state.loading"
      :type="
        $vuetify.breakpoint.sm && !filter
          ? 'list-item-avatar-three-line'
          : 'list-item-three-line'
      "
      tile
    ></v-skeleton-loader>
    <v-list-item
      v-else
      nuxt
      :to="localePath('/authors/' + item.slug)"
      class="mb-6 d-flex align-start pl-0"
      :class="index > 0 ? '' : ''"
      flat
    >
      <v-list-item-avatar
        v-if="
          $vuetify.breakpoint.mdAndUp || ($vuetify.breakpoint.sm && !filter)
        "
        x-large
        tile
        size="80"
      >
        <OptimizedImage
          v-if="item.image"
          alt="Avatar"
          :src="item.image"
          height="80"
          :ratio="1"
        />
        <v-icon v-else class="white--text headline author-picture">{{
          item.firstname[0] + item.lastname[0]
        }}</v-icon>
      </v-list-item-avatar>
      <div
        class="text-h6 author-mobile-title"
        :class="
          $vuetify.breakpoint.xs || ($vuetify.breakpoint.sm && filter)
            ? ' small'
            : ''
        "
      >
        <!--          <ArticleCategories
            v-if="$vuetify.breakpoint.xs || ($vuetify.breakpoint.sm && filter)"
            :item="item"
            class="pr-2"
            small
          /> -->
        <div :id="slugifyItem(item.lastname)" class="anchor"></div>
        <div v-html="highlightWord(item.firstname + ' ' + item.lastname)"></div>
        <v-list-item-subtitle class="mt-2 d-inline-flex text-subtitle-1">
          <div class="text-subtitle-2 mb-1">
            <span v-html="highlightWord(getTitlesAndInstitutions(item))"></span>
          </div>
        </v-list-item-subtitle>
      </div>
    </v-list-item>
  </div>
</template>
<script>
import slugify from '~/assets/utils/slugify'
import {
  formatTitleAndInstitutions,
  highlight,
} from '~/assets/utils/transforms'

export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
    filter: {
      required: false,
      type: Boolean,
      default: false,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    slugifyItem(item) {
      return slugify(item)
    },
    getTitlesAndInstitutions(item) {
      return item?.titles_and_institutions?.length
        ? formatTitleAndInstitutions(item.titles_and_institutions)
        : ''
    },
    highlightWord(word = '', query) {
      return this.$store.state.authors.search
        ? highlight(word, this.$store.state.authors.search || '')
        : word
    },
  },
}
</script>
<style lang="scss" scoped>
.author-mobile-title.small {
  font-size: 1rem;
}
.author-mobile-title {
  font-size: 1.3rem;
  margin-top: 0.1rem;
}
</style>
