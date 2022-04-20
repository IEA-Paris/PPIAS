<template>
  <div>
    <PageTitle :text="$t('articles')" />
    <ListLeftPanel
      type="articles"
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
<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  async mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
