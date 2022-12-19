<template>
  <div class="d-flex ml-auto">
    <v-expand-x-transition>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            v-show="!expand"
            text
            tile
            small
            class="py-7 px-6"
            :class="mdAndUp ? 'text-h4' : 'text-h6'"
            nuxt
            depressed
            v-bind="attrs"
            v-on="on"
            @click="showInput()"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <span>Search</span>
      </v-tooltip>
    </v-expand-x-transition>
    <v-expand-x-transition>
      <v-text-field
        v-show="expand"
        ref="search"
        v-model="searchString"
        height="40"
        :style="'max-width:' + (expand ? '400px' : '0px') + '; '"
        placeholder="Search"
        outlined
        prepend-inner-icon="mdi-magnify"
        :color="theme.themes.light.colors.primary"
        hide-details
        clearable
      />
    </v-expand-x-transition>
  </div>
</template>
<script setup>
import { useDisplay, useTheme } from 'vuetify'

const { mdAndUp } = useDisplay()
const theme = useTheme()

const search = ref(null);
const props = defineProps({ type: String })
const searchString = computed({
  get() {
    return rootStore.getChildrenStore(props.type).searchString
  },
  set(search) {
    rootStore.updateSearch({type: props.type, search})
  },
})

const expand = computed(() => searchString.value.length > 0)

const showInput = () => {
  expand.value = true
  $nextTick(() => {
    search.focus()
  })
}

const focusInput = () => {
  search.focus()
}

const onClickOutside = () => {
  expand.value = false
}
</script>
<style lang="scss"></style>
