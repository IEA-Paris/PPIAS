<template>
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
      <div class="sidebtn">
        <div class="d-flex align-center">
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
      </div>
      <span class="mr-4 grey--text">
        {{
          $t('page-current-of-total', {
            current: options.page,
            total: numberOfPages,
          })
        }}
      </span>
      <v-data-iterator
        :loading="loading"
        :items="items"
        :footer-props="{ itemsPerPageOptions: [5, 10, 20, 50, 100] }"
        :server-items-length="total"
        :options.sync="options"
        :search="search"
        hide-default-footer
        @update:page="$vuetify.goTo(0)"
      >
        <template #loading>
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
        <template #default="props">
          <v-container
            v-scroll="onScroll"
            class="transition-swing"
            :fluid="!$store.state.scrolled"
            :class="{ 'py-0': !$store.state.scrolled, 'pl-0': filter }"
          >
            <v-row
              v-for="section in Math.ceil(options.itemsPerPage / 3)"
              :key="section"
              class="transition-swing"
              :no-gutters="!$store.state.scrolled"
              :class="[
                $store.state.scrolled
                  ? ''
                  : $vuetify.breakpoint.mobile
                  ? 'mx-2'
                  : 'mx-6',
                { 'mt-6': section === 1 },
              ]"
            >
              <v-col
                cols="12"
                :sm="filter ? 12 : 6"
                md="6"
                lg="8"
                xl="6"
                class="transition-swing"
                :order="
                  section % 2
                    ? 'first'
                    : props.items[(section - 1) * 3 + 1]
                    ? 'last'
                    : 'first'
                "
              >
                <component
                  :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
                  v-if="props.items[(section - 1) * 3]"
                  :item="props.items[(section - 1) * 3]"
                  v-bind="$attrs"
                  highlighted
                  :scroll="$store.state.scrolled"
                ></component>
              </v-col>
              <v-col cols="12" :sm="filter ? 12 : 6" md="6" lg="4" xl="6">
                <v-row :no-gutters="!$store.state.scrolled">
                  <v-col cols="12" class="transition-swing">
                    <component
                      :is="
                        type.charAt(0).toUpperCase() + type.slice(1) + 'Item'
                      "
                      v-if="props.items[(section - 1) * 3 + 1]"
                      :item="props.items[(section - 1) * 3 + 1]"
                      v-bind="$attrs"
                      :scroll="$store.state.scrolled"
                    ></component>
                  </v-col>
                  <v-col cols="12" class="transition-swing">
                    <component
                      :is="
                        type.charAt(0).toUpperCase() + type.slice(1) + 'Item'
                      "
                      v-if="props.items[(section - 1) * 3 + 2]"
                      :item="props.items[(section - 1) * 3 + 2]"
                      v-bind="$attrs"
                      :scroll="$store.state.scrolled"
                    ></component>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
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
                  page = 1
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
              <div class="ml-3 d-flex align-center">
                <span class="grey--text pr-3">{{ $t('items-per-page') }}</span>
                <v-select
                  v-model="options.itemsPerPage"
                  class="perPageSelect"
                  solo
                  flat
                  :items="itemsPerPageArray"
                  hide-details
                  @change="updatePage(1)"
                ></v-select>
              </div>

              <v-spacer></v-spacer>

              <div v-if="numberOfPages > 1" class="text-center">
                <v-pagination
                  :total-visible="5"
                  :v-model="options.page"
                  color="black"
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
      class="transition-swing filter-column"
    >
      <div class="overline">
        <v-icon x-small>mdi-filter</v-icon>
        {{ $t('filters') }}
        <!-- <Filters :type="type" :loading="loading" /> -->
      </div>
    </v-col>
  </v-row>
</template>
<script>
import getContent from '~/assets/utils/getContent'
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
    addButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      mobile: this.$vuetify.breakpoint.mobile,
      search: this.$route.query.search || '',
      filter: false,
      itemsPerPageArray: [9, 12, 16],
      options: {
        itemsPerPage: 9,
        page: this.$route.query.page || 1,
        sortBy: [],
        sortDesc: [true],
      },
      numberOfPages: 0,
      total: 0,
      items: [],
      loading: false,
    }
  },
  async fetch() {
    // TODO: FIX/INVEsTIGUATE> looks like mobile is not detected correctly
    if (!this.$route.query.search) this.search = null
    const rst = await getContent(
      this.type,
      this.$content,
      this.$route.query,
      this.search,
      true,
      this.mobile,
      this.options.itemsPerPage
    )

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
  },
  computed: {},
  watch: {
    '$route.query': '$fetch',
    'options.itemsPerPage': '$fetch',
  },
  watchQuery: true,
  created() {},
  updated() {},
  methods: {
    onScroll() {
      this.$store.commit('setScrolled')
    },
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
.perPageSelect {
  max-width: 72px;
  margin-top: 0;
  padding-top: 0;
}
</style>
