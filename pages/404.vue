<template>
  <PageContainer>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <div
          class="main-title"
          :class="rootStore.scrolled ? 'mb-9' : 'mb-6'"
          v-html="$t('page-not-found')"
        ></div>
        <ContentRenderer class="nuxt-content" :value="page" />
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script setup>
import { useRootStore } from '~/store/root';

const rootStore = useRootStore();
const {data: page} = await useAsyncData('about-page', () => queryContent('pages/about').findOne())
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
