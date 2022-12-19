<template>
  <aside class="transition-swing">
    <div
      v-if="showReset"
      :class="rootStore.scrolled ? 'mr-0' : 'mr-1'"
      class="w-100 transition-swing mb-1"
    >
      <v-btn
        outlined
        x-large
        block
        :height="isSmDisplay ? '40' : '56'"
        @click="rootStore.resetState(type) && emit('close')"
        ><v-icon left>mdi-autorenew</v-icon
        >{{ $t('reset-your-search-filters') }}</v-btn
      >
    </div>

    <v-sheet
      v-else
      :height="isSmDisplay ? '40' : '56'"
      block
      class="search-label mt-1"
    >
      <v-icon small color="black" left>mdi-filter</v-icon>
      {{ $t('filters') }}
    </v-sheet>

    <component
      v-for="(filter, name) in Object.keys(filters)"
      :key="name + type + filter"
      :is="filters[filter].type"
      v-show="name < 3 || expanded"
      variant="outlined"
      :label="$t(filter)"
      :items="filters[filter].items.map((item) => item)"
      hide-details
      :dense="isSmDisplay"
      clearable
      min-height="56"
      :loading="rootStore.getChildrenStore(type).loading.includes(filter)"
      :type="type"
      :filter="filter"
      color="black"
      style="min-width: 150px"
      class="transition-swing pb-1"
      :class="
        rootStore.scrolled
          ? 'mt-6'
          : rootStore.getChildrenStore(type).filters &&
            rootStore.getChildrenStore(type).filters[filter] &&
            rootStore.getChildrenStore(type).filters[filter].length
          ? 'mt-1 mr-1'
          : 'mt-0 mr-1'
      "
    />
    <v-btn
      v-if="Object.keys(filters).length > 2"
      text
      tile
      class="ml-n3"
      small
      @click="expanded = !expanded"
    >
      <v-icon left>{{
        expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
      }}</v-icon
      >{{ expanded ? $t('less-filters') : $t('see-more-filters') }}</v-btn
    >
  </aside>
</template>
<script setup>
import { useRootStore } from '~/store/root';
import { useDisplay } from 'vuetify'
import data from '~/assets/generated/filters'

const { t } = useI18n()
const emit = defineEmits(['close'])
const { sm: isSmDisplay } = useDisplay()
const rootStore = useRootStore()
const props = defineProps({ type: String })

const filters = ref(data[props.type].filters)
const sorters = ref(data[props.type].sort)
const expanded = ref(false)

const showReset = computed(() => rootStore.getChildrenStore(props.type).filtersCount)
</script>
<style lang="scss">
aside {
  position: sticky;
  top: 10px;
  width: 100%;
  left: 250;
  align-self: start;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: right;
}
.search-label {
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6);
  font-family: 'Open sans', sans-serif;
  font-size: 16px;
}
</style>
