<template>
  <v-dialog v-model="open" fullscreen hide-overlay overflowed>
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon x-large class="ma-2" tile v-on="on">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <v-card dark color="rgba(0, 0, 0, 0.97)">
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
            <v-btn
              icon
              text
              x-large
              tile
              class="ma-2 mr-4 mb-4"
              @click="open = false"
            >
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
              v-intersect="onIntersect"
              name="search"
              hide-details
              clearable
              outlined
              prepend-inner-icon="mdi-magnify"
              class="search"
              @keydown.esc.prevent="clear()"
              @click:clear="searchString = ''"
            ></v-text-field>

            <v-list color="transparent">
              <template v-if="results.articles && results.articles.length">
                <v-subheader class="pr-0">
                  <ArticlesSearchHint></ArticlesSearchHint>&nbsp;
                  {{ $t('articles') }} <v-spacer></v-spacer
                  ><v-btn
                    v-if="results.articlesCount > 3"
                    small
                    text
                    nuxt
                    :to="localePath('/?search=' + searchStringRaw)"
                    @click="open = false"
                  >
                    {{
                      $t('see-all-results-articlescount', [
                        results.articlesCount,
                      ])
                    }}
                  </v-btn>
                </v-subheader>
                <template v-for="(item, index) in results.articles">
                  <v-list-item-group
                    v-if="results.articles.length"
                    :key="item.article_title + index"
                    color="primary"
                    template
                  >
                    <ArticleSearchItem
                      :item="item"
                      @close="open = false"
                    ></ArticleSearchItem>
                  </v-list-item-group>
                </template>
              </template>
              <template v-if="results.media && results.media.length">
                <v-divider></v-divider>
                <v-subheader>
                  <MediaSearchHint></MediaSearchHint> &nbsp; {{ $t('media')
                  }}<v-spacer></v-spacer
                  ><v-btn
                    v-if="results.mediaCount > 3"
                    small
                    text
                    nuxt
                    :to="localePath('/media?search=' + searchStringRaw)"
                    @click="open = false"
                  >
                    {{
                      $t('see-all-results-articlescount', [results.mediaCount])
                    }}
                  </v-btn>
                </v-subheader>
                <template v-for="(item, index) in results.media">
                  <v-list-item-group
                    v-if="results.media.length"
                    :key="item.caption + index"
                    color="primary"
                    template
                  >
                    <MediaSearchItem
                      :item="item"
                      @close="open = false"
                    ></MediaSearchItem>
                  </v-list-item-group>
                </template>
              </template>
              <template v-if="results.authors && results.authors.length">
                <v-divider></v-divider>
                <v-subheader>
                  <AuthorsSearchHint></AuthorsSearchHint>&nbsp;{{ $t('authors')
                  }}<v-spacer></v-spacer
                  ><v-btn
                    v-if="results.authorsCount > 3"
                    small
                    text
                    nuxt
                    :to="localePath('/authors?search=' + searchStringRaw)"
                    @click="open = false"
                  >
                    {{
                      $t('see-all-results-articlescount', [
                        results.authorsCount,
                      ])
                    }}
                  </v-btn>
                </v-subheader>
                <template v-for="(item, index) in results.authors">
                  <v-list-item-group
                    v-if="results.authors.length"
                    :key="index"
                    color="primary"
                    template
                  >
                    <AuthorSearchItem
                      :item="item"
                      @close="open = false"
                    ></AuthorSearchItem>
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
      loading: false,
      results: [],
      open: this.searchString,
      shouldFocus: false,
      base: this.$route.path,
    }
  },
  computed: {
    searchString: {
      get() {
        return this.searchStringRaw
      },
      async set(newValue) {
        if (!this.$wait.any) {
          if (!newValue) {
            console.log('pushin no new val')

            this.results = {
              articles: [],
              media: [],
              authors: [],
              articlesCount: 0,
              mediaCount: 0,
              authorsCount: 0,
            }
          } else {
            this.searchStringRaw = newValue
            this.$router.replace({
              query: { ...this.$route.query, search: newValue },
            })
            const resultsRaw = await searchContent(this.$content, newValue)
            this.results = {
              articles: resultsRaw[0] || [],
              media: resultsRaw[1] || [],
              authors: resultsRaw[2] || [],
              articlesCount: resultsRaw[3].length || 0,
              mediaCount: resultsRaw[4].length || 0,
              authorsCount: resultsRaw[5].length || 0,
            }
          }
        }
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
      this.shouldFocus = false
      this.open = false
      this.$store.dispatch(this.type + '/updateSearch', undefined)
    },
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.shouldFocus = entries[0].isIntersecting
      if (this.shouldFocus) {
        this.$refs?.searchInput?.focus()
      }
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
