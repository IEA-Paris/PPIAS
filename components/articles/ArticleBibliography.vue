<template>
  <div>
    <v-list v-if="bibliography" two-line>
      <v-list-item
        v-for="ref in bibliography"
        :key="ref.id"
        :to="ref.link ? '#blbb-' + ref.id : ''"
        nuxt
        class="pl-0"
      >
        <v-list-item-content :id="ref.id" v-html="ref[style]">
        </v-list-item-content></v-list-item
    ></v-list>
    <span v-else>{{ $t('no-bibliography-available-for-this-article') }}</span>
  </div>
</template>
<script setup>
import { useRootStore } from '~/store/root';

const rootStore = useRootStore()

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  open: {
    type: Boolean,
    default: false,
  },
})

const style = computed(() => rootStore.getChildrenStore('articles').style)

const bibliography = computed(() => {
  return (
    (props.item.bibliography &&
      Array.isArray(props.item.bibliography) &&
      props.item.bibliography?.length &&
      props.item.bibliography
        .slice()
        .sort((a, b) => a[style.value].localeCompare(b[style.value]))) ||
    []
  )
})
</script>
<style lang="scss"></style>
