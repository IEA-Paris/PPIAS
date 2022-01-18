<template>
  <div>
    <PageTitle :text="$t('articles')" />
    <FrontList
      type="articles"
      :layout="{ cols: 12, md: 6, nogutters: false, fluid: true }"
    ></FrontList>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
