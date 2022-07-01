<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing"
    :fluid="!$store.state.scrolled && !noResize"
    :class="{ 'py-0': !$store.state.scrolled }"
  >
    <v-row class="transition-swing" :no-gutters="!$store.state.scrolled">
      <v-col class="transition-swing" cols="12">
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    noResize: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
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
