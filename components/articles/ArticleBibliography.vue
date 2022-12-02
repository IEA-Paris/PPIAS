<template>
  <div>
    <v-list v-if="bibliography" two-line>
      <v-list-item
        v-for="ref in bibliography"
        :key="ref.id"
        :to="ref.link ? '#blbb-' + ref.id : ''"
        nuxt
        class="pl-0"
      >
        <v-list-item-content :id="ref.id" v-html="ref[style]">
        </v-list-item-content></v-list-item
    ></v-list>
    <span v-else>{{ $t('no-bibliography-available-for-this-article') }}</span>
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
    bibliography() {
      return (
        (this.item.bibliography &&
          Array.isArray(this.item.bibliography) &&
          this.item.bibliography?.length &&
          this.item.bibliography
            .slice()
            .sort((a, b) => a[this.style].localeCompare(b[this.style]))) ||
        []
      )
    },
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
