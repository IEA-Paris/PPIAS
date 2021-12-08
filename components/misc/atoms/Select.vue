<template>
  <v-select
    v-model="selected"
    v-bind="$attrs"
    menu-props="offset-y"
    :loading="loading"
    single-line
    @click:clear="$emit('clear')"
  ></v-select>
</template>

<script>
export default {
  props: {
    item: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      default: '',
      required: true,
    },
    loading: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    selected: {
      get() {
        return this.selected
      },

      set(value) {
        // set on parent
        this.selected = value
      },
    },
  },
  mounted() {},
  beforeCreate() {},
  created() {},
}
</script>
