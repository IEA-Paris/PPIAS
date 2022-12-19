<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template #activator="{ on }">
      <v-text-field
        :value="formatted"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="selected"
      color="primary"
      show-current
      v-bind="attrs"
      @input="menu = false"
      @click:clear="
        router.push({ ...route.query, query: { [item]: undefined } })
      "
    ></v-date-picker>
  </v-menu>
</template>

<script setup>
import { formatDate } from '~/assets/utils/transforms'
import { useRootStore } from '~/store/root';

const router = useRouter()
const attrs = useAttrs()
const rootStore = useRootStore()
const props = defineProps({ type: String, item: String })
const menu = ref(false)
const route = useRoute()

const selected = computed({
  get() {
    return !route.params.id ? rootStore.getChildrenStore(props.type).list[props.item] : rootStore.getChildrenStore(props.type).form[props.item]
  },
  set(value) {
    // this.$store.dispatch('form/update', {
    //   type: this.type,
    //   itemId: this.$route.params.id,
    //   values: { [this.item]: value },
    // })
  },
})

const formatted = computed(() => {
  return selected.value ? formatDate(
            !route.params.id
              ? rootStore.list[this.item]
              : rootStore.list.form[this.item]
          )
        : ''
})
</script>
