<template>
  <v-app>
    <TopBar />
    <v-main style="padding-bottom: 5rem">
      <v-container fluid>
        <slot></slot>
      </v-container>
      <v-fab-transition>
        <v-btn
          v-show="rootStore.scrolled"
          fixed
          tile
          bottom
          outlined
          right
          contained
          fab
          style="background-color: white"
          :class="{
            'mb-16':
              mobile &&
              route.name &&
              !route.name.startsWith('index'),
          }"
          @click.prevent="$vuetify.goTo(0)"
        >
          <v-icon color="black"> mdi-arrow-up </v-icon>
        </v-btn>
      </v-fab-transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { useRootStore } from '~/store/root';

const { route } = useRouter()
const rootStore = useRootStore()
const { mobile } = useDisplay()
const mdp = ref('')
const isProd = ref(useRuntimeConfig().NODE_ENV === 'production')
const nuxtApp = useNuxtApp()

onMounted(() => {
  const {$loading} = nuxtApp
  $loading.finish = () => {
    $loading.clear()
    $loading.pause()
    return this
  }
})
</script>
<style lang="scss"></style>
