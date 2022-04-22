<template>
  <v-row justify="center" :no-gutters="$vuetify.breakpoint.mobile">
    <v-col cols="12" md="12" lg="10" xl="10">
      <v-card :flat="$vuetify.breakpoint.mobile">
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
        <PageTitle :text="item.article_title" class="pa-6 ml-3">
          <template v-if="item.authors.length">
            <v-btn
              x-large
              text
              class="mb-3 px-3 font-italic authorsBtn"
              style=""
              nuxt
              :to="'/articles/' + item.slug + '#authors'"
            >
              <ArticleAuthorsString :authors="item.authors" full />
            </v-btn>
          </template>
        </PageTitle>

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
  methods: {
    goBack() {
      this.$router.go(-1)
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
