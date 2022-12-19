<template>
  <PageContainer no-resize>
    <PageTitle :text="$t('newsletter')" />
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <!-- <ContentRenderer class="nuxt-content" :value="page" /> -->
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script setup>
// const {data: page} = await useAsyncData('newsletter-page', () => queryContent('pages/newsletter').findOne())
</script>
<style lang="scss"></style>
