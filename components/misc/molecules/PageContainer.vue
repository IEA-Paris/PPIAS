<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing"
    :fluid="!$store.state.scrolled"
    :class="{ 'py-0': !$store.state.scrolled }"
  >
    <v-row
      class="transition-swing"
      :no-gutters="!$store.state.scrolled"
      :class="$store.state.scrolled ? '' : 'mx-12'"
    >
      <v-col class="transition-swing" cols="12">
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    onScroll() {
      this.$store.commit('setScrolled')
    },
  },
}
</script>
<style lang="scss"></style>
