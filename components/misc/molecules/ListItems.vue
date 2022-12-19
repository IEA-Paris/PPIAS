<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing pt-0"
    :class="[rootStore.scrolled ? 'mt-n4' : 'mt-n2', { 'ml-0': filter }]"
    :fluid="!rootStore.scrolled"
  >
    <v-row class="transition-swing" :no-gutters="!rootStore.scrolled">
      <v-col
        cols="12"
        :class="{
          'pt-0 pr-1': !rootStore.scrolled,
          'px-0': isSmDisplay,
        }"
        class="transition-swing"
      >
        <v-list line="two">
          <template v-if="smAndDown">
            <component
              :is="type.charAt(0).toUpperCase() + type.slice(1) + 'ListItemMobile'"
              v-for="(item, index) in data.items"
              v-bind="attrs"
              :key="index"
              :index="index"
              :item="item"
              highlighted
              :scroll="rootStore.scrolled"
              :filter="filter"
            ></component>
          </template>
          <component
            :is="type.charAt(0).toUpperCase() + type.slice(1) + 'ListItem'"
            v-for="(item, index) in data.items"
            v-else
            v-bind="attrs"
            :key="index"
            :index="index"
            :item="item"
            highlighted
            :scroll="rootStore.scrolled"
          ></component>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRootStore } from '~/store/root';
import { useDisplay } from 'vuetify'

const attrs = useAttrs()
const { sm: isSmDisplay, smAndDown } = useDisplay()

const props = defineProps({
  data: {
    required: true,
    type: Object,
    default: () => {
      return { items: [], total: 0 }
    },
  },
  filter: {
    required: false,
    type: Boolean,
    default: false,
  },
  sections: {
    required: false,
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: '',
    required: true,
  },
})

const rootStore = useRootStore()

const onScroll = () => {
  return rootStore.setScrolled()
}
</script>
<style lang="scss">
.h500 {
  max-height: 500;
}
</style>
