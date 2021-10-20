<template>
  <v-select
    v-model="selected"
    v-bind="$attrs"
    menu-props="offset-y"
    @click:clear="filter ? $router.push({ ...$route.query, query: { [filter]: undefined } }) : ''"
  ></v-select>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: false,
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
        return this.filter
          ? this.$store.commit('list/update', { [this.filter]: value })
          : this.$store.commit('form/update', { [this.type]: value })
      },
    },
  },
  mounted() {
    console.log('moutned')
  },
  beforeCreate() {
    console.log('bf create')
  },
  created() {
    console.log('created')
    console.log('this.$attrs: ', this.$attrs)
  },
}
</script>
