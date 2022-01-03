<template>
  <v-container
    v-scroll="onScroll"
    class="transition-swing"
    :fluid="!$store.state.scrolled"
    :class="{ 'py-0': !$store.state.scrolled }"
  >
    <v-row
      class="transition-swing mt-6"
      :no-gutters="!$store.state.scrolled"
      :class="$store.state.scrolled ? '' : 'mx-12'"
    >
      <v-col cols="12" md="6" lg="8" class="transition-swing" order="first">
        <Item :scroll="$store.state.scrolled" :first="$vuetify.breakpoint.md" />
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-row :no-gutters="!$store.state.scrolled">
          <v-col cols="12" class="transition-swing">
            <Item />
          </v-col>
          <v-col cols="12" class="transition-swing">
            <Item />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="transition-swing" :no-gutters="!$store.state.scrolled" :class="$store.state.scrolled ? '' : 'mx-12'">
      <v-col cols="12" md="6" lg="8" class="transition-swing" order="first">
        <Item :scroll="$store.state.scrolled" :first="$vuetify.breakpoint.md" />
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-row :no-gutters="!$store.state.scrolled">
          <v-col cols="12" class="transition-swing">
            <Item />
          </v-col>
          <v-col cols="12" class="transition-swing">
            <Item />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  async asyncData({ $content, params, route }) {
    const issue = await $content('issues')
      .where({ number: route?.query?.issue || 0, published: true })
      .fetch()
    return {
      issue,
    }
  },
  data() {
    return {
      scrolled: false,
    }
  },
  methods: {
    onScroll() {
      this.$store.commit('setScrolled')
    },
  },
}
</script>
