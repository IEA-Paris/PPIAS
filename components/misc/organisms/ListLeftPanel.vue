<template>
  <div class="d-flex flex-column">
    <FiltersDialog
      v-if="isXsDisplay"
      v-model="filter"
      :type="type"
      :filter-count="filtersCount"
    />
    <div v-if="smAndUp" class="d-inline-flex sidebtn">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            tile
            variant="text"
            outlined
            v-bind="attrs"
            class="pa-7 mb-0"
            @click="filter = !filter"
            v-on="on"
          >
            <v-icon :left="!filter" :large="filter">
              {{ filter ? 'mdi-chevron-left' : 'mdi-filter' }}
            </v-icon>
            {{ filter ? '' : $t('filters') }}
            <!-- {{ nameDisplay }} -->
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
        'justify-center': lgAndUp,
        'flex-row-reverse': smAndUp,
      }"
      :no-gutters="isMobileDisplay"
    >
      <v-col
        cols="12"
        :xl="filter ? 8 : 10"
        :lg="filter ? 9 : 11"
        :md="filter ? 9 : 12"
        :sm="filter ? 7 : 12"
        class="transition-swing pt-0"
        :class="{
          'pl-0': filter || isXsDisplay,
        }"
      >
        <v-container
          class="transition-swing pt-0"
          :fluid="!rootStore.scrolled"
          :class="{
            'px-0 mb-3': rootStore.scrolled && isXsDisplay,
            'pb-0': smAndUp,
            'ml-0': filter,
          }"
        >
          <v-row
            class="transition-swing"
            :no-gutters="!rootStore.scrolled || isXsDisplay"
          >
            <v-col cols="12 transition-swing">
              <div class="text-right">
                <ViewMenu :type="type"></ViewMenu>
                <SortMenu :type="type"></SortMenu>
              </div>
              <div class="mr-4 text-subtitle-1 grey--text">
                <v-skeleton-loader
                  v-if="rootStore.loading"
                  max-width="300"
                  class="mb-1"
                  type="text"
                ></v-skeleton-loader>
                <template v-else>
                  <template v-if="filtersCount && !(search && search.length)">
                    {{ $t('searching') }}
                  </template>
                  <template v-if="search">
                    {{ $t('searching-for-string', [search]) }}
                  </template>
                  <template v-if="filtersCount"
                    >{{ $t('with-activefilters-filters', [filtersCount]) }}
                  </template>
                  <!--  TODO add sort & view info -->
                  <!--            <template v-if="sortBy">
                  Sorted by {{$t(sortBy[0])}} ()
               </template> -->
                  <template v-if="filtersCount || search">- </template>
                  {{
                    $t('total-' + type, total) +
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
                </template>
              </div>
              <v-text-field
                v-model.trim="search"
                :placeholder="$t('search-type', [$t(type)])"
                prepend-inner-icon="mdi-magnify"
                single-line
                color="black"
                :loading="$nuxt.loading || rootStore.loading"
                class="transition-swing"
                :class="{ 'mt-3': rootStore.scrolled }"
                outlined
                hide-details
                :dense="smAndDown"
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
        <DisplayByIssue
          v-else-if="view === 'issues'"
          :data="{
            items,
            total,
            issues: new Set(
              items.map((item) => item.issue && item.issue.slice(15, -3))
            ),
          }"
          :filter="filter"
          :type="type"
        ></DisplayByIssue>
        <RegularList
          v-else
          :data="{ items, total }"
          :filter="filter"
          :type="type"
        ></RegularList>
        <template v-if="items.length === 0 && rootStore.loading">
          <div width="100%" class="my-6 ml-6">
            <Loader></Loader>
          </div>
        </template>
        <!-- TODO update for equivalent after removing datatable -->
        <template v-if="items.length === 0 && !rootStore.loading">
          <template v-if="!filtersCount">
            <div class="my-6 ml-6" width="100%">
              {{ $t('no-result-found') }}
            </div>
          </template>
          <template v-else>
            <div
              width="100%"
              :class="{ 'ml-6': !rootStore.scrolled }"
              class="my-6"
            >
              {{ $t('no-result-matching-your-filters') }}
              <br />
              <v-btn
                outlined
                class="my-6"
                @click="rootStore.resetState(type)"
              >
                <v-icon left>mdi-refresh</v-icon>
                {{ $t('reset-filters') }}
              </v-btn>
            </div>
          </template>
        </template>
      </v-col>
      <v-col
        v-if="smAndUp && filter"
        :cols="filter ? 2 : 1"
        :xl="filter ? 2 : 1"
        :lg="filter ? 3 : 1"
        :md="filter ? 3 : 1"
        :sm="filter ? 5 : 1"
        class="transition-swing pr-0"
      >
        <v-row class="transition-swing pl-3 pr-0 fill-height">
          <v-col cols="12" :class="filtersSpacing" class="mt-12">
            <Filters :type="type" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-container
      v-if="!rootStore.loading"
      class="footer-pagination d-flex transition-swing"
      :class="[
        smAndDown
          ? 'flex-column-reverse align-center'
          : 'justify-space-between',
        { unpadded: filter },
      ]"
    >
      <div
        class="perpage-select"
        :class="smAndDown ? 'text-center' : ''"
      >
        <span
          class="grey--text pr-3"
          :class="{ 'ml-6': !rootStore.scrolled }"
          >{{ $t('items-per-page') }}</span
        >
        <v-select
          v-model="itemsPerPage"
          class="perPageSelect"
          solo
          outlined
          flat
          dense
          :items="rootStore.getChildrenStore(type).itemsPerPageArray"
          hide-details
        ></v-select>
      </div>
      <div class="text-center">
        <Pagination
          v-if="numberOfPages > 1"
          :total-visible="5"
          :value="page || 1"
          :length="numberOfPages"
          @input="handlePagination"
        />
      </div>
    </v-container>
  </div>
