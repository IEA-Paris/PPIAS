<template>
  <v-list
    two-line
    max-width="650px"
    :class="$vuetify.breakpoint.xs ? 'pl-0' : 'pl-4'"
  >
    <v-list-item
      v-for="(footnote, index) in item.footnotes"
      :key="index"
      :to="'#bl' + footnote.backlink.substring(1)"
      nuxt
    >
      <v-list-item-content>
        <nuxt-content
          :document="footnote"
          style="max-width: 650px"
          class="page a4"
        />
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
  mounted() {
    console.log(this.item.footnotes)
  },
  methods: {},
}
</script>
<style lang="scss"></style>
