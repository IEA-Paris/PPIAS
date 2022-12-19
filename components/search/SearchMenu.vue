<template>
  <v-dialog fullscreen hide-overlay overflowed>
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="icon" size="x-large" class="ma-2" density="compact">
        <v-icon color="black">mdi-magnify</v-icon>
      </v-btn>
    </template>
    <template #default="{ isActive }">
      <v-card dark color="rgba(0, 0, 0, 0.97)">
        <v-app-bar color="transparent" clipped flat hide-on-scroll height="140">
          <div class="d-flex flex-column flex-grow-1">
            <div class="d-flex flex-grow-1 align-start">
              <v-img
                class="mr-2 mt-4 logo-container-white"
                src="/logo_w.png"
                contain
                max-height="120"
                max-width="120"
                style="cursor: pointer"
              ></v-img>
              <v-spacer></v-spacer>
              <v-btn
                variant="icon"
                size="x-large"
                class="ma-2 mr-2 mb-4"
                tile
                color="white"
                @click="isActive.value = false"
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
                variant="outlined"
                color="white"
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
                      @click="seeAll('articles')"
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
                      :key="index + 'articles'"
                      color="primary"
                      template
                    >
                      <ArticleSearchItem
                        :item="item"
                        @close="isActive.value = false"
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
                      @click="seeAll('media')"
                    >
                      {{
                        $t('see-all-results-articlescount', [results.mediaCount])
                      }}
                    </v-btn>
                  </v-subheader>
                  <template v-for="(item, index) in results.media">
                    <v-list-item-group
                      v-if="results.media.length"
                      :key="index + 'media'"
                      color="primary"
                      template
                    >
                      <MediaSearchItem
                        :item="item"
                        @close="isActive.value = false"
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
                      @click="seeAll('authors')"
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
                      :key="index + 'authors'"
                      color="primary"
                      template
                    >
                      <AuthorSearchItem
                        :item="item"
                        @close="isActive = false"
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
    </template>
  </v-dialog>
</template>
<script setup>
import { useRootStore } from '~/store/root';
import useSearchContent from '~/composables/utils/useSearchContent';

const { searchContent } = useSearchContent();
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const rootStore = useRootStore()
const nuxtApp = useNuxtApp()

const loading = ref(false)
const results = reactive([])
const open = ref(false)
const shouldFocus = ref(false)
const base = ref(route.path)
const searchStringRaw = ref('')
const searchInput = ref(null)

const searchString = computed({
  get() {
    return searchStringRaw.value
  },
  async set(newValue) {
    if (!rootStore.loading && !nuxtApp.loading) {
      if (!newValue) {
        results.value = {
          articles: [],
          media: [],
          authors: [],
          articlesCount: 0,
          mediaCount: 0,
          authorsCount: 0,
        }
      } else {
        searchStringRaw.value = newValue

        const resultsRaw = await searchContent(newValue)
        results.value = {
          articles: resultsRaw[0] || [],
          media: resultsRaw[1] || [],
          authors: resultsRaw[2] || [],
          articlesCount: resultsRaw[3] || 0,
          mediaCount: resultsRaw[4] || 0,
          authorsCount: resultsRaw[5] || 0,
        }
      }
    }
  },
})

const seeAll = (type) => {
  router.push({
    path: localePath(base.value),
    query: {
      search: searchString.value,
      type,
    },
  })
}

const focusSearch = () => {
  searchInput.value?.focus()
}

const clear = () => {
  shouldFocus.value = false
  open.value = false
}

const onIntersect = (entries, _observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      shouldFocus.value = true
    }
  })
}
</script>
<style scoped lang="scss">
$input-font-size: 48px;
.logo-container-white {
  border: 4px white solid;
}
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
