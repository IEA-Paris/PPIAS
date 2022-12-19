<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing mb-12"
    :fluid="!rootStore.scrolled"
    :class="{
      'py-0': !rootStore.scrolled,
      'pl-0': filter,
      'mt-6': rootStore.loading,
    }"
  >
    <v-row class="transition-swing mx-0" :no-gutters="!rootStore.scrolled">
      <template v-if="mdAndUp">
        <v-col cols="12" sm="6" md="4" class="transition-swing">
          <component
            :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
            v-for="(item, index) in data.items.filter(
              (item, index) =>
                !!(mdAndUp ? index % 3 === 0 : !(index % 2))
            )"
            :key="index"
            :index="index"
            :item="item"
            :scroll="rootStore.scrolled"
            class="ml-0"
          ></component>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="transition-swing">
          <component
            :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
            v-for="(item, index) in data.items.filter(
              (item, index) =>
                !!(mdAndUp
                  ? (index - 1) % 3 === 0
                  : index % 2)
            )"
            :key="'x' + index"
            :index="index"
            :item="item"
            :scroll="rootStore.scrolled"
          ></component>
        </v-col>
        <v-col
          v-if="mdAndUp"
          cols="12"
          sm="6"
          md="4"
          class="transition-swing"
        >
          <component
            :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
            v-for="(item, index) in data.items.filter(
              (item, index) => !!((index - 2) % 3 === 0)
            )"
            :key="'y' + index"
            :index="index"
            :item="item"
            :scroll="rootStore.scrolled"
          ></component>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12" class="transition-swing">
          <template v-for="(item, index) in data.items">
            <component
              :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
              v-if="item"
              :key="index"
              :item="item"
              v-bind="attrs"
              :scroll="rootStore.scrolled"
            ></component>
          </template>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRootStore } from '~/store/root';
import { useDisplay } from 'vuetify'

const attrs = useAttrs()
const { mdAndUp } = useDisplay()
const rootStore = useRootStore()

const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
  filter: {
    required: false,
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: '',
    required: true,
  },
})

const onScroll = () => {
  rootStore.setScrolled()
}
</script>
<style lang="scss"></style>
