<template>
  <div>
    <v-skeleton-loader
      v-if="$store.state.loading"
      type="heading"
      :height="40"
    ></v-skeleton-loader>
    <v-hover v-else v-slot="{ hover }">
      <v-card
        :elevation="hover ? 2 : 0"
        flat
        nuxt
        :to="localePath('/authors/' + item.slug)"
        class="text-h5 ma-2 pa-2"
        v-html="highlightWord(item.firstname + ' ' + item.lastname)"
      >
      </v-card>
    </v-hover>
  </div>
</template>
<script>
import { highlight } from '~/assets/utils/transforms'
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    search: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    extended: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    highlightWord(word = '') {
      return this.$store.state.authors.search
        ? highlight(word, this.$store.state.authors.search || '')
        : word
    },
  },
}
</script>

<style lang="scss"></style>
