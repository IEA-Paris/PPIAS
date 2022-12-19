<template>
  <v-menu offset-y>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            tile
            icon
            v-bind="{ ...attrs, ...$attrs }"
            :class="{
              'mt-3': isXsDisplay,
            }"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon> mdi-cog</v-icon>
          </v-btn>
        </template>
        <span
          v-html="
            $t('bibliographical-style-0') + $t(rootStore.getChildrenStore('articles').style)
          "
        ></span>
      </v-tooltip>
    </template>
    <v-list>
      <v-subheader>{{ $t('bibliographical-style-0') }} </v-subheader>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="item"
        :class="{ 'font-weight-bold': rootStore.getChildrenStore('articles').style === item }"
        @click="rootStore.setStyle(item)"
      >
        <v-list-item-title>{{ $t(item) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup>
import { useRootStore } from '~/store/root';
import { useDisplay } from 'vuetify';
import lists from '~/assets/data/lists'

const rootStore = useRootStore();
const { xs: isXsDisplay } = useDisplay();
const items = reactive(lists.articles.styles)
</script>
<style lang="scss"></style>
