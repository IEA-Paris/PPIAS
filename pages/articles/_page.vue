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
  validate({ params }) {
    return /^\d+$/.test(params.page)
  },
  props: {},
  data() {
    return {
      type: 'articles',
    }
  },
  computed: {},
  async mounted() {},
  created() {
    this.$store.dispatch('updatePage', {
      page: this.$route.params.page,
      type: 'articles',
    })
  },
  methods: {},
}
</script>
<style lang="scss"></style>
