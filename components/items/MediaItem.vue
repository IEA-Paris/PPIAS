<template>
  <v-card
    id="articleBox"
    ref="articleBox"
    :width="$vuetify.breakpoint.mdAndUp ? '' : '100%'"
    height="100%"
    class="d-flex flex-column align-center justify-center transition-swing"
    raised
    min-height="300px"
    nuxt
    :to="localePath('/articles/' + item.article_slug + '/media')"
  >
    <YoutubeThumbnail
      v-if="item.id && item.id.length"
      :item="{ ...item, yt: item.id }"
    >
      <template #categories>
        <ArticleCategories :item="item" />
      </template>
      <template #caption>
        {{ item.caption }}
      </template>
      <template #date>
        <div class="d-flex mx-1">
          {{
            new Date(item.date).toLocaleDateString('en-GB', {
              // you can use undefined as first argument
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
          }}
        </div>
      </template>
    </YoutubeThumbnail>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      size: 250,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
