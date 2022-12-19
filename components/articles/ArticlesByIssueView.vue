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
          'px-0': isXsDisplay,
        }"
        class="transition-swing"
      >
        <div v-for="issue in issues" :key="issue.title">
          <div class="text-h4">
            <!--   TODO add highlight from search -->
            {{ issue.text }}
          </div>
          <v-list :key="issue.text" two-lines>
            <template v-if="smAndDown">
              <component
                :is="
                  type.charAt(0).toUpperCase() +
                  type.slice(1) +
                  'ListItemMobile'
                "
                v-for="(item, index) in getIssueItems(issue)"
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
              v-for="(item, index) in getIssueItems(issue)"
              v-else
              v-bind="attrs"
              :key="index"
              :index="index"
              :item="item"
              highlighted
              :scroll="rootStore.scrolled"
            ></component>
          </v-list>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify';
import { useRootStore } from '~/store/root';

const attrs = useAttrs()
const { xs: isXsDisplay, smAndDown } = useDisplay();
const rootStore = useRootStore();

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
const getIssueItems = (issue) => {
  return props.data.items.filter((item) => item.issue === issue)
}
</script>
<style lang="scss">
.h500 {
  max-height: 500;
}
</style>
,
