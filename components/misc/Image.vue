<template>
  <div class="frame">
    <div class="overlay">
      <slot></slot>
    </div>
    <v-img
      v-if="src"
      :aspect-ratio="ratio"
      :lazy-src="$img(src, { width: 10, quality: 70 })"
      :src="$img(src, { height, quality: 70 })"
      :srcset="_srcset.srcset"
      :sizes="_srcset.size"
      v-bind="$attrs"
      :height="height"
    ></v-img>
    <v-sheet v-else></v-sheet>
  </div>
</template>
<script>
export default {
  props: {
    ratio: { type: Number, default: 16 / 9 },
    height: { type: [Number, String], default: 500 },
    src: {
      type: String,
      default: '',
    },
  },
  computed: {
    _srcset() {
      return this.$img.getSizes(this.src, {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          format: 'webp',
          quality: 70,
          height: this.height,
          width: this.height * this.ratio,
        },
      })
    },
  },
  mounted() {},
}
</script>
<style scoped>
.frame {
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 2;
  justify-content: space-between;
}
.v-image {
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  z-index: 1;
}
.overlay:hover + .v-image {
  -ms-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -o-transform: scale(1.1);
  transform: scale(1.1);
  opacity: 0.8;
}
</style>
