<template>
  <v-card class="pa-3 mt-3 ml-4" flat>
    <v-row no-gutters>
      <v-col class="align-self-center">
        <v-icon small>mdi-format-quote-close</v-icon>
        <span
          class="cite-text text-caption pr-3"
          v-html="toCite[style === 'APA' ? 'apa' : style]"
        ></span>
      </v-col>
      <v-col cols="auto" class="align-self-center mx-auto text-centered">
        <v-tooltip top>
          <template #activator="{ on }">
            <v-btn label small icon v-on="on" @click="copyToClipBoard()">
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
        console.log(
          'this.toCite',
          this.toCite[this.style === 'APA' ? 'apa' : this.style]
        )
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
          console.log(
            'this.toCite',
            this.toCite[this.style === 'APA' ? 'apa' : this.style]
          )
        await navigator.clipboard.writeText(
          this.toCite[this.style === 'APA' ? 'apa' : this.style]
        )
      } catch (error) {
        console.log('error: ', error)
      }
    },
  },
}
</script>
<style lang="scss"></style>
