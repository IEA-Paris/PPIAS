<template>
  <div>
    <PageTitle text="articles" />
    <FrontList type="articles" :layout="{ cols: 12, md: 6, nogutters: false, fluid: true }"></FrontList>
  </div>
</template>
<script>
import testef from '~/assets/utils/test'
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {
    testef(this.$content)
  },
  methods: {},
}
</script>
<style lang="scss"></style>
