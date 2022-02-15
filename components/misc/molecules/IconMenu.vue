<template>
  <v-menu>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
          >
            Dropdown w/ Tooltip
          </v-btn>
        </template>
        <span>Im A ToolTip</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
