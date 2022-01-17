<template>
  <v-dialog v-model="$route.query.global" fullscreen hide-overlay overflowed>
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
              class="ma-2 mr-4 mb-4"
              @click="
                $router.push({
                  query: { ...$route.query, global: undefined },
                })
              "
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
                <v-subheader class="pr-0">
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-icon v-bind="attrs" small v-on="on">
                        mdi-help-circle
                      </v-icon>
                    </template>
                    <span
                      >The article search is based on their text, title,
                      authors'&nbsp;lastname or institutions</span
                    > </v-tooltip
                  >&nbsp; {{ $t('articles') }} <v-spacer></v-spacer
                  ><v-btn
                    v-if="results.articlesCount > 3"
                    small
                    text
                    nuxt
                    :to="localePath('/?search=' + searchStringRaw)"
                    @click="
                      $router.push({
                        query: { ...$route.query, global: false },
                      })
                    "
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
                    <ArticleSeachItem
                      :item="item"
                      @close="
                        $router.push({
                          query: { ...$route.query, global: false },
                        })
                      "
                    ></ArticleSeachItem>
                  </v-list-item-group>
                </template>
              </template>
              <template v-if="results.media && results.media.length">
                <v-divider></v-divider>
                <v-subheader>
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-icon v-bind="attrs" small v-on="on">
                        mdi-help-circle
                      </v-icon>
                    </template>
                    <span
                      >The media search is based on their title and the title of
                      the article they belong to</span
                    > </v-tooltip
                  >&nbsp; {{ $t('media') }}<v-spacer></v-spacer
                  ><v-btn
                    v-if="results.mediaCount > 3"
                    small
                    text
                    nuxt
                    :to="localePath('/media?search=' + searchStringRaw)"
                    @click="
                      $router.push({
                        query: { ...$route.query, global: false },
                      })
                    "
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
                      @close="
                        $router.push({
                          query: { ...$route.query, global: false },
                        })
                      "
                    ></MediaSearchItem>
                  </v-list-item-group>
                </template>
              </template>
              <template v-if="results.authors && results.authors.length">
                <v-divider></v-divider>
                <v-subheader>
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <v-icon v-bind="attrs" small v-on="on">
                        mdi-help-circle
                      </v-icon>
                    </template>
                    <span
                      >The author search is based on their lastname, titles or
                      institutions</span
                    > </v-tooltip
                  >&nbsp;{{ $t('authors') }}<v-spacer></v-spacer
                  ><v-btn
                    v-if="results.authorsCount > 3"
                    small
                    text
                    nuxt
                    :to="localePath('/authors?search=' + searchStringRaw)"
                    @click="
                      $router.push({
                        query: { ...$route.query, global: false },
                      })
                    "
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
                      @close="
                        $router.push({
                          query: { ...$route.query, global: false },
                        })
                      "
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
import AuthorSearchItem from './AuthorSearchItem.vue'
import searchContent from '~/assets/utils/searchContent'
export default {
  components: { AuthorSearchItem },
  props: {},
  data() {
    return {
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
        if (!newValue) {
          this.$router.push({
            query: { ...this.$route.query, search: undefined },
          })
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
          this.$router.push({
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
