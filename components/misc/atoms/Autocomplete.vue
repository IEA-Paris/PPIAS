<template>
  <v-autocomplete v-model="values" v-bind="$attrs" menu-props="offset-y" chips></v-autocomplete>
</template>

<script>
export default {
  props: {
    item: {
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
    values: {
      get() {
        return this.$store.state.form[this.item]
      },

      set(value) {
        return this.$store.commit('form/updateStore', { [this.type]: value })
      },
    },
  },
  mounted() {},
  beforeCreate() {},
  created() {},
}
</script>
