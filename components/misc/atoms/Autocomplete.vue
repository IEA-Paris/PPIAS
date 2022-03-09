<template>
  <v-autocomplete
    v-model="selected"
    v-bind="$attrs"
    multiple
    menu-props="offset-y"
    :loading="$nuxt.loading || $store.state.loading"
  >
    <template #selection="{ item, index }">
      <SelectionSlot
        :label="false"
        :items="selected"
        :index="index"
        :item="item"
      /> </template
  ></v-autocomplete>
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
        return this.$store.state[this.type].filters[this.filter]
      },
      set(value) {
        this.$store.dispatch('updateFilters', {
          filters: { [this.filter]: value },
          type: this.type,
        })
      },
    },
  },

  created() {},
  beforeCreate() {},
}
</script>
<style scoped></style>
