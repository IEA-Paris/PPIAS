<template>
  <div class="d-flex flex-column">
    <FiltersDialog
      v-if="$vuetify.breakpoint.xs"
      v-model="filter"
      :type="type"
      :filter-count="filtersCount"
    />
    <div
      v-if="$vuetify.breakpoint.smAndUp"
      :class="{ sidebtn: !filter }"
      class="d-inline-flex"
    >
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
              {{ filter ? 'mdi-chevron-left' : 'mdi-filter' }}
            </v-icon>
            {{ filter ? '' : $t('filters') }}
          </v-btn>
        </template>
        <span v-html="filter ? $t('hide-filters') : $t('show-filters')"></span>
      </v-tooltip>
    </div>
    <div class="d-inline-flex">
      <v-spacer></v-spacer>
      <ViewMenu :type="type"></ViewMenu>
      <SortMenu :type="type"></SortMenu>
    </div>

    <!--   <IconMenu menu-type="view" :type="type"></IconMenu> -->
    <v-row
      class="transition-swing d-flex"
      :fluid="filter"
      :class="{
        'justify-center': $vuetify.breakpoint.lgAndUp,
        'flex-row-reverse': $vuetify.breakpoint.smAndUp,
      }"
    >
      <v-col
        cols="12"
        :xl="filter ? 8 : 10"
        :lg="filter ? 9 : 11"
        :md="filter ? 9 : 12"
        :sm="filter ? 7 : 12"
        class="transition-swing pt-0"
      >
        <v-data-iterator
          :loading="$wait.any"
          :items="items"
          :footer-props="{ itemsPerPageOptions: [5, 10, 20, 50, 100] }"
          :page="page"
          hide-default-footer
          :options="options"
          :dense="$vuetify.breakpoint.mdAndDown"
          @update:page="$vuetify.goTo(0)"
        >
          <template #header>
            <v-container
              class="transition-swing py-0"
              :fluid="!$store.state.scrolled"
              :class="{
                '': !$store.state.scrolled,
                'pl-0': filter,
                'pr-0': $vuetify.breakpoint.xs,
              }"
            >
              <v-row
                class="transition-swing"
                :no-gutters="!$store.state.scrolled || $vuetify.breakpoint.xs"
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
                    <template v-if="filtersCount && !(search && search.length)">
                      {{ $t('searching') }}
                    </template>
                    <template v-if="search">
                      {{ $t('searching-for-string', [search]) }}
                    </template>
                    <template v-if="filtersCount"
                      >{{ $tc('with-activefilters-filters', [filtersCount]) }}
                    </template>
                    <template v-if="filtersCount || search">- </template>
                    {{
                      $tc('total-' + type, total) +
                      ' - ' +
                      $t('page-current-of-total', {
                        current: page,
                        total: numberOfPages,
                      })
                    }}
                    <component
                      :is="
                        type.charAt(0).toUpperCase() +
                        type.slice(1) +
                        'SearchHint'
                      "
                      outline
                    ></component>
                  </div>
                  <v-text-field
                    v-model.trim="search"
                    :placeholder="$t('search-type', [$t(type)])"
                    prepend-inner-icon="mdi-magnify"
                    single-line
                    :loading="$wait.any"
                    class="transition-swing mt-3"
                    outlined
                    hide-details
                    :dense="$vuetify.breakpoint.smAndDown"
                    :disabled="$wait.any"
                    clearable
                    style="min-width: 150px"
                  >
                    <template v-if="!search" #label>
                      <div class="searchLabel">
                        {{ $t('search-type', [$t(type)]) }}
                      </div>
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
              v-if="view === 'tiles'"
              :data="props"
              :filter="filter"
              :sections="Math.ceil(itemsPerPage / 3)"
              :type="type"
            ></FrontTiles>
            <list-items
              v-else-if="view === 'list'"
              :data="props"
              :filter="filter"
              :type="type"
            ></list-items>
            <RegularList
              v-else
              :data="props"
              :filter="filter"
              :type="type"
            ></RegularList>
          </template>

          <template #no-data>
            <div width="100%" class="my-6 ml-6">
              {{ $t('no-result-found') }}
            </div>
          </template>
          <template #no-result>
            <template v-if="!filtersCount">
              <div class="my-6 ml-6" width="100%">
                {{ $t('no-result-found') }}
              </div>
            </template>
            <template v-else>
              <div
                width="100%"
                :class="{ 'ml-6': !$store.state.scrolled }"
                class="my-6"
              >
                {{ $t('no-result-matching-your-filters') }}
                <br />
                <v-btn
                  v-if="filtersCount"
                  outlined
                  small
                  color="white"
                  class="ma-3"
                  @click="$store.dispatch(type + '/resetState')"
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
                <v-col align-content-start align-start justify-start>
                  <span
                    class="grey--text pr-3"
                    :class="{ 'ml-6': !$store.state.scrolled }"
                    >{{ $t('items-per-page') }}</span
                  >
                  <v-select
                    v-model="itemsPerPage"
                    class="perPageSelect"
                    solo
                    outlined
                    flat
                    dense
                    :items="$store.state[type].itemsPerPageArray"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col align-content-start align-start justify-start> </v-col>
                <v-col
                  v-if="numberOfPages > 1"
                  align-content-start
                  align-start
                  justify-start
                  ><v-pagination
                    :total-visible="5"
                    color="black"
                    large
                    :value="page || 1"
                    :length="numberOfPages"
                    @input="
                      $store.dispatch(type + '/updatePage', $event) &&
                        $vuetify.goTo(0)
                    "
                  ></v-pagination>
                </v-col>
                <v-col align-content-start align-start justify-start
                  ><span
                    class="grey--text"
                    :class="$store.state.scrolled ? 'mr-4' : 'mr-10'"
                  >
                    {{
                      $t('page-current-of-total', {
                        current: page,
                        total: numberOfPages,
                      })
                    }}
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-data-iterator>
      </v-col>
      <v-col
        v-if="$vuetify.breakpoint.smAndUp && filter"
        :cols="filter ? 2 : 1"
        :xl="filter ? 2 : 1"
        :lg="filter ? 3 : 1"
        :md="filter ? 3 : 1"
        :sm="filter ? 5 : 1"
        class="transition-swing pt-0"
      >
        <Filters :type="type" class="mt-7 w-100" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import debounce from '~/assets/utils/debounce'
