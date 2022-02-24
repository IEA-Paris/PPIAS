<template>
  <div class="d-flex align-center flex-column">
    <div class="page-title" :class="$store.state.scrolled ? 'mb-9' : 'mb-6'">
      {{ text }}
    </div>
    <!--     <v-divider style="width: 120px"></v-divider>
    <v-divider style="width: 120px" class="mt-1"></v-divider> -->
    <div class="text-body-1 mt-3"><slot></slot></div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';
.page-title {
  font-family: 'Bodonis Moda';
  font-size: 3rem !important;
  font-weight: 500 !important;
}
@media #{map-get($display-breakpoints, 'sm-only')} {
  .page-title {
    font-size: 2rem !important;
  }
}
@media #{map-get($display-breakpoints, 'xs-only')} {
  .page-title {
    font-size: 1.8rem !important;
  }
}
</style>
