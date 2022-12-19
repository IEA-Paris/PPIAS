<template>
  <v-container
    class="transition-swing"
    :fluid="!rootStore.scrolled"
    :class="{ 'py-0': !rootStore.scrolled }"
  >
    <v-row
      class="transition-swing"
      :no-gutters="!rootStore.scrolled"
      :class="rootStore.scrolled ? '' : 'mx-12'"
    >
      <!--   <SectionTitle :text="title" /> -->
    </v-row>
    <v-row
      class="transition-swing"
      :no-gutters="!rootStore.scrolled"
      :class="rootStore.scrolled ? '' : 'mx-12'"
    >
      <v-col
        cols="12"
        md="6"
        lg="8"
        class="transition-swing"
        :order="alt ? 'last' : 'first'"
      >
        <Item :scroll="rootStore.scrolled" :first="isMdDisplay" />
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-row :no-gutters="!rootStore.scrolled">
          <v-col cols="12" class="transition-swing">
            <Item />
          </v-col>
          <v-col cols="12" class="transition-swing">
            <Item />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useRootStore } from '~/store/root';
import { useDisplay } from 'vuetify'

const { md: isMdDisplay } = useDisplay()
const rootStore = useRootStore()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  alt: {
    type: Boolean,
    default: false,
  },
})
const scrolled = ref(false)

</script>
<style lang="scss"></style>
