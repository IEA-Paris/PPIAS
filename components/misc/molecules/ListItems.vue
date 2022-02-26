<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing"
    :fluid="!$store.state.scrolled"
    :class="{ 'py-0': !$store.state.scrolled, 'pl-0': filter }"
  >
    <v-row
      class="transition-swing"
      justify="center"
      :no-gutters="!$store.state.scrolled"
      :class="[
        $store.state.scrolled
          ? ''
          : $vuetify.breakpoint.mobile
          ? 'mx-1'
          : 'mx-6',
        ,
      ]"
    >
      <v-col
        cols="12"
        :class="{ 'pt-1 pr-1': !$store.state.scrolled }"
        class="transition-swing"
      >
        <v-list two-lines>
          <template v-if="$vuetify.breakpoint.smAndDown">
            <component
              :is="
                type.charAt(0).toUpperCase() + type.slice(1) + 'ListItemMobile'
              "
              v-for="(item, index) in data.items"
              v-bind="$attrs"
              :key="index"
              :item="item"
              highlighted
              :scroll="$store.state.scrolled"
              :filter="filter"
            ></component>
          </template>
          <component
            :is="type.charAt(0).toUpperCase() + type.slice(1) + 'ListItem'"
            v-for="(item, index) in data.items"
            v-else
            v-bind="$attrs"
            :key="index"
            :item="item"
            highlighted
            :scroll="$store.state.scrolled"
          ></component>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
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
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    onScroll() {
      this.$store.commit('setScrolled')
    },
  },
}
</script>
<style lang="scss">
.h500 {
  max-height: 500;
}
</style>
,
