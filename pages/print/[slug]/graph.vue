<template>
  <TextFingerprint
    ref="articleBox"
    :item="item"
    :size="size"
    :margin="10"
  ></TextFingerprint>
</template>
<script setup>
import { useDisplay } from 'vuetify';

definePageMeta({ layout: 'print' })
const articleBox = ref(null);
const { name: breakpointName } = useDisplay();
const { data: item } = await useAsyncData('articles', () => queryContent('articles').where({ slug: route.params.slug }).findOne())

const size = computed(() => {
  switch (breakpointName) {
    default:
      return resizeItem()
  }
})

const resizeItem = () => {
  const width = articleBox?.$el.clientWidth
  const height = articleBox?.$el.clientHeight
  const smallest = Math.min(...[width, height]) || 250
  return Math.min(...[smallest - 10, 400])
  /*    this.$set(this.$refs.articleBox, 'width', widthString) */
}
</script>
<style lang="scss"></style>
