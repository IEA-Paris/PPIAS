<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing"
    :fluid="!rootStore.scrolled"
    :class="
      ({ 'pl-0 ml-0': filter }, rootStore.scrolled ? 'pt-6' : 'px-0 pt-0')
    "
  >
    <v-row
      v-for="section in Math.min(sections, Math.ceil(data.items.length / 3))"
      :key="section"
      class="transition-swing"
      :no-gutters="!rootStore.scrolled"
      :class="rootStore.scrolled ? '' : 'mx-3'"
    >
      <v-col
        cols="12"
        :sm="filter ? 12 : 6"
        md="8"
        xl="6"
        :class="{ 'pt-1 pr-1': !rootStore.scrolled }"
        class="transition-swing"
        :order="
          section % 2
            ? 'first'
            : data.items[(section - 1) * 3 + 1]
            ? 'last'
            : 'first'
        "
      >
        <component
          :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
          v-if="data.items[(section - 1) * 3]"
          :item="{ ...data.items[(section - 1) * 3], highlighted: true }"
          v-bind="attrs"
          highlighted
          :scroll="rootStore.scrolled"
        ></component>
      </v-col>
      <v-col cols="12" :sm="filter ? 12 : 6" md="4" xl="6" class="">
        <v-row :no-gutters="!rootStore.scrolled">
          <v-col
            cols="12"
            class="transition-swing"
            :class="{ 'pt-1': !rootStore.scrolled }"
          >
            <component
              :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
              v-if="data.items[(section - 1) * 3 + 1]"
              :item="data.items[(section - 1) * 3 + 1]"
              v-bind="attrs"
              class="h500"
              :scroll="rootStore.scrolled"
            ></component>
          </v-col>
          <v-col
            cols="12"
            class="transition-swing"
            :class="{ 'pt-1': !rootStore.scrolled }"
          >
            <component
              :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
              v-if="data.items[(section - 1) * 3 + 2]"
              :item="data.items[(section - 1) * 3 + 2]"
              class="h500"
              v-bind="attrs"
              :scroll="rootStore.scrolled"
            ></component>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRootStore } from '~/store/root';

const attrs = useAttrs()
const rootStore = useRootStore()
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

const onScroll = () => {
  rootStore.setScrolled()
}
</script>
<style lang="scss">
.h500 {
  max-height: 500;
}
</style>
,
