<template>
  <PageContainer>
    <PageTitle :text="$t('tos')" />
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <ContentRenderer class="nuxt-content" :value="page" />
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script>
const {data: page} = await useAsyncData('tos-page', () => queryContent('pages/tos').findOne())
</script>
<style lang="scss"></style>
