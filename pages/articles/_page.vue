<template>
  <div>
    <PageTitle :text="$t('articles')" />
    <ListLeftPanel
      :type="type"
      tiles
      :layout="{ cols: 12, md: 6, nogutters: false, fluid: true }"
      :pagination="{
        itemsPerPage: 9,
        page: $route.params.page,
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
    return {
      type: 'articles',
    }
  },
  computed: {},
  async mounted() {},
  created() {},
  methods: {},
}
</script>
<style lang="scss"></style>
