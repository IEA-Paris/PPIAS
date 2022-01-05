<template>
  <div class="ma-6">
    <div v-for="(media, index) in item.media" :key="index" class="pb-6">
      <div class="text-h5">{{ media.caption }}</div>
      <Youtube v-if="media.type === 'youtube'" :yt="media.id"></Youtube>
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
