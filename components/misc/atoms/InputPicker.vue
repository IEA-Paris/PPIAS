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
    filter: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    selected: {
      get() {
        return this.$store.state.list.filters[this.filter]
      },

      set(value) {
        return this.$store.dispatch('form/update', {
          type: this.type,
          itemId: this.$route.params.id,
          values: { [this.item]: value },
        })
      },
    },
  },
  mounted() {},
  beforeCreate() {},
  created() {},
}
</script>
