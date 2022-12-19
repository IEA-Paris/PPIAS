<template>
  <v-menu v-if="Object.keys(items).length > 1" offset-y>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            size="x-large"
            tile
            variant="icon"
            v-bind="attrs"
            class="mr-3"
            :class="{
              'mt-3': isXsDisplay,
            }"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon> mdi-{{ current.icon || defaultView.icon }}</v-icon>
          </v-btn>
        </template>
        <span
          v-html="
            $t('view-mode') + $t('view-' + (current.name || defaultView.name))
          "
        ></span>
      </v-tooltip>
    </template>
    <v-list>
      <v-subheader>{{ $t('select-a-view') }}</v-subheader>
      <template v-for="(item, index) in items">
        <v-list-item
          v-if="item.name !== current.name"
          :key="index"
          @click="updateView(item.name)"
        >
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('view-' + item.name) }}</v-list-item-title>
        </v-list-item>
        <div
          v-else-if="index === items.length"
          :key="index + item.name"
          class="ma-3"
        >
          {{ $t('no-other-mode-available') }}
        </div>
      </template>
    </v-list>
  </v-menu>
</template>
<script setup>
import lists from '~/assets/data/lists'
import { useDisplay } from 'vuetify'
import { useRootStore } from '~/store/root';

const { xs: isXsDisplay } = useDisplay()
const rootStore = useRootStore()

const props = defineProps({ type: String })
const items = reactive(lists[props.type].views)
const defaultSort = reactive(lists[props.type].views[
          Object.keys(lists[props.type].views).find(
            (item) => lists[props.type].views[item].default === true
          )
        ])

const current = computed(() => (
    items.find(
        (item) => item.name === rootStore.getChildrenStore(props.type).sort
      ) || defaultSort
    ))

const updateSort = async (value) => {
  rootStore.updateSort({ value, type: props.type })
}
</script>
<style lang="scss"></style>
