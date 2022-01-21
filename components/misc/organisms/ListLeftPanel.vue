<template>
  <div>
    <v-row no-gutters class="mt-n12">
      <v-col cols="12" class="d-flex">
        <div class="sidebtn">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                tile
                outlined
                text
                v-bind="attrs"
                class="pa-7"
                @click="filter = !filter"
                v-on="on"
              >
                <v-icon :left="!filter">
                  {{ filter ? 'mdi-chevron-left' : 'mdi-chevron-right' }}
                </v-icon>
                {{ filter ? '' : $t('filters') }}
              </v-btn>
            </template>
            <span
              v-html="
                filter ? $t('hide-the-left-panel') : $t('show-the-left-panel')
              "
            ></span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row
      class="transition-swing flex-row-reverse d-flex"
      :fluid="filter"
      :class="{ 'justify-center': $vuetify.breakpoint.lgAndUp }"
    >
      <v-col
        :cols="filter ? 10 : 12"
        :xl="filter ? 8 : 10"
        :lg="filter ? 9 : 11"
        :md="filter ? 9 : 12"
        :sm="filter ? 7 : 12"
        class="transition-swing pt-0"
      >
        <v-data-iterator
          :loading="$nuxt.loading"
          :items="items"
          :footer-props="{ itemsPerPageOptions: [5, 10, 20, 50, 100] }"
          :server-items-length="total"
          :options.sync="options"
          hide-default-footer
          @update:page="$vuetify.goTo(0)"
        >
          <template #header>
            <v-container
              class="transition-swing py-0"
              :fluid="!$store.state.scrolled"
              :class="{ '': !$store.state.scrolled, 'pl-0': filter }"
            >
              <v-row
                class="transition-swing"
                :no-gutters="!$store.state.scrolled"
                :class="[
                  $store.state.scrolled
                    ? 'mb-0'
                    : $vuetify.breakpoint.mobile
                    ? 'mx-2 '
                    : 'mx-6 ',
                  ,
                ]"
              >
                <v-col cols="12 ">
                  <div class="mr-4 text-subtitle-1 grey--text">
                    <template v-if="$route.query && $route.query.search">
                      Searching for "{{ $route.query && $route.query.search }}"
                    </template>
                    {{
                      $tc('total-' + type, total) +
                      ' - ' +
                      $t('page-current-of-total', {
                        current: options.page,
                        total: numberOfPages,
                      })
                    }}
                  </div>
                  <v-text-field
                    v-model="search"
                    :placeholder="$t('search')"
                    prepend-inner-icon="mdi-magnify"
                    single-line
                    :loading="$nuxt.loading"
                    class="transition-swing"
                    outlined
                    hide-details
                    :dense="$vuetify.breakpoint.smAndDown"
                    :disabled="$nuxt.loading"
                    clearable
                    style="min-width: 150px"
                    @click:clear="search = null"
                  >
                    <template v-if="!search" #label>
                      <div class="searchLabel">{{ $t('search') }}</div>
                    </template></v-text-field
                  ></v-col
                ></v-row
              ></v-container
            >
          </template>
          <template #loading>
            <v-progress-linear
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
            <v-container style="height: 400px">
              <v-row
                class="fill-height"
                align-content="center"
                justify="center"
              >
                <v-col align="center" cols="12">
                  <v-img src="/loading.gif" height="250" width="250"></v-img>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template #default="props">
            <FrontTiles
              v-if="tiles"
              :data="props"
              :filter="filter"
              :sections="Math.ceil(options.itemsPerPage / 3)"
              :type="type"
            ></FrontTiles>
            <RegularList
              v-else
              :data="props"
              :filter="filter"
              :type="type"
            ></RegularList>
          </template>

          <template #no-data>
            <div width="100%">
              {{ $t('no-result-found') }}
            </div>
          </template>
          <template #no-result>
            <template v-if="!activeFiltersCounter">
              <div class="my-3" width="100%">
                {{ $t('no-result-found') }}
              </div>
            </template>
            <template v-else>
              <div width="100%">
                {{ $t('no-result-matching-your-filters') }}
                <br />
                <v-btn
                  v-if="activeFiltersCounter"
                  outlined
                  small
                  color="white"
                  class="ma-3"
                  @click="
                    $router.push({ query: {} })
                    updatePage(1)
                  "
                >
                  <v-icon left>mdi-refresh</v-icon>
                  {{ $t('reset-filters') }}
                </v-btn>
              </div>
            </template>
          </template>
          <template #footer>
            <v-container>
              <v-row
                :no-gutters="layout.nogutters"
                justify="center"
                align="center"
              >
                <v-sheet class="d-flex align-center">
                  <span class="grey--text px-3">{{
                    $t('items-per-page')
                  }}</span>
                  <v-select
                    v-model="options.itemsPerPage"
                    class="perPageSelect"
                    solo
                    outlined
                    flat
                    dense
                    :items="options.itemsPerPageArray"
                    hide-details
                    @change="updatePage(1)"
                  ></v-select>
                </v-sheet>

                <v-spacer></v-spacer>

                <div v-if="numberOfPages > 1" class="text-center">
                  <v-pagination
                    total-visible="5"
                    :v-model="options.page"
                    color="black"
                    large
                    :value="+$route.query.page || 1"
                    :length="numberOfPages"
                    @input="updatePage($event)"
                  ></v-pagination>
                </div>
                <v-spacer></v-spacer>

                <span class="mr-4 grey--text">
                  {{
                    $t('page-current-of-total', {
                      current: options.page,
                      total: numberOfPages,
                    })
                  }}
                </span>
              </v-row>
            </v-container>
          </template>
        </v-data-iterator>
      </v-col>
      <v-col
        v-show="filter"
        :cols="filter ? 2 : 1"
        :xl="filter ? 2 : 1"
        :lg="filter ? 3 : 1"
        :md="filter ? 3 : 1"
        :sm="filter ? 5 : 1"
        class="transition-swing filter-column pt-0"
      >
        <div class="overline">
          <v-icon x-small>mdi-filter</v-icon>
          {{ $t('filters') }}
          <Filters :type="type" :loading="loading" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import debounce from '~/assets/utils/debounce'
