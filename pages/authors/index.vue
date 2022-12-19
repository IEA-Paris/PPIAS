<template>
  <PageContainer>
    <PageTitle :text="$t('authors')" />
    <ListLeftPanel
      type="authors"
      :layout="{ cols: 12, md: 6, nogutters: false, fluid: true }"
      :pagination="{
        itemsPerPage: 30,
        page: 1,
        sortBy: [],
        sortDesc: [true],
        itemsPerPageArray: [30, 60, 100],
      }"
    ></ListLeftPanel>
  </PageContainer>
</template>
<script setup>
</script>
<style lang="scss"></style>
