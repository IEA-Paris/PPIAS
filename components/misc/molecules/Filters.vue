<template>
  <aside
    class="d-sticky transition-swing"
    :class="{ 'pr-6': $store.state.scrolled && !$vuetify.breakpoint.xs }"
  >
    <div class="mt-3">
      <v-btn
        v-if="showReset"
        outlined
        x-large
        block
        height="56"
        @click="$store.dispatch(type + '/resetState') && $emit('close')"
        ><v-icon left>mdi-autorenew</v-icon
        >{{ $t('reset-your-search-filters') }}</v-btn
      >
      <v-sheet
        v-else
        height="56"
        block
        class="text-h6 overline text-center mb-3 d-flex align-center justify-center darkgrey--text"
      >
        {{ $t('filters') }}
      </v-sheet>

      <component
        :is="filters[filter].type"
        v-for="(filter, name) in Object.keys(filters)"
        :key="name + type + filter"
        hide-details
        :dense="$vuetify.breakpoint.sm"
        :items="filters[filter].items.map((item) => $t(item))"
        clearable
        :label="$t(filter)"
        min-height="56"
        outlined
        :type="type"
        :filter="filter"
        style="min-width: 150px"
        :class="!showReset && name === 0 ? 'mb-3' : 'my-3'"
      />
    </div>
  </aside>
</template>
<script>
import data from '~/assets/generated/filters'
export default {
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      filters: data[this.type].filters,
      sorters: data[this.type].sort,
    }
  },
  computed: {
    showReset() {
      return this.$store.state[this.type].filtersCount
    },
  },
  created() {},
  methods: {},
}
</script>
<style lang="scss"></style>
