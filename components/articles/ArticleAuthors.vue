<template>
  <div class="ma-6">
    <div
      v-if="!item.authors || !item.authors.length"
      class="headline pa-12 text-center"
    >
      {{ $t('no-author-found-matching-this-article') }}
    </div>
    <div v-for="(author, index) in item.authors" :key="index" class="pb-6">
      <AuthorsListItem
        :item="{ ...author, slug: slugify(author.lastname) }"
        extended
      ></AuthorsListItem>
    </div>
  </div>
</template>
<script>
import AuthorsListItem from '../authors/AuthorsListItem.vue'
import slugify from '~/assets/utils/slugify'
export default {
  components: { AuthorsListItem },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    slugify(str) {
      return slugify(str)
    },
  },
}
</script>
<style lang="scss"></style>
