<template>
  <v-list
    two-line
    max-width="650px"
    :class="isXsDisplay ? 'pl-0' : 'pl-4'"
  >
    <v-list-item v-for="(footnote, index) in item.footnotes" :key="index" nuxt>
      <v-list-item-content>
        <ContentRenderer
          :value="footnote"
          style="max-width: 650px"
          class="page a4 nuxt-content"
        />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script setup>
import { useDisplay } from 'vuetify';

const { xs: isXsDisplay } = useDisplay();
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
})
</script>
<style lang="scss"></style>
