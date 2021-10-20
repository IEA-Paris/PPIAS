<template>
  <v-data-iterator
    :loading="!!$apolloData.loading"
    :items="($apolloData.data.list && $apolloData.data.list.items) || []"
    :footer-props="{ itemsPerPageOptions: [5, 10, 20, 50, 100] }"
    :server-items-length="$apolloData.data.list && $apolloData.data.list.total"
    :items-per-page.sync="itemsPerPage"
    :options.sync="options"
    hide-default-footer
    @update:page="$vuetify.goTo(0)"
  >
    <template #header>
      <Header :type="type" :fluid="layout.fluid" :nogutters="layout.nogutters" />
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
        <v-row :no-gutters="layout.nogutters" justify="center">
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

    <style lang="scss"></style>

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
  </v-data-iterator>
</template>
<script>
export default {
  apollo: {
    list: {
      prefetch: true,
      query() {
        return this.gql
      },
      variables() {
        return { options: this.options }
      },
      update(data) {
        this.$store.commit('list/update', { items: data[Object.keys(data)[0]] })
        return data[Object.keys(data)[0]]
      },
    },
  },
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    gql: {
      type: Object,
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
  },
  data() {
    return {
      search: null,
      sort: null,
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: ['Name', 'Calories', 'Fat', 'Carbs', 'Protein', 'Sodium', 'Calcium', 'Iron'],
      options: {
        itemsPerPage: 10,
        page: 1,
        sortBy: [],
        sortDesc: [true],
      },
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.$apolloData?.data.list.total / this.itemsPerPage)
    },
  },
  watch: {
    options(v) {
      this.$store.dispatch('list/search', {
        limit: v.itemsPerPage,
        skip: (v.page - 1) * v.itemsPerPage,
      })
    },
  },

  created() {},

  methods: {},
}
</script>
<style lang="scss"></style>
