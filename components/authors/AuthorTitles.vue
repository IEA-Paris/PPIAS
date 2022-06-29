<template>
  <div class="mt-12">
    <div class="text-h5">
      {{ $t('titles-and-institutions') }}
      <AuthorsBioHint></AuthorsBioHint>
    </div>
    <v-list
      v-for="(bio, index) in item.titles_and_institutions"
      :key="index"
      two-line
      class=""
    >
      <template v-if="bio.titles && bio.titles.length">
        <v-list-item
          v-for="title in bio.titles"
          :key="title"
          class="pl-0"
          three-lines
        >
          <!-- TODO add image from institution (ROR powered or smthing else) 
              <v-list-item-avatar>
          <v-icon
            :class="file.color"
            dark
            v-text="file.icon"
          ></v-icon>
        </v-list-item-avatar> -->
          <v-list-item-content>
            <v-list-item-title v-html="title"></v-list-item-title>
            <v-list-item-subtitle>{{ bio.institution }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-item v-else class="pl-0">
        <v-list-item-content>
          {{ bio.institution }}
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>
<script>
import AuthorsBioHint from './AuthorsBioHint.vue'
export default {
  components: { AuthorsBioHint },
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