import getContent from '~/assets/utils/getContent'
export default {
  props: {
    addBtn: {
      type: Boolean,
      required: false,
      default: false,
    },
    tiles: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      default: '',
      required: true,
    },
    layout: {
      type: Object,
      required: true,
      default: () => {
        return {
          cols: 12,
          xl: 12,
        }
      },
    },
    pagination: {
      type: Object,
      required: false,
      default: () => {
        return {
          itemsPerPage: 9,
          page: 1,
          sortBy: [],
          sortDesc: [true],
          itemsPerPageArray: [9, 12, 16],
        }
      },
    },
    addButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      mobile: this.$vuetify.breakpoint.mobile,
      filter: false,
      options: this.pagination,
      numberOfPages: 0,
      total: 0,
      items: [],
      loading: false,
      rawSearch: this.$route?.query?.search || '',
    }
  },
  async fetch() {
    // TODO: FIX/INVEsTIGUATE> looks like mobile is not detected correctly
    if (!this.$route.query.search) {
      this.search = null
    } else if (!this.loading) {
      this.loading = true
      const rst = await getContent(
        this.type,
        this.$content,
        this.$route.query,
        this.search,
        true,
        this.mobile,
        this.options.itemsPerPage
      )
      console.log('rst: ', rst)
      if (rst) {
        this.total = rst.total
        this.numberOfPages = rst.numberOfPages
        this.pinnedItem = rst.pinnedItem
        this.items = rst.items
      } else {
        this.total = 0
        this.numberOfPages = 1
        this.pinnedItem = false
        this.items = []
      }
      this.loading = false
    }
  },
  computed: {
    search: {
      get() {
        return this.rawSearch
      },
      set(value) {
        this.$router.replace({
          query: { ...this.$route.query, search: value },
        })
        this.rawSearch = value
      },
    },
  },
  watch: {
    '$route.query': '$fetch',
    'options.itemsPerPage': '$fetch',
  },
  watchQuery: true,
  mounted() {},
  updated() {},
  methods: {
    async updatePage(page) {
      await this.$router.push({
        query: { ...this.$route.query, page },
      })
      this.options.page = +page
    },
  },
}
</script>
<style lang="scss">
.sidebtn {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 4;
  align-self: flex-start;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  overflow: hidden;
  padding-bottom: 10px;
}
.filter-column {
  outline: 1px dotted ButtonText;
}
.perPageSelect {
  margin-top: 0;
  padding-top: 0;
}
.searchLabel {
  text-transform: uppercase !important;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6) !important;
}
</style>
