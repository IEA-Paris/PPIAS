<template v-slot:activator="{ on, attrs }">
  <v-textarea
    v-model="val"
    v-bind="$attrs"
    :loading="$apollo.loading"
    type="text"
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
        this.$store.dispatch('form/update', {
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
