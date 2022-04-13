<template>
  <v-list two-line>
    <v-list-item
      v-for="(footnote, index) in item.footnotes"
      :key="index"
      :to="'#bl' + footnote.backlink.substring(1)"
      nuxt
    >
      <v-list-item-content>
        <span
          ><b>{{ index + 1 }}</b
          >: {{ footnote.value }}</span
        >
      </v-list-item-content>
    </v-list-item>
  </v-list>
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
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
