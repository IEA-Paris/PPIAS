<template>
  <v-row justify="center">
    <v-col cols="12" md="12" lg="10" xl="10">
      <v-card>
        <v-btn plain text nuxt :to="localePath('/articles')">
          <v-icon left>mdi-chevron-left</v-icon>
          {{ $t('back') }}
        </v-btn>
        <PageTitle :text="item.article_title" class="pa-6" />

        <v-tabs background-color="transparent" color="black" class="mb-6" grow>
          <v-tab nuxt :to="localePath('/articles/' + $route.params.slug)">Article</v-tab>
          <v-tab nuxt :to="localePath('/articles/' + $route.params.slug + '/media')">Media</v-tab>
          <v-tab nuxt :to="localePath('/articles/' + $route.params.slug + '/authors')">Author(s)</v-tab>
        </v-tabs>
        <slot></slot>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
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
