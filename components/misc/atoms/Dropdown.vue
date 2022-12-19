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
const route = useRoute()
const router = useRouter()
const props = defineProps({ type: String, filter: String })
const rootStore = useRootStore()

const selected = computed({
  get() {
    return rootStore.list && rootStore.list[props.filter]
  },
  set(value) {
    // this.$store.commit('list/update', { [this.filter]: value })
  },
})
</script>
<style lang="scss"></style>
