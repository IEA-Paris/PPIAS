<template>
  <div>
    <v-container class="transition-swing" :fluid="!$store.state.scrolled">
      <v-row
        class="transition-swing"
        :no-gutters="!$store.state.scrolled"
        :class="$store.state.scrolled ? '' : 'mx-12'"
      >
        <SectionTitle :text="title" />
      </v-row>
      <v-row
        class="transition-swing"
        :no-gutters="!$store.state.scrolled"
        :class="$store.state.scrolled ? '' : 'mx-12'"
      >
        <v-col cols="12" md="6" xl="4" class="transition-swing" :order="alt ? 'last' : 'first'">
          <Item :first="true" :scroll="$store.state.scrolled" />
        </v-col>
        <v-col cols="12" md="6" xl="4">
          <v-row :no-gutters="!$store.state.scrolled">
            <v-col cols="12" class="transition-swing">
              <Item />
            </v-col>
            <v-col cols="12" class="transition-swing">
              <Item />
            </v-col>
          </v-row>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.xl" cols="12" md="6" xl="4">
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
  </div>
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
