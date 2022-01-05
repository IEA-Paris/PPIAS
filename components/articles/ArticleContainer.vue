<template>
  <v-row justify="center">
    <v-col cols="12" md="12" lg="10" xl="10">
      <v-card>
        <div class="d-flex">
          <v-btn plain text nuxt :to="localePath('/')" small>
            <v-icon left>mdi-chevron-left</v-icon>
            {{ $t('back') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                text
                class="py-7"
                tile
                v-bind="attrs"
                nuxt
                :href="'/articles/' + item.slug"
                target="_blank"
                :title="item.post_title"
                small
                v-on="on"
              >
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </template>
            <span>Open in a new tab</span>
          </v-tooltip>
        </div>
        <PageTitle :text="item.article_title" class="pa-6">
          <template v-if="item.authors.length">
            <v-btn
              large
              text
              class="mb-3 px-3 font-italic"
              style="text-transform: none !important"
              nuxt
              :to="'/articles/' + item.slug + '/authors'"
            >
              <ArticleAuthorsString :authors="item.authors" />
            </v-btn>
          </template>
        </PageTitle>

        <v-tabs :value="$route.path" background-color="transparent" color="black" class="mb-6" grow>
          <v-tab exact nuxt :to="localePath('/articles/' + $route.params.slug + '/about')">About</v-tab>
          <v-tab exact nuxt :to="localePath('/articles/' + $route.params.slug)">Article</v-tab>
          <v-tab exact nuxt :to="localePath('/articles/' + $route.params.slug + '/media')">Media</v-tab>
          <v-tab exact nuxt :to="localePath('/articles/' + $route.params.slug + '/authors')">Author(s)</v-tab>
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
