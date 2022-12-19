<template>
  <v-autocomplete
    v-model="selected"
    v-bind="attrs"
    multiple
    menu-props="offset-y"
    :loading="$nuxt.loading || rootStore.loading"
  >
    <template #selection="{ item, index }">
      <SelectionSlot
        :label="false"
        :items="selected"
        :index="index"
        :item="item"
      /> </template
  ></v-autocomplete>
</template>

<script setup>
import { useRootStore } from '~/store/root';

const attrs = useAttrs()
const rootStore = useRootStore()
const props = defineProps({ type: String, filter: String })

const selected = computed({
  get() {
    return rootStore.getChildrenStore(props.type).filters[props.filter]
  },
  set(value) {
    rootStore.updateFilters({
      filters: { [props.filter]: value },
      type: props.type,
    })
  },
})
</script>
<style scoped></style>
