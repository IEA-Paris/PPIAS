<template>
  <v-dialog v-model="open" fullscreen hide-overlay>
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon x-large class="ma-2" tile v-on="on">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <v-card dark color="black">
      <v-app-bar
        color="transparent"
        clipped
        flat
        hide-on-scroll
        :height="!$store.state.scrolled ? '180' : '120'"
      >
        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex flex-grow-1 align-center">
            <Logo color="#FFF" />
            <v-spacer></v-spacer>
            <v-btn icon x-large class="ma-2 mr-4 mb-4" @click="open = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-app-bar>
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col
            cols="12"
            md="9"
            lg="6"
            class="d-flex justify-center flex-column"
          >
            <PageTitle :text="$t('search')"></PageTitle>
            <v-text-field
              id="search"
              ref="searchInput"
              v-model="searchString"
              name="search"
              hide-details
              clearable
              outlined
              prepend-inner-icon="mdi-magnify"
              class="search"
              @keydown.esc.prevent="clear()"
              @click:clear="clear()"
            ></v-text-field>

            <v-list color="transparent">
              <template v-if="results.articles && results.articles.length">
                <v-subheader>{{ $t('articles') }}</v-subheader>
                <template v-for="(item, index) in results.articles">
                  <v-list-item-group
                    v-if="results.articles.length"
                    :key="index"
                    color="primary"
                    template
                  >
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-items</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.article_title }}
                        </v-list-item-title>
                        <v-list-item-subtitle>subTitle</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </template>
              </template>
              <template v-if="results.media && results.media.length">
                <v-subheader>{{ $t('media') }}</v-subheader>
                <template v-for="(item, index) in results.media">
                  <v-list-item-group
                    v-if="results.media.length"
                    :key="index"
                    color="primary"
                    template
                  >
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-media</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.caption }}
                        </v-list-item-title>
                        <v-list-item-subtitle>subTitle</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </template>
              </template>
              <template v-if="results.authors && results.authors.length">
                <v-subheader>{{ $t('authors') }}</v-subheader>
                <template v-for="(item, index) in results.authors">
                  <v-list-item-group
                    v-if="results.authors.length"
                    :key="index"
                    color="primary"
                    template
                  >
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-items</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.firstname + ' ' + item.lastname }}
                        </v-list-item-title>
                        <v-list-item-subtitle>subTitle</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </template>
              </template>
            </v-list>

            <v-progress-circular
              v-if="loading"
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import searchContent from '~/assets/utils/searchContent'
export default {
  props: {},
  data() {
    return {
      open: this.$route.query.search,
      searchStringRaw: this.$route.query.search || '',
      loading: false,
      results: [],
    }
  },
  computed: {
    searchString: {
      get() {
        return this.searchStringRaw
      },
      async set(newValue) {
        this.loading = true
        console.log('newValue: ', newValue)
        if (!newValue) {
          this.$router.push({
            query: { ...this.$route.query, search: undefined },
          })
          this.results = {
            articles: [],
            media: [],
            authors: [],
          }
        } else {
          this.searchStringRaw = newValue
          this.$router.push({
            query: { ...this.$route.query, search: newValue },
          })
          const resultsRaw = await searchContent(this.$content, newValue)
          this.results = {
            articles: resultsRaw[0] || [],
            media: resultsRaw[1] || [],
            authors: resultsRaw[2] || [],
          }
        }

        this.loading = false
      },
    },
  },
  mounted() {
    if (this.$route.query.search) {
      this.searchString = this.$route.query.search
    }
    this.focusSearch()
  },
  methods: {
    focusSearch() {
      // Focus the component, but we have to wait
      // so that it will be showing first.
      this.$nextTick(() => {
        this.$refs?.searchInput?.focus()
      })
    },

    clear() {
      this.$router.push({ query: { ...this.$route.query, search: undefined } })
    },
  },
}
</script>
<style scoped lang="scss">
$input-font-size: 48px;
.menu-logo {
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: color, background, text-shadow;
  transition: all 0.5s ease;
  transform-origin: left top;
  width: 600px !important;
  margin-left: 40px;
  margin-bottom: 25px;
}
#search {
  height: 120px;
  font-size: 48pt;
}
.search label[for] {
  height: 120px;
  font-size: 48pt;
}
</style>
