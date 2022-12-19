<template>
  <v-select
    v-model="selected"
    :items="[]"
    v-bind="attrs"
    :label="filter"
  ></v-select>
</template>
<script setup>
import { useRootStore } from '~/store/root';

const attrs = useAttrs()
const rootStore = useRootStore()
const props = defineProps({ type: String, filter: String })

const selected = computed({
  get() {
    return rootStore.getChildrenStore(props.type).list && rootStore.getChildrenStore(props.type).list[props.filter]
  },
  set(value) {
    // rootStore.update({[this.filter]: value})
  },
})
</script>
<style lang="scss"></style>
