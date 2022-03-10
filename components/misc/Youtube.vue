<template>
  <div class="my-6 d-block w-100">
    <div
      style="position: relative; padding-bottom: 56.25%; height: 0"
      @focus="handleEvent('playVideo')"
      @mouseenter="handleEvent('playVideo')"
      @mouseleave="handleEvent('pauseVideo')"
      @blur="handleEvent('pauseVideo')"
    >
      <lite-youtube
        id="ytPlayer"
        ref="ytPlayer"
        :videoid="yt"
        :playlabel="caption"
        :params="
          (nocontrols ? 'controls=0&' : '') +
          'modestbranding=2&rel=0&enablejsapi=1'
        "
      ></lite-youtube>
      <!--       <iframe
        ref="ytPlayer"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
        :src="
          isIntersecting
            ? 'https://www.youtube.com/embed/' + yt + (autoplay ? '?autoplay=1&controls=0&mute=1' : '')
            : ''
        "
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        :title="caption"
      >
</iframe> -->
    </div>
    <div v-if="caption" class="text-caption">{{ caption }}</div>
  </div>
</template>
<script>
export default {
  props: {
    yt: {
      type: String,
      default: '',
    },
    nocontrols: {
      type: Boolean,
      default: false,
    },
    caption: {
      type: String,
      default: '',
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isIntersecting: true,
    }
  },

  mounted() {},
  methods: {
    handleEvent(event) {
      /*  await this.$refs.ytPlayer[event]() */
    },
  },
}
</script>
<style lang="scss">
lite-youtube {
  max-width: none !important;
}
</style>
