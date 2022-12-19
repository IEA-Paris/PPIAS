<template v-slot:activator="{ on, attrs }">
  <v-textarea
    v-model="val"
    v-bind="attrs"
    :loading="$apollo.loading"
    type="text"
  />
</template>

<script setup>
import { useRootStore } from '~/store/root';
import debounce from '~/assets/utils/debounce'

const attrs = useAttrs()
const rootStore = useRootStore()
const route = useRoute()
const props = defineProps({type: String, item: String})
// const debouncedInput = useDebounce((value) => this.$store.dispatch('form/update', {
//           type: this.type,
//           itemId: this.$route.params.id,
//           values: { [this.item]: value },
//         }), 200);

const val = computed({
  get() {
    return !route.params.id
      ? rootStore.list[props.item]
      : rootStore.form[props.item]
  },
  set(value) {
    // debouncedInput(value)
  }
})
</script>
