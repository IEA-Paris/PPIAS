<template>
  <v-autocomplete
    v-model="selected"
    v-bind="$attrs"
    multiple
    menu-props="offset-y"
    :loading="$wait.any"
  >
    <template #selection="{ index }">
      <SelectionSlot
        :label="false"
        :items="selected"
        :index="index"
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
        console.log('this.$store.: ', this.$store.state)
        return this.$store.state[this.type].filters[this.filter]
      },
      set(value) {
        this.$store.dispatch(this.type + '/updateFilters', {
          [this.filter]: value,
        })
      },
    },
  },

  created() {},
  beforeCreate() {},
}
</script>
<style scoped></style>
