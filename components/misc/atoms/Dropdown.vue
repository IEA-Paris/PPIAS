<template>
  <v-select
    v-model="selected"
    v-bind="$attrs"
    menu-props="offset-y"
    @click:clear="
      $router.push({ ...$route.query, query: { [filter]: undefined } })
    "
  ></v-select>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    filter: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    selected: {
      get() {
        return this.$store.state.list && this.$store.state.list[this.filter]
      },
      set(value) {
        this.$store.commit('list/update', { [this.filter]: value })
      },
    },
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