export default {
  props: {
    addBtn: {
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
      filter: this.$store.state[this.type].filtersCount > 0,
      debouncedSearch: debounce(function (v) {
        this.$store.dispatch(this.type + '/updateSearch', v)
        this.$vuetify.goTo(0)
      }, 200),
    }
  },
  async fetch({ params, store: { dispatch, getters } }) {
    await dispatch(this.type + '/update')
  },
  computed: {
    view() {
      return this.$store.state[this.type].view
    },
    itemsPerPage: {
      get() {
        return this.$store.state[this.type].itemsPerPage
      },
      async set(v) {
        await this.$store.dispatch(this.type + '/updateItemsPerPage', v)
        this.$vuetify.goTo(0)
      },
    },
    options: {
      get() {
        return {
          itemsPerPage: this.$store.state[this.type].itemsPerPage,
          page: this.$store.state[this.type].page,
          sortBy: this.$store.state[this.type].sortBy,
          sortDesc: this.$store.state[this.type].sortDesc,
        }
      },
      set(v) {
        this.$vuetify.goTo(0)
      },
    },
    search: {
      get() {
        return this.$store.state[this.type].search
      },
      set(v) {
        this.debouncedSearch(v)
      },
    },
    display: {
      get() {
        return this.$store.state[this.type].display
      },
      async set(v) {
        await this.$store.dispatch(this.type + '/update', { display: v })
        this.$vuetify.goTo(0)
      },
    },
    total() {
      return this.$store.state[this.type].total
    },

    numberOfPages() {
      return this.$store.state[this.type].numberOfPages
    },
    page() {
      return +this.$store.state[this.type].page
    },
    sortBy() {
      return this.$store.state[this.type].sortBy
    },
    sortDesc() {
      return this.$store.state[this.type].sortDesc[0] !== 'asc'
        ? [false]
        : [true]
    },
    filtersCount() {
      return this.$store.state[this.type].filtersCount
    },
    items() {
      return this.$store.state[this.type].items
    },
  },
  async mounted() {
    console.log('MOUNTED')
    this.$store.commit(this.type + '/loadRouteQuery')
    this.filter =
      this.$store.state[this.type].filtersCount > 0 ||
      (this.$route.query.filters &&
        Object.keys(this.$route.query.filters).length > 0) ||
      this.$route.query?.search?.length > 0

    await this.$store.dispatch(this.type + '/update')
  },
  updated() {},
  methods: {
    /*     async updatePage(page) {
      await this.$router.push({
        query: { ...this.$route.query, page },
      })
      this.options.page = +page
    }, */
  },
}
</script>
<style lang="scss">
.sidebtn {
  position: sticky;
  display: block;
  align-self: flex-start;
  top: 0;
  overflow-y: auto;
  top: 0;
  background-color: white;
  z-index: 4;
  align-self: flex-start;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  overflow: hidden;
  padding-bottom: 10px;
}
.perPageSelect {
  max-width: 90px;
  margin-top: 0;
  padding-top: 0;
}
.searchLabel {
  text-transform: uppercase !important;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6) !important;
}
</style>
