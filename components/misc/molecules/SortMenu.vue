<template>
  <v-menu v-if="Object.keys(items).length > 1" offset-y>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            size="x-large"
            variant="icon"
            tile
            v-bind="attrs"
            :class="{
              'mt-3': isXsDisplay,
            }"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon> mdi-{{ current.icon || defaultSort.icon }}</v-icon>
          </v-btn>
        </template>
        <span
          v-html="$t('sort-mode') + $t(current.text || defaultSort.text)"
        ></span>
      </v-tooltip>
    </template>
    <v-list>
      <v-subheader>{{ $t('sort-the-type-by', [$t(type)]) }} </v-subheader>
      <template v-for="(item, index) in items">
        <v-list-item
          v-if="item.text !== current.text"
          :key="index"
          @click="updateSort(item.value)"
        >
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>
<script setup>
import { useDisplay } from 'vuetify'
import { useRootStore } from '~/store/root';
import lists from '~/assets/data/lists'

const { xs: isXsDisplay } = useDisplay()
const rootStore = useRootStore()

const props = defineProps({
  type: {
    type: String,
    default: 'articles',
    required: true,
  },
})
const items = reactive(lists[props.type].sort)
const defaultSort = reactive(lists[props.type].sort[
      Object.keys(lists[props.type].sort).find(
        (item) => lists[props.type].sort[item].default === true
      )
    ])

const current = computed(() => {
  try {
    const current =
      items[
        Object.keys(items).find((item) => {
          return (
            items[item].value.join('') ===
            (rootStore.getChildrenStore(props.type).sortBy[0] || defaultSort.value[0]) +
              (rootStore.getChildrenStore(props.type).sortDesc ? 'desc' : 'asc')
          )
        })
      ] || items[Object.keys(items).find((item) => item.default)]
    return current
  } catch (error) {
    console.log('error: ', error)
    return items[Object.keys(items).find((item) => item.default)]
  }
})

const updateSort = (value) => {
  rootStore.setSort({ type: props.type, value })
}
</script>
<style lang="scss"></style>
