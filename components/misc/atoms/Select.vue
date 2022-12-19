<template>
  <v-select
    v-bind="attrs"
    :ref="`refs.${type + filter}`"
    v-model="selected"
    v-scroll="blur"
    menu-props="offset-y"
    :multiple="multiple"
  >
    <template #selection="{ item, index }">
      <SelectionSlot
        :label="false"
        :items="selected"
        :index="index"
        :item="item"
      /> </template
  ></v-select>
</template>

<script setup>
import { useRootStore } from '~/store/root';

const rootStore = useRootStore()
const attrs = useAttrs()
const refs = {
  [props.type + props.filter]: ref(null),
}

const props = defineProps({
  type: {
    type: String,
    default: '',
    required: true,
  },
  filter: {
    type: String,
    default: '',
    required: true,
  },
  multiple: {
    type: Boolean,
    default: true,
  },
})

const selected = computed({
  get() {
    return rootStore.getChildrenStore(props.type).filters[props.filter]
  },
  set(value) {
    rootStore.updateFilters({
      filters: { [props.filter.value]: value },
      type: props.type,
    })
  },
})

const blur = () => {
  const ref = refs[props.type + props.filter]
  if (ref) {
    ref.blur()
  }
}
</script>
<style scoped></style>