<template v-slot:activator="{ on, attrs }">
  <v-text-field
    v-model.trim="search"
    v-bind="$attrs"
    :placeholder="$t('search')"
    prepend-inner-icon="mdi-magnify"
    single-line
    @click:clear="$router.push({ ...$route.query, query: { [filter]: undefined } })"
  />
</template>

<script>
import debounce from '~/assets/utils/debounce'

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
    return {
      debouncedSearch: debounce(function (text) {
        this.$store.dispatch('list/update', { [this.filter]: text })
      }, 200),
    }
  },

  computed: {
    search: {
      get() {
        console.log(this.type)
        return this.$store.state.list[this.filter]
      },
      set(value) {
        this.debouncedSearch(value)
      },
    },
  },
}
</script>
