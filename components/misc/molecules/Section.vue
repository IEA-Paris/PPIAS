<template>
  <v-container class="transition-swing" :fluid="!$store.state.scrolled" :class="{ 'py-0': !$store.state.scrolled }">
    <v-row class="transition-swing" :no-gutters="!$store.state.scrolled" :class="$store.state.scrolled ? '' : 'mx-12'">
      <!--   <SectionTitle :text="title" /> -->
    </v-row>
    <v-row class="transition-swing" :no-gutters="!$store.state.scrolled" :class="$store.state.scrolled ? '' : 'mx-12'">
      <v-col cols="12" md="6" lg="8" class="transition-swing" :order="alt ? 'last' : 'first'">
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
  props: {
    title: {
      type: String,
      default: '',
    },
    alt: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scrolled: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
