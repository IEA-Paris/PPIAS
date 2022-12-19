<template>
  <div>
    <v-skeleton-loader
      v-if="rootStore.loading"
      type="heading"
      :height="40"
    ></v-skeleton-loader>
    <v-hover v-else v-slot="{ hover }">
      <v-card
        :elevation="hover ? 2 : 0"
        flat
        nuxt
        :to="localePath('/authors/' + item._path.split('/').at(-1))"
        class="text-h5 ma-2 pa-2"
        v-html="highlightWord(item.firstname + ' ' + item.lastname)"
      >
      </v-card>
    </v-hover>
  </div>
</template>
<script setup>
import { useRootStore } from '~/store/root';
import useHighlightWord from '~/composables/utils/useHighlightWord';

const rootStore = useRootStore()
const props = defineProps({
  item: {
    type: Object,
    required: true,
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
})

const { highlightWord } = useHighlightWord(rootStore.getChildrenStore('authors').search)

</script>

<style lang="scss"></style>
