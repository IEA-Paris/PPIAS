<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing"
    :class="{ 'py-0': !rootStore.scrolled }"
    fluid
  >
    <v-row class="transition-swing">
      <v-col class="transition-swing" cols="12">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <h1
              class="main-title transition-swing"
              :class="rootStore.scrolled ? 'mb-16 mt-8' : 'mb-8 mt-2'"
              v-html="useRuntimeConfig().public.full_name_html"
            ></h1>
            <ContentRenderer class="nuxt-content" :value="page" />
          </v-col>
        </v-row>

        <LatestIssue
          :issue="latestIssue"
          :articles="latestIssueArticles"
        ></LatestIssue>

        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <!--  Featured articles -->
            <div class="text-h6">{{ $t('featured-articles') }}</div>
            <v-divider></v-divider>
            <v-list three-line>
              <ArticlesListItemMobile
                v-for="(article, index) in featuredArticles"
                v-bind="attrs"
                :key="index"
                :index="index"
                :item="article"
                :scroll="rootStore.scrolled"
              ></ArticlesListItemMobile>
            </v-list>
          </v-col>
        </v-row> </v-col
    ></v-row>
  </v-container>
</template>
<script setup>
import { useRootStore } from '~/store/root';
const attrs = useAttrs();
const rootStore = useRootStore();
rootStore.setLoading(true)
const {data: page} = await useAsyncData('page', () => queryContent('pages/about').findOne())
const {data: latestIssue} = await useAsyncData('latestIssue', () => queryContent('issues').sort({ date: -1 }).limit(3).findOne())
const {data: latestIssueArticles} = await useAsyncData('latestIssueArticles', () => queryContent('articles').where({issue: {$regex: latestIssue.path}, published: true}).sort({ date: 1 }).limit(3).find())
const {data: featuredArticles} = await useAsyncData('featuredArticles', () => queryContent('articles').where({ highlight: true, published: true }).sort({ date: -1 }).limit(3).find())
rootStore.setLoading(false)

const onScroll = () => {
  rootStore.setScrolleed()
}
</script>
<style lang="scss">
@use 'vuetify/settings';

.main-title {
  font-family: 'Bodoni Moda';
  font-size: 3rem !important;
  font-weight: 500 !important;
  line-height: 3.5rem;
  max-width: 100%;
}
@media #{map-get(settings.$display-breakpoints, 'sm')} {
  .main-title {
    font-size: 2.4rem !important;
    line-height: 3rem;
  }
}
@media #{map-get(settings.$display-breakpoints, 'xs')} {
  .main-title {
    font-size: 2rem !important;
    line-height: 2.5rem;
  }
}
</style>