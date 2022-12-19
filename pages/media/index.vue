<template>
  <div>
    <PageTitle :text="$t('media')" />
    <ListLeftPanel
      type="media"
      tiles
      :layout="{ cols: 12, md: 6, nogutters: false, fluid: true }"
      :pagination="{
        itemsPerPage: 9,
        page: 1,
        sortBy: [],
        sortDesc: [true],
        itemsPerPageArray: [9, 16, 30],
      }"
    ></ListLeftPanel>
  </div>
</template>
<script setup>
</script>
<style lang="scss"></style>
