<template>
  <v-toolbar flat class="ml-10 mt-10">
    <v-spacer></v-spacer>
    <v-select
      v-model="current"
      class="issue-switcher"
      :items="issues"
      item-value="number"
      outlined
      :no-data-text="$t('no-issue-available')"
      menu-props="offset-y"
      max-width="250px"
      hide-details
      @change="$router.push({ ...$route.query, query: { issue: $event } })"
      @click:clear="$router.push({ ...$route.query, query: { issue: undefined } })"
    >
      <template #selection="data">
        <!-- HTML that describe how select should render selected items -->
        #{{ data.item.number }} - {{ data.item.name }}
      </template>
      <template #item="data">
        <!-- HTML that describe how select should render selected items -->
        #{{ data.item.number }} - {{ data.item.name }}
      </template>
    </v-select>
    <v-btn :height="56" outlined nuxt to="/issues" x-large>{{ $t('see-all-issues') }}</v-btn>
  </v-toolbar>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      current: this.$route.query.issue || 0,
      issues: [],
    }
  },
  async fetch() {
    this.issues = await this.$content('issues').where({ published: true }).only(['number', 'name']).fetch()
    console.log('this.issues : ', this.issues)
  },
  computed: {},

  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.section-title {
  border-bottom: 5px solid black;
}
.issue-switcher {
  max-width: 250px;
}
</style>
