<template>
  <div>
    <v-skeleton-loader
      v-if="rootStore.loading"
      :type="
        isSmDisplay && !filter
          ? 'list-item-avatar-three-line'
          : 'list-item-three-line'
      "
      tile
    ></v-skeleton-loader>
    <v-list-item
      v-else
      nuxt
      :to="localePath('/authors/' + item._path.split('/').at(-1))"
      class="mb-6 d-flex align-start pl-0"
      :class="index > 0 ? '' : ''"
      flat
    >
      <v-list-item-avatar
        v-if="
          mdAndUp || (isSmDisplay && !filter)
        "
        x-large
        tile
        size="80"
      >
        <OptimizedImage
          v-if="item.image"
          alt="Avatar"
          :src="item.image"
          height="80"
          :ratio="1"
        />
        <v-icon v-else class="white--text headline author-picture">{{
          item.firstname[0] + item.lastname[0]
        }}</v-icon>
      </v-list-item-avatar>
      <div
        class="text-h6 author-mobile-title"
        :class="
          isXsDisplay || (isSmDisplay && filter)
            ? ' small'
            : ''
        "
      >
        <!--          <ArticleCategories
            v-if="isXsDisplay || (isSmDisplay && filter)"
            :item="item"
            class="pr-2"
            small
          /> -->
        <div :id="slugifyItem(item.lastname)" class="anchor"></div>
        <div v-html="highlightWord(item.firstname + ' ' + item.lastname)"></div>
        <v-list-item-subtitle class="mt-2 d-inline-flex text-subtitle-1">
          <div class="text-subtitle-2 mb-1">
            <span v-html="highlightWord(getTitlesAndInstitutions(item))"></span>
          </div>
        </v-list-item-subtitle>
      </div>
    </v-list-item>
  </div>
</template>
<script setup>
import slugify from '~/assets/utils/slugify'
import useHighlightWord from '~/composables/utils/useHighlightWord';
import { useRootStore } from '~/store/root';
import { useDisplay } from 'vuetify'
import {
  formatTitleAndInstitutions,
} from '~/assets/utils/transforms'

// TODO: Change this composent to use a compasable

const rootStore = useRootStore()
const localePath = useLocalePath()
const { xs: isXsDisplay, sm: isSmDisplay, mdAndUp } = useDisplay()

const props = defineProps({
  item: {
    required: true,
    type: Object,
  },
  filter: {
    required: false,
    type: Boolean,
    default: false,
  },
  index: {
    required: true,
    type: Number,
  },
})


const slugifyItem = (item) => slugify(item)

const getTitlesAndInstitutions = (item) =>
  item?.positions_and_institutions?.length
    ? formatTitleAndInstitutions(item.positions_and_institutions)
    : ''

const { highlightWord } = useHighlightWord(rootStore.getChildrenStore('authors').search)
</script>
<style lang="scss" scoped>
.author-mobile-title.small {
  font-size: 1rem;
}
.author-mobile-title {
  font-size: 1.3rem;
  margin-top: 0.1rem;
}
</style>
