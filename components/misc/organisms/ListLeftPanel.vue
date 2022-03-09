<template>
  <div class="d-flex flex-column">
    <FiltersDialog
      v-if="$vuetify.breakpoint.xs"
      v-model="filter"
      :type="type"
      :filter-count="filtersCount"
    />
    <div v-if="$vuetify.breakpoint.smAndUp" class="d-inline-flex sidebtn">
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
            <v-icon :left="!filter" :large="filter">
              {{ filter ? 'mdi-chevron-left' : 'mdi-filter' }}
            </v-icon>
            {{ filter ? '' : $t('filters') }}
            <!-- {{ $vuetify.breakpoint.name }} -->
          </v-btn>
        </template>
        <span v-html="filter ? $t('hide-filters') : $t('show-filters')"></span>
      </v-tooltip>
    </div>

    <!--   <IconMenu menu-type="view" :type="type"></IconMenu> -->
    <v-row
      class="transition-swing d-flex"
      :fluid="filter"
      :class="{
        'justify-center': $vuetify.breakpoint.lgAndUp,
        'flex-row-reverse': $vuetify.breakpoint.smAndUp,
      }"
      :no-gutters="$vuetify.breakpoint.mobile"
    >
      <v-col
        cols="12"
        :xl="filter ? 8 : 10"
        :lg="filter ? 9 : 11"
        :md="filter ? 9 : 12"
        :sm="filter ? 7 : 12"
        class="transition-swing pt-0 text-left"
        :class="{ 'pl-0': !$store.state.scrolled || $vuetify.breakpoint.xs }"
      >
        <v-container
          class="transition-swing pt-0 ml-0"
          :fluid="!$store.state.scrolled"
          :class="{
            'px-0 mb-3': $store.state.scrolled && $vuetify.breakpoint.xs,
            'pb-0': $vuetify.breakpoint.smAndUp,
          }"
        >
          <v-row
            class="transition-swing"
            :no-gutters="!$store.state.scrolled || $vuetify.breakpoint.xs"
          >
            <v-col cols="12 transition-swing">
              <div class="text-right">
                <ViewMenu :type="type"></ViewMenu>
                <SortMenu :type="type"></SortMenu>
              </div>
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
                    type.charAt(0).toUpperCase() + type.slice(1) + 'SearchHint'
                  "
                  outline
                ></component>
              </div>
              <v-text-field
                v-model.trim="search"
                :placeholder="$t('search-type', [$t(type)])"
                prepend-inner-icon="mdi-magnify"
                single-line
                color="black"
                :loading="$nuxt.loading || $store.state.loading"
                class="transition-swing"
                :class="{ 'mt-3': $store.state.scrolled }"
                outlined
                hide-details
                :dense="$vuetify.breakpoint.smAndDown"
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
        <template v-if="$nuxt.loading">
          <v-progress-linear
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
          <v-container style="height: 400px">
            <v-row class="fill-height" align-content="center" justify="center">
              <v-col align="center" cols="12">
                <v-img src="/loading.gif" height="250" width="250"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <template v-else>
          <FrontTiles
            v-if="view === 'tiles'"
            :data="{ items, total }"
            :filter="filter"
            :sections="Math.ceil(itemsPerPage / 3)"
            :type="type"
          ></FrontTiles>
          <list-items
            v-else-if="view === 'list'"
            :data="{ items, total }"
            :filter="filter"
            :type="type"
          ></list-items>
          <RegularList
            v-else
            :data="{ items, total }"
            :filter="filter"
            :type="type"
          ></RegularList>
        </template>

        <template v-if="items.length === 0">
          <div width="100%" class="my-6 ml-6">
            {{ $t('no-result-found') }}
          </div>
        </template>
        <!-- TODO update for equivalent after removing datatable -->
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
                @click="$store.dispatch('resetState', type)"
              >
                <v-icon left>mdi-refresh</v-icon>
                {{ $t('reset-filters') }}
              </v-btn>
            </div>
          </template>
        </template>
      </v-col>
      <v-col
        v-if="$vuetify.breakpoint.smAndUp && filter"
        :cols="filter ? 2 : 1"
        :xl="filter ? 2 : 1"
        :lg="filter ? 3 : 1"
        :md="filter ? 3 : 1"
        :sm="filter ? 5 : 1"
        class="transition-swing pr-0"
      >
        <v-row class="transition-swing pl-3 pr-0 fill-height">
          <v-col cols="12" :class="filtersSpacing" class="mt-12">
            <Filters :type="type" /></v-col
        ></v-row>
      </v-col>
    </v-row>

    <v-container
      class="footer-pagination d-flex"
      :class="
        $vuetify.breakpoint.smAndDown
          ? 'flex-column-reverse align-center'
          : 'justify-space-between'
      "
    >
      <div
        class="perpage-select"
        :class="$vuetify.breakpoint.smAndDown ? 'text-center' : ''"
      >
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
      </div>
      <div class="text-center">
        <v-pagination
          v-if="numberOfPages > 1"
          :total-visible="5"
          color="black"
          large
          :value="page || 1"
          :length="numberOfPages"
          @input="
            $store.dispatch('updatePage', { page: $event, type }) &&
              $vuetify.goTo(0)
          "
        ></v-pagination>
      </div>
    </v-container>
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
        return {}
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
        this.$store.dispatch('updateSearch', { search: v, type: this.type })
        this.$vuetify.goTo(0)
      }, 200),
    }
  },
  async fetch({ params, store: { dispatch, getters } }) {
    await dispatch('update', this.type)
  },
  computed: {
    filtersSpacing() {
      const scrolled = this.$store.state.scrolled
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          return scrolled ? 'pt-13 pr-3' : 'pt-11 pr-0'

        case 'md':
          return scrolled ? 'pt-14 pr-5' : 'pt-11 pr-0'

        case 'lg':
          return scrolled ? 'pt-11 pr-2' : 'pt-8 pr-0'

        case 'xl':
          return scrolled ? 'pt-10 pr-3' : 'pt-8 pr-0'

        default:
          return 'pt-10 pr-3'
      }
    },
    view() {
      return this.$store.state[this.type].view
    },
    itemsPerPage: {
      get() {
        return this.$store.state[this.type].itemsPerPage
      },
      async set(v) {
        await this.$store.dispatch('updateItemsPerPage', {
          value: v,
          type: this.type,
        })
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
        await this.$store.dispatch('update', { display: v, type: this.type })
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

    this.$store.commit('loadRouteQuery', this.type)
    this.filter =
      this.$store.state[this.type].filtersCount > 0 ||
      (this.$route.query.filters &&
        Object.keys(this.$route.query.filters).length > 0) ||
      this.$route.query?.search?.length > 0

    await this.$store.dispatch('update', this.type)
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
.footer-pagination {
  display: flex;
  align-content: center;
  justify-items: center;
}
.footer-pagination::after {
  content: '';
  order: 1;
  width: 90px;
}
.perpage-select {
  order: 0;
}
</style>
