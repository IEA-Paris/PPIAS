<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing"
    :fluid="!rootStore.scrolled && !noResize"
    :class="{ 'py-0': !rootStore.scrolled }"
  >
    <v-row class="transition-swing" :no-gutters="!rootStore.scrolled">
      <v-col class="transition-swing" cols="12">
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useRootStore } from '~/store/root';

const rootStore = useRootStore()
const props = defineProps({
  noResize: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const onScroll = () => {
  return rootStore.setScrolled()
}
</script>
<style lang="scss"></style>
