<template>
  <v-menu offset-y>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            x-large
            tile
            icon
            v-bind="attrs"
            :class="{
              'mt-3': $vuetify.breakpoint.xs,
            }"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon> mdi-cog</v-icon>
          </v-btn>
        </template>
        <span
          v-html="
            $t('bibliographical-style-0') + $t($store.state.articles.style)
          "
        ></span>
      </v-tooltip>
    </template>
    <v-list>
      <v-subheader>{{ $t('bibliographical-style-0') }} </v-subheader>
      <template v-for="(item, index) in items">
        <v-list-item :key="index" @click="$store.commit('setStyle', item)">
          <v-list-item-title>{{ $t(item) }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>
<script>
import lists from '~/assets/data/lists'
export default {
  props: {},
  data() {
    return {
      items: lists.articles.styles,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
