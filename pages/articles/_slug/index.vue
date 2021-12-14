<template>
  <v-row justify="center">
    <v-col cols="12" md="12" lg="10" xl="10">
      <v-card>
        <v-btn v-intersect="onIntersect" text small>
          <v-icon left>mdi-chevron-left</v-icon>
          {{ $t('back') }}
        </v-btn>
        <PageTitle :text="item[0].article_title" class="pa-6" />
        <v-tabs background-color="transparent" color="black" class="mb-6" grow>
          <v-tab nuxt :to="localePath('/articles/' + $route.params.slug)">Article</v-tab>
          <v-tab nuxt :to="localePath('/articles/' + $route.params.slug + '/media')">Media</v-tab>
          <v-tab nuxt :to="localePath('/articles/' + $route.params.slug + '/authors')">Author(s)</v-tab>
        </v-tabs>
        <!-- 
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card color="basil" flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->

        <Article v-if="item.length" :item="item[0]" :title="show"></Article>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {},
  async asyncData({ $content, params }) {
    console.log(params.slug.replace('%20', ' '))
    const item = await $content('articles')
      .where({
        slug: params.slug.replace('%20', ' '),
      })
      .fetch()
    console.log(item)
    return {
      item,
    }
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.show = entries[0].isIntersecting
    },
  },
}
</script>
<style lang="scss"></style>
