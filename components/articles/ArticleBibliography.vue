<template>
  <div>
    <v-list two-line>
      <v-list-item
        v-for="ref in item.bibliography"
        :key="ref.id"
        :to="ref.link ? '#blbb-' + ref.id : ''"
        nuxt
      >
        <v-list-item-content :id="ref.id" v-html="ref[style]">
        </v-list-item-content></v-list-item
    ></v-list>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    style() {
      return this.$store.state.articles.style
    },
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
