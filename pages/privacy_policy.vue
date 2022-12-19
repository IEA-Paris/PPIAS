<template>
  <PageContainer no-resize>
    <PageTitle :text="$t('privacy')" />
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <ContentRenderer class="nuxt-content" :value="page" />
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script>
const {data: page} = await useAsyncData('privacy-page', () => queryContent('pages/privacy').findOne())
</script>
<style lang="scss"></style>
