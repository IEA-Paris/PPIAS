<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing mb-12"
    :fluid="!$store.state.scrolled"
    :class="{ 'py-0': !$store.state.scrolled, 'pl-0': filter }"
  >
    <v-row
      class="transition-swing"
      :no-gutters="!$store.state.scrolled"
      :class="[
        $store.state.scrolled
          ? ''
          : $vuetify.breakpoint.mobile
          ? 'mx-2'
          : 'mx-6',
      ]"
    >
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-col cols="12" sm="6" md="4" class="transition-swing">
          <component
            :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
            v-for="(item, index) in data.items.filter(
              (item, index) =>
                !!($vuetify.breakpoint.mdAndUp ? index % 3 === 0 : !(index % 2))
            )"
            :key="index"
            :index="index"
            :item="item"
            :scroll="$store.state.scrolled"
            class="ml-0"
          ></component>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="transition-swing">
          <component
            :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
            v-for="(item, index) in data.items.filter(
              (item, index) =>
                !!($vuetify.breakpoint.mdAndUp
                  ? (index - 1) % 3 === 0
                  : index % 2)
            )"
            :key="'x' + index"
            :index="index"
            :item="item"
            :scroll="$store.state.scrolled"
          ></component>
        </v-col>
        <v-col
          v-if="$vuetify.breakpoint.mdAndUp"
          cols="12"
          sm="6"
          md="4"
          class="transition-swing"
        >
          <component
            :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
            v-for="(item, index) in data.items.filter(
              (item, index) => !!((index - 2) % 3 === 0)
            )"
            :key="'y' + index"
            :index="index"
            :item="item"
            :scroll="$store.state.scrolled"
          ></component>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12" class="transition-swing">
          <template v-for="(item, index) in data.items">
            <component
              :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
              v-if="item"
              :key="index"
              :item="item"
              v-bind="$attrs"
              :scroll="$store.state.scrolled"
            ></component>
          </template>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Object,
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
  mounted() {},
  methods: {
    onScroll() {
      this.$store.commit('setScrolled')
    },
  },
}
</script>
<style lang="scss"></style>
