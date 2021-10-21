<template>
  <div>
    <v-container v-scroll="onScroll" class="transition-swing" :fluid="!scrolled" :class="{ scrolled: 'mt-14' }">
      <v-row cass="transition-swing" :no-gutters="!scrolled" :class="scrolled ? '' : 'mx-12'">
        <v-col cols="12" class="transition-swing" style="position: sticky">
          <SectionTitle :text="title" />
        </v-col>
        <v-col cols="12" md="6" class="transition-swing" style="position: sticky">
          <v-card class="sticky-card">
            <Item :first="true" />
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <Item />
          <Item />
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
  },
  data() {
    return {
      scrolled: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {
    onScroll() {
      this.scrolled = window.pageYOffset > 0
    },
  },
}
</script>
<style lang="scss"></style>
