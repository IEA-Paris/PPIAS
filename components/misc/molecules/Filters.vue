<template>
  <div class="d-flex flex-grow-1">
    <component
      :is="filter.type"
      v-for="(filter, name) in filters"
      :key="name + filter.type"
      hide-details
      :dense="$vuetify.breakpoint.smAndDown"
      :disabled="loading"
      :items="filter.items && filter.items.map((item) => $t(item))"
      clearable
      :label="$t(name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase())"
      outlined
      :item="name"
      :type="type"
      style="min-width: 150px"
    />
  </div>
</template>
<script>
import filters from '~/assets/data/lists'
export default {
  props: {
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
    return {
      filters: filters[this.type],
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
