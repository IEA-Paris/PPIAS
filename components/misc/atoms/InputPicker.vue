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
const rootStore = useRootStore()
const props = defineProps({ type: String, filter: String })
const selected = computed({
  get() {
    return rootStore.list.filters[this.filter]
  },
  set(value) {
    // return this.$store.dispatch('form/update', {
    //       type: this.type,
    //       itemId: this.$route.params.id,
    //       values: { [this.item]: value },
    //     })
  },
})
</script>
