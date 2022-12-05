<template>
  <v-row justify="center" :no-gutters="$vuetify.breakpoint.mobile">
    <v-col cols="12" md="12" lg="10" xl="10">
      <v-card :flat="$vuetify.breakpoint.smAndDown">
        <div class="d-flex">
          <v-btn tile text nuxt small exact class="py-7" @click="goBack">
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
                :href="
                  item.custom_pdf
                    ? item.custom_pdf
                    : '/pdfs/' + item.slug + '.pdf'
                "
                target="_blank"
                :title="item.post_title"
                small
                v-on="on"
              >
                <v-icon>mdi-download</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('download-this-article-as-a-pdf-file') }}</span>
          </v-tooltip>
          <CiteModal :item="item" />
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
        <div class="d-flex align-center flex-column">
          <div
            class="page-title"
            :class="$store.state.scrolled ? 'mb-9' : 'mb-6'"
          >
            {{ item.article_title }}
          </div>
          <client-only>
            <template
              v-if="item.authors.length"
              class="text-body-1 mt-3 d-flex align-left"
            >
              <v-divider></v-divider>
              <v-btn
                x-large
                text
                class="mb-3 px-3 font-italic authorsBtn"
                style=""
                nuxt
                :to="'/articles/' + item.slug + '#authors'"
                v-html="formatAuthorsProxy()"
              >
              </v-btn>
              <v-divider></v-divider
              ><ArticleCiteWidget
                :to-cite="item.toCite"
                :item="item"
              ></ArticleCiteWidget> </template
          ></client-only>
          <!--     <v-divider style="width: 120px"></v-divider>
    <v-divider style="width: 120px" class="mt-1"></v-divider> -->
        </div>

        <slot></slot>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { formatAuthors, highlight } from '~/assets/utils/transforms'
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
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    formatAuthorsProxy() {
      return highlight(
        formatAuthors(this.item.authors, this.$i18n.$t, false),
        this.$store.state.articles.search || ''
      )
    },
  },
}
</script>
<style lang="scss">
.authorsBtn {
  text-transform: none !important;
}
.authorsBtn .v-btn__content {
  width: 500px;
  max-width: 100vw;
  line-height: 1.8rem;
  text-align: center;
  white-space: normal;
}
</style>
