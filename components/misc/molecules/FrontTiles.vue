<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing ml-0"
    :fluid="!$store.state.scrolled"
    :class="({ 'pl-0': filter }, $store.state.scrolled ? 'pt-6' : 'px-0 pt-0')"
  >
    <v-row
      v-for="section in Math.min(sections, Math.ceil(data.items.length / 3))"
      :key="section"
      class="transition-swing"
      :no-gutters="!$store.state.scrolled"
      :class="$store.state.scrolled ? '' : 'mx-3'"
    >
      <v-col
        cols="12"
        :sm="filter ? 12 : 6"
        md="8"
        xl="6"
        :class="{ 'pt-1 pr-1': !$store.state.scrolled }"
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
          v-bind="$attrs"
          highlighted
          :scroll="$store.state.scrolled"
        ></component>
      </v-col>
      <v-col cols="12" :sm="filter ? 12 : 6" md="4" xl="6" class="">
        <v-row :no-gutters="!$store.state.scrolled">
          <v-col
            cols="12"
            class="transition-swing"
            :class="{ 'pt-1': !$store.state.scrolled }"
          >
            <component
              :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
              v-if="data.items[(section - 1) * 3 + 1]"
              :item="data.items[(section - 1) * 3 + 1]"
              v-bind="$attrs"
              class="h500"
              :scroll="$store.state.scrolled"
            ></component>
          </v-col>
          <v-col
            cols="12"
            class="transition-swing"
            :class="{ 'pt-1': !$store.state.scrolled }"
          >
            <component
              :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
              v-if="data.items[(section - 1) * 3 + 2]"
              :item="data.items[(section - 1) * 3 + 2]"
              class="h500"
              v-bind="$attrs"
              :scroll="$store.state.scrolled"
            ></component>
          </v-col>
        </v-row>
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
