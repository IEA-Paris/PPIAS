<template>
  <v-menu>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
            <v-icon
              ><!-- mdi-{{ ['', ''][('sort', 'views')].indexOf(type) }} --></v-icon
            >
          </v-btn>
        </template>
        <span>Im A ToolTip</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-icon>
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import { sort } from '~/assets/data/lists'
export default {
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    menuType: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      items: sort,
    }
  },
  computed: {},
  mounted() {
    console.log('sort: ', sort)
  },
  methods: {},
}
</script>
<style lang="scss"></style>
