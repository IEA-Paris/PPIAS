<template>
  <PageContainer no-resize>
    <PageTitle :text="$t('support')" />
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <ContentRenderer class="nuxt-content" :value="page" />
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script>
const {data: page} = await useAsyncData('support-page', () => queryContent('pages/support').findOne())
</script>
<style lang="scss"></style>
