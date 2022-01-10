<template v-slot:activator="{ on, attrs }">
  <v-text-field
    v-model.trim="val"
    v-bind="$attrs"
    :placeholder="type === 'search' ? $t('search') : ''"
    :prepend-inner-icon="type === 'search' ? 'mdi-magnify' : ''"
    single-line
    :loading="$apollo.loading"
    @click:clear="$store.commit('list/update', { [item]: undefined })"
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
    item: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      debouncedInput: debounce(function (value) {
        ;['search'].includes(this.item) // TODO use a shared object for filters declarations
          ? this.$store.commit('list/update', { [this.item]: value })
          : this.$store.dispatch('form/update', {
              type: this.type,
              itemId: this.$route.params.id,
              values: { [this.item]: value },
            })
      }, 200),
    }
  },

  computed: {
    val: {
      get() {
        return !this.$route.params.id
          ? this.$store.state.list[this.item]
          : this.$store.state.form[this.item]
      },
      set(value) {
        this.debouncedInput(value)
      },
    },
  },
}
</script>
