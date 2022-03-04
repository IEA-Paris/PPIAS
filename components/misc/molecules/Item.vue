<template>
  <div class="frame">
    <div class="overlay">
      <div class="top">
        <div v-if="hasContent('categories')" class="d-flex">
          <slot name="categories"></slot>
        </div>

        <span v-if="hasContent('caption')" class="caption-content">
          <div class="my-6 px-3 caption-content-frame">
            <slot name="caption"></slot>
          </div>
        </span>
        <div v-if="hasContent('author')" class="caption-author">
          <slot name="author"></slot>
          <div></div>
        </div>
      </div>
      <div v-if="hasContent('date')" class="bottom">
        <span class="caption-date">
          <slot name="date"></slot>
        </span>
      </div>
    </div>
    <slot name="content"></slot>
  </div>
</template>
<script>
// export component
export default {
  props: {
    media: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    hasContent(slot) {
      return !!this.$slots[slot]
    },
  },
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.frame {
  overflow: hidden;
  display: flex;
  position: relative;
  flex: 1;
  width: 100%;
  align-items: center;
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
.top {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  text-align: right;
}

/* .overlay:hover + .article-fingerprint {
  -webkit-animation: breathing 5s ease-out infinite normal;
  animation: breathing 5s ease-out infinite normal;
} */
.caption-content,
.caption-author,
.caption-date {
  background-position: 0;
  background-size: 200%;
  transition: all 0.6s ease-in;
  text-align: right;
  text-decoration: none;
  max-width: 66%;
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .caption-content {
    max-width: 86%;
  }
}
.caption-content {
  font-size: 1.25rem;
  line-height: 1.7rem;
  text-decoration: none;
  text-shadow: 1px 1px 0 alpha(rgba(255, 255, 255, 0.6));
  color: black;
  background-image: linear-gradient(to left, white 100%, black 100%);
  text-transform: uppercase;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: right;
}
.caption-content-frame {
  overflow: hidden;
}
.caption-author {
  padding: 4px;
  color: white;
  background-image: linear-gradient(to left, black 100%, white 100%);
  line-height: 2.2rem;
  font-weight: 600;
  text-shadow: 1px 1px 0 alpha(rgba(0, 0, 0, 0.6));
}

.caption-date {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: black;
  background-image: linear-gradient(to left, white 100%, black 100%);
  font-size: 0.9rem;
  line-height: 2.2rem;
  text-shadow: 1px 1px 0 alpha(rgba(0, 0, 0, 0.6));
}
</style>
