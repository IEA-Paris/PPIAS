<template>
  <div class="ma-6">
    <div
      v-if="!item.media || !item.media.length"
      class="headline pa-12 text-center"
    >
      {{ $t('this-article-doesnt-contain-any-media') }}
    </div>
    <v-row
      v-for="(media, index) in item.media"
      :key="index"
      class="pb-6"
      justify="center"
    >
      <v-col cols="12" md="10" lg="8" xl="6">
        <div v-if="media.caption !== item.article_title" class="text-h5">
          {{ media.caption }}
        </div>
        <Youtube
          v-if="media.type === 'youtube'"
          :yt="media.id"
          :nocontrols="false"
        ></Youtube
      ></v-col>
    </v-row>
  </div>
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
