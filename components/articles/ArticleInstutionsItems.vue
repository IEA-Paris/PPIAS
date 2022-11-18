<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon>mdi-domain</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        <v-list-item-subtitle
          v-for="(institution, index) in institutions"
          :key="index"
          v-html="institution"
        ></v-list-item-subtitle>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: 'ArticleInstutionsItems',
  props: {
    institutions: {
      required: true,
      type: Array,
    },
  },
}
</script>
<style lang="scss"></style>
