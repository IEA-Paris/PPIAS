<template>
  <v-list-item
    nuxt
    :to="localePath('/articles/' + item.article_slug + '/media')"
    @click="$emit('close')"
  >
    <v-list-item-icon>
      <v-icon x-large class="ml-2">mdi-play-circle-outline</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ item.caption }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
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
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
