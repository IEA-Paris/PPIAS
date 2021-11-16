<template>
  <div class="frame">
    <div class="overlay">
      <div class="top">
        <div class="d-flex">
          <template v-for="(tag, index) in tags">
            <v-chip :key="index" :color="tag.color" label>
              {{ $t(tag.text) }}
            </v-chip>
          </template>
        </div>
        <span id="caption-content">
          <slot name="caption"></slot>
          <br />
        </span>
        <span id="caption-author">
          <slot name="author"></slot>
        </span>
      </div>
      <div v-if="tags.find((tag) => tag.text === 'event')" class="bottom">
        <span id="caption-date">
          <slot name="date"></slot>
        </span>
      </div>
    </div>
    <v-img
      :aspect-ratio="ratio"
      :lazy-src="$img(src, { width: 10, quality: 70 })"
      :src="$img(src, { height, quality: 70 })"
      :srcset="_srcset.srcset"
      :sizes="_srcset.size"
      :class="{ expanded: expanded }"
    ></v-img>
  </div>
</template>
<script>
export default {
  props: {
    ratio: { type: Number, default: 16 / 9 },
    height: { type: [Number, String], default: 500 },
    src: {
      type: String,
      default: '/img/header-bg.jpg',
    },
    tags: {
      type: Array,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _srcset() {
      return this.$img.getSizes(this.src, {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          format: 'webp',
          quality: 70,
          height: 500,
        },
      })
    },
  },
  mounted() {},
}
</script>
<style scoped>
.frame {
  overflow: hidden;
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
  padding-bottom: 2rem;
  padding-right: 1.9rem;
  justify-content: space-between;
}
.top {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  text-align: right;
}

.v-image {
  -webkit-transition: all 0.6s ease-in-out;
  transition: all 0.6s ease-in-out;
  z-index: 1;
}
.overlay:hover + .v-image {
  -ms-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -o-transform: scale(1.1);
  transform: scale(1.1);
  opacity: 0.6;
}
#caption-content,
#caption-author,
#caption-date {
  background-position: 0;
  background-size: 200%;
  transition: all 0.6s ease-in;
  text-align: right;
  text-decoration: none;
  max-width: 66%;
}
#caption-content {
  font-size: 1.2rem;
  line-height: 2.2rem;
  text-decoration: none;
  text-shadow: 1px 1px 0 alpha(white, 0.6);
  padding: 12px;
  color: black;
  background-image: linear-gradient(to left, white 100%, black 100%);
  text-transform: uppercase;
}
#caption-author {
  padding: 4px;
  color: white;
  background-image: linear-gradient(to left, black 100%, white 100%);
  line-height: 2.2rem;
  text-shadow: 1px 1px 0 alpha(black, 0.6);
}
.overlay:hover #caption-content {
  /*   line-height: 2.2rem;
  font-size: 1.3rem; */
}
.overlay:hover #caption-author {
}
#caption-date {
  padding: 4px;
  color: black;
  background-image: linear-gradient(to left, white 100%, black 100%);
  font-size: 1.2rem;
  line-height: 2.2rem;
  text-shadow: 1px 1px 0 alpha(black, 0.6);
}
.expanded .v-image {
  padding-top: 24px !important;
}
</style>
