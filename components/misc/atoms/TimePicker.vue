<template>
  <v-select
    v-model="selected"
    v-bind="attrs"
    menu-props="offset-y"
    @click:clear="
      router.push({ ...route.query, query: { [filter]: undefined } })
    "
  ></v-select>
</template>

<script setup>
import { useRootStore } from '~/store/root';

const attrs = useAttrs()
const rootStore = useRootStore()
const props = defineProps({ type: String, filter: String })

const selected = computed({
  get() {
    return rootStore.list && rootStore.list[props.filter]
  },
  set(value) {
    // $store.commit('list/update', { [filter]: value })
  },
})
</script>
