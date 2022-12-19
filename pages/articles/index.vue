<template>
  <div>
    <PageTitle :text="$t('articles')" />
    <ListLeftPanel
      :type="type"
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
import { useRootStore } from '~/store/root';
const rootStore = useRootStore();
const type = ref('articles')
rootStore.setLoading(false)
</script>
<style lang="scss"></style>
