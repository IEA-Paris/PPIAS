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
const route = useRoute()
const router = useRouter()

const props = defineProps({ type: String, filter: String })
const selected = computed({
  get() {
    return rootStore.list.filters[props.filter]
  },
  set(value) {
    // this.$store.commit('list/update', { [this.filter]: value })
  },
})
</script>
