<template>
  <v-img
    class="d-flex"
    :lazy-src="$img(src, { width: 10, quality: 70 })"
    :src="$img(src, { height, quality: 70 })"
    :srcset="_srcset.srcset"
    :height="height"
    :sizes="_srcset.size"
    contain
    :style="{ '--height': height + 'px' }"
  >
    <slot name="caption"></slot>
    <slot name="overlay"></slot>
  </v-img>
</template>
<script>
export default {
  props: {
    height: { type: [Number, String], default: 500 },
    src: {
      type: String,
      default: '/img/header-bg.jpg',
    },
  },
  computed: {
    _srcset() {
      return this.$img.getSizes(this.src, {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          format: 'webp',
          quality: 70,
          height: 1200,
        },
      })
    },
  },
}
</script>
<style lang="scss">
.v-responsive__sizer {
  padding-bottom: var(--height) !important;
}
</style>
