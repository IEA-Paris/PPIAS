<template>
  <PageContainer no-resize>
    <PageTitle :text="$t('pressroom')" />
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <ContentRenderer class="nuxt-content" :value="page" />
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script setup>
const {data: page} = await useAsyncData('pressroom-page', () => queryContent('pages/pressroom').findOne())
</script>
<style lang="scss"></style>