</template>
<script setup>
import { useRootStore } from '~/store/root';
import { useDisplay } from 'vuetify'
import debounce from '~/assets/utils/debounce'


const { name: nameDisplay, xs: isXsDisplay, mobile: isMobileDisplay, smAndUp, lgAndUp, smAndDown } = useDisplay()
const nuxtApp = useNuxtApp()

const rootStore = useRootStore()
rootStore.setLoading(false)
const props = defineProps({
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
})

const filter = ref(rootStore.getChildrenStore(props.type).filtersCount > 0)
const debouncedSearch = reactive(debounce(function (v) {
  rootStore.updateSearch({ search: v, type: props.type })
}, 200))


const handlePagination = (page) => {
  rootStore.updatePage({ page, type: props.type })
  // nuxtApp.$vuetify.goTo(0)
  window.scrollTo(0, 0)
}


const filtersSpacing = computed(() => {
  const scrolled = rootStore.scrolled
  switch (nameDisplay) {
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
})

const view = computed(() => {
  return rootStore.getChildrenStore(props.type).view
})

const total = computed(() => {
  return rootStore.getChildrenStore(props.type).total
})

const numberOfPages = computed(() => {
  return rootStore.getChildrenStore(props.type).numberOfPages
})

const page = computed(() => {
  return +rootStore.getChildrenStore(props.type).page
})

const sortBy = computed(() => {
  return rootStore.getChildrenStore(props.type).sortBy
})

const sortDesc = computed(() => {
  return rootStore.getChildrenStore(props.type).sortDesc[0] !== 'asc'
      ? [false]
      : [true]
})

const filtersCount = computed(() => {
  return rootStore.getChildrenStore(props.type).filtersCount
})

const items = computed(() => {
  return rootStore.getChildrenStore(props.type).items
})

const itemsPerPage = computed({
  get() {
    return rootStore.getChildrenStore(props.type).itemsPerPage
  },
  set(value) {
    rootStore.updateItemsPerPage({ itemsPerPage: value, type: props.type })
    nuxtApp.$vuetify.goTo(0)
  },
})

const search = computed({
  get() {
    return rootStore.getChildrenStore(props.type).search
  },
  set(value) {
    debouncedSearch(value)
  },
})

const display = computed({
  get() {
    return rootStore.getChildrenStore(props.type).display
  },
  set(value) {
    rootStore.updateDisplay({ display: value, type: props.type })
    nuxtApp.$vuetify.goTo(0)
  },
})

onMounted(() => {
  rootStore.loadRouteQuery(props.type)
  filter.value = rootStore.getChildrenStore(props.type).filtersCount > 0 ||
      (route.query.filters &&
        Object.keys(route.query.filters).length > 0) ||
      route.query?.search?.length > 0

  rootStore.update(props.type)
})

useFetch(async () => {
  rootStore.update(props.type)
})
</script>
<style lang="scss">
.unpadded {
  // TODO Fix animation. Rather than :fluid="filter", it seems that applying this at css level produced a more satisfying animation. It mitigates the glitch making the filters appear below the list before going to the right place. It remains to be fully fixed
  max-width: 100%;
}
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
  margin-bottom: 10px;
  margin-bottom: 0px;
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
