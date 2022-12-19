<template>
  <v-row justify="center">
    <v-col
      cols="12"
      class="transition-swing"
      md="8"
      lg="6"
      xl="6"
      :class="{ 'py-0': !rootStore.scrolled }"
    >
      <!--   Latest issue -->
      <div class="text-h6 d-flex">
        {{ $t('latest-issue') }}
        <v-spacer></v-spacer>
        <v-btn
          variant="icon"
          tile
          target="_blank"
          nuxt
          :href="localePath('/issue/' + issue._path.split('/').at(-1))"
        >
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div
        class="text-h6 transition-swing"
        :class="{ 'mb-6': rootStore.scrolled }"
      >
        {{ issue.title }}
      </div>
      <ArticlesListItemMobile
        v-for="(article, index) in articles"
        v-bind="attrs"
        :key="index"
        :index="index"
        :item="article"
        :scroll="rootStore.scrolled"
      ></ArticlesListItemMobile>

      <!--eslint-disable-next-line vue/no-parsing-error eslint-disable-next-line vue/attribute-hyphenation-->
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn
          variant="text"
          color="dark"
          :to="localePath('/issue/' + issue._path.split('/').at(-1))"
        >{{
          $t('see-all-results-articlescount', [articles.length])
        }}</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
import { useRootStore } from '~/store/root';

const attrs = useAttrs()
const rootStore = useRootStore()
const localePath = useLocalePath()

const props = defineProps({
  issue: {
    type: [Object, Boolean],
    default: false,
  },
  articles: {
    type: Array,
    default: () => [],
  },
})

const path = computed(() => `${localePath('/articles')}?view=issues&filters={"issue"%3A["${props.issue.title}"]}`)
</script>
<style lang="scss"></style>
