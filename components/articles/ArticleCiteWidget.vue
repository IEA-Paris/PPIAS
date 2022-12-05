<template>
  <v-card class="pa-3 mt-3 ml-4" flat>
    <v-row no-gutters>
      <v-col cols="auto" class="mr-3">
        <CiteModal
          v-if="!$route.name.startsWith('print')"
          :item="item"
          text
        ></CiteModal>
      </v-col>
      <v-col class="">
        <span
          class="cite-text text-caption pr-3 d-inline"
          v-html="toCite[style === 'APA' ? 'apa' : style]"
        ></span>
      </v-col>
      <v-col cols="auto" class="">
        <v-tooltip top>
          <template #activator="{ on }">
            <v-btn
              label
              small
              icon
              class="ml-3"
              v-on="on"
              @click="copyToClipBoard()"
            >
              <v-icon> mdi-content-copy </v-icon>
            </v-btn>
          </template>
          <span>{{ $t('misc.copyToClipboard') }}</span>
        </v-tooltip>
        <BibliographyStyleMenu small></BibliographyStyleMenu
      ></v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    toCite: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    style() {
      return this.$store.state.articles.style
    },
  },
  mounted() {},
  methods: {
    async copyToClipBoard() {
      try {
        await navigator.clipboard.writeText(
          this.toCite[this.style === 'APA' ? 'apa' : this.style].replace(
            /(<([^>]+)>)/gi,
            ''
          )
        )
      } catch (error) {
        console.log('error: ', error)
      }
    },
  },
}
</script>
<style lang="scss"></style>
