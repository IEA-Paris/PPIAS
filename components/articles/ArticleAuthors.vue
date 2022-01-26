<template>
  <div class="ma-6">
    <div
      v-if="!item.authors || !item.authors.length"
      class="headline pa-12 text-center"
    >
      {{ $t('no-author-found-matching-this-article') }}
    </div>
    <div v-for="(author, index) in item.authors" :key="index" class="pb-6">
      <AuthorsItem
        :item="{ ...author, slug: slugify(author.lastname) }"
        extended
      ></AuthorsItem>
    </div>
  </div>
</template>
<script>
import slugify from '~/assets/utils/slugify'
export default {
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
