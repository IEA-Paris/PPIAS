<template>
  <div>
    <component
      :is="input.type"
      v-for="(input, name) in items"
      :key="name + input.type"
      :dense="$vuetify.breakpoint.smAndDown"
      :disabled="!!$data.$apolloData.loading"
      clearable
      :label="$t(input.label)"
      outlined
      :item="name"
      :type="type"
      style="min-width: 150px"
    ></component>
  </div>
</template>
<script>
export default {
  apollo() {
    return this.gql
      ? {
          form: {
            prefetch: true,
            query() {
              return this.gql || ''
            },
            variables() {
              return { options: this.options }
            },
            update: (data) => {
              console.log(data)
              return data[Object.keys(data)[0]]
            },
          },
        }
      : {}
  },
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    gql: {
      type: Object,
      default: () => {},
      required: false,
    },
    items: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
