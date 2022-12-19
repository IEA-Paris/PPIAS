<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing"
    :fluid="!rootStore.scrolled"
    :class="
      ({ 'pl-0 ml-3': props.filter }, rootStore.scrolled ? 'pt-4' : 'px-0 pt-0')
    "
  >
    <v-row
      v-for="(issue, index) in data.issues"
      :key="index"
      class="transition-swing"
      :no-gutters="!rootStore.scrolled"
      :class="rootStore.scrolled ? '' : 'mx-3'"
    >
      <v-col cols="12" class="mt-6">
        <div class="d-flex">
          <div class="issue-label">
            {{ issue }}
          </div>
          <v-spacer></v-spacer>
          <v-btn text :to="localePath('/issue/' + issue)">
            {{ $t('see-the-complete-issue') }}
          </v-btn>
        </div>
        <v-divider></v-divider>
      </v-col>
      <v-col
        v-for="item in getItemsPerIssue(issue)"
        :key="item._path"
        cols="12"
        :class="{ 'pt-1 pr-1': !rootStore.scrolled }"
        class="transition-swing"
      >
        <template v-if="smAndDown">
          <component
            :is="
              type.charAt(0).toUpperCase() + type.slice(1) + 'ListItemMobile'
            "
            v-bind="attrs"
            :key="index"
            :index="index"
            :item="item"
            highlighted
            :scroll="rootStore.scrolled"
            :filter="props.filter"
          ></component>
        </template>
        <component
          :is="type.charAt(0).toUpperCase() + type.slice(1) + 'ListItem'"
          v-else
          v-bind="attrs"
          :key="index"
          :index="index"
          :item="item"
          highlighted
          :scroll="rootStore.scrolled"
        ></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify';
import { useRootStore } from '~/store/root';

const { smAndDown } = useDisplay()
const attrs = useAttrs()
const props = defineProps({data: true, filter: false, type: true})
const rootStore = useRootStore()
const { data } = toRefs(props)

const onScroll = () => {
  return rootStore.setScrolled()
}

const getItemsPerIssue = (issue) => {
  return data.value.items.filter((item) => item.issue.slice(15, -3) === issue)
}
</script>
<style lang="scss">
.h500 {
  max-height: 500;
}
.issue-label {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 2.5rem;
  letter-spacing: initial;
  font-family: 'Bodoni Moda', sans-serif !important;
}
</style>
