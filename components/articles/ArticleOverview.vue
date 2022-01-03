<template>
  <v-row class="transition-swing flex-row-reverse">
    <v-col cols="12" class="transition-swing pa-12">
      <DoiBadge :doi="item.doi"></DoiBadge>
      <div class="overline">keywords</div>

      <div>
        <Tag
          v-for="(tag, index2) in sortedTags"
          :key="index2"
          small
          :tag="tag"
          :class="index2 === 0 ? 'my-1 mr-1' : 'ma-1'"
        ></Tag>
      </div>
      <div class="overline">Abstract</div>
      <nuxt-content :document="{ body: item.excerpt }" />
      <a class="primary--text text-decoration-underline">Read&nbsp;more</a>
    </v-col>
  </v-row>
</template>
<script>
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
  computed: {
    sortedTags() {
      return this.$route.query?.tags?.length
        ? this.item.tags.reduce((acc, tag) => {
            if (this.$route.query.tags && this.$route.query.tags.includes(JSON.stringify(tag))) {
              return [tag, ...acc]
            }
            return [...acc, tag]
          }, [])
        : this.item.tags
    },
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
