<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </v-app>
</template>

<script setup>
const pageNotFound = ref('404 Not Found')
const otherError = ref('An error occurred')

const props = defineProps({
  error: {
    type: Object,
    default: null,
  },
})
const title = props.error.statusCode === 404 ? pageNotFound.value : otherError.value
useHead({title})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
