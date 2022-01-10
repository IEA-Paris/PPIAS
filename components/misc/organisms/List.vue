<template>
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
    <template #header>
      <Header
        :loading="loading"
        :type="type"
        :fluid="layout.fluid"
        :nogutters="layout.nogutters"
        :add-button="addButton"
      />
    </template>
    <template #loading>
      <v-progress-linear indeterminate rounded height="6"></v-progress-linear>
      <v-container style="height: 400px">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col align="center" cols="12">
            <v-img src="/loading.gif" height="250" width="250"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #default="props">
      <v-container :fluid="layout.fluid">
        <v-row
          :no-gutters="layout.nogutters"
          justify="center"
          class="transition-swing mt-6"
        >
          <component
            :is="type.charAt(0).toUpperCase() + type.slice(1) + 'Item'"
            v-for="item in props.items"
            :key="item.id"
            :item="item"
            v-bind="$attrs"
            :cols="layout.cols"
            :xs="layout.xs"
            :sm="layout.sm"
            :md="layout.md"
            :ld="layout.ld"
            :xl="layout.xl"
          ></component>
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
      <v-container :fluid="layout.fluid">
        <v-row :no-gutters="layout.nogutters" justify="center" align="center">
          <span class="grey--text">{{ $t('items-per-page') }}</span>
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ options.itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="$store.commit('list/updateItemsPerPage', number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            {{
              $t('page-current-of-total', {
                current: options.page,
                total: numberOfPages,
              })
            }}
          </span>
          <div v-if="numberOfPages > 1" class="text-center">
            <v-btn
              icon
              class="mr-1"
              :disabled="options.page === 1"
              @click="options.page -= 1"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              icon
              class="ml-1"
              :disabled="options.page >= numberOfPages"
              @click="options.page += 1"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </template>
  </v-data-iterator>
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
      search: this.$route.query.search || '',
      filter: {},
      itemsPerPageArray: [10, 30, 60],
      options: {
        itemsPerPage: 10,
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
    const rst = await getContent(
      this.type,
      this.$content,
      this.$route.query,
      this.search,
      true
    )

    if (rst) {
      this.total = rst.total
      this.numberOfPages = rst.numberOfPages
      this.pinnedItem = rst.pinnedItem
      this.items = rst.items.reverse()
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
  },
  watchQuery: true,

  created() {},
  updated() {},
  methods: {},
}
</script>
<style lang="scss"></style>
