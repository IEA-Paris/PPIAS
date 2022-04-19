<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing"
    :fluid="!$store.state.scrolled"
    :class="
      ({ 'pl-0 ml-3': filter }, $store.state.scrolled ? 'pt-4' : 'px-0 pt-0')
    "
  >
    <v-row
      v-for="(issue, index) in data.issues"
      :key="index"
      class="transition-swing pt-4"
      :no-gutters="!$store.state.scrolled"
      :class="$store.state.scrolled ? '' : 'mx-3'"
    >
      <v-col cols="12" class="text-h5">
        {{ issue }}
        <div class="text-overline text-muted">some random date</div>
        <v-divider></v-divider>
      </v-col>
      <v-col
        v-for="item in getItemsPerIssue(issue)"
        :key="item.slug"
        cols="12"
        :class="{ 'pt-1 pr-1': !$store.state.scrolled }"
        class="transition-swing"
      >
        <template v-if="$vuetify.breakpoint.smAndDown">
          <component
            :is="
              type.charAt(0).toUpperCase() + type.slice(1) + 'ListItemMobile'
            "
            v-bind="$attrs"
            :key="index"
            :index="index"
            :item="item"
            highlighted
            :scroll="$store.state.scrolled"
            :filter="filter"
          ></component>
        </template>
        <component
          :is="type.charAt(0).toUpperCase() + type.slice(1) + 'ListItem'"
          v-else
          v-bind="$attrs"
          :key="index"
          :index="index"
          :item="item"
          highlighted
          :scroll="$store.state.scrolled"
        ></component>
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
    getItemsPerIssue(issue) {
      return this.data.items.filter(
        (item) => item.issue.slice(15, -3) === issue
      )
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
