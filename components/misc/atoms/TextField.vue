<template v-slot:activator="{ on, attrs }">
  <v-text-field
    v-model.trim="val"
    v-bind="attrs"
    :placeholder="item === 'search' ? $t('search') : ''"
    :prepend-inner-icon="item === 'search' ? 'mdi-magnify' : ''"
    single-line
    :loading="nuxtApp.loading"
    @click:clear="
      router.push({ query: { ...route.query, [item]: undefined } })
    "
  >
    <template
      v-if="item === 'search' && !(route.query && route.query.search)"
      #label
    >
      <div class="searchLabel">{{ $t('search') }}</div>
    </template></v-text-field
  >
</template>

<script setup>
const attrs = useAttrs()
const nuxtApp = useNuxtApp();
const route = useRoute()
const router = useRouter()
const props = defineProps({type: String, item: String})

const val = computed({
  get() {
    return route.query && route.query[props.item]
  },
  set(value) {
    router.replace({
      query: { ...route.query, [props.item]: value },
    })
  },
})
</script>
<style lang="scss"></style>
