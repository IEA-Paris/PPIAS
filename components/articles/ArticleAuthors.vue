<template>
  <div class="ma-6">
    <div v-for="(author, index) in item.authors" :key="index" class="pb-6">
      <AuthorsItem :item="author"></AuthorsItem>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
