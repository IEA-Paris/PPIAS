<template>
  <div>
    
    <a
      v-if="route.name.startsWith('print')"
      class="my-6 d-block w-100"
      :href="'https://www.youtube.com/watch?v=' + yt"
    >
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
    </a>
    <div v-else>
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
            'modestbranding=2&rel=0&enablejsapi=1' +
            (start ? '&start=' + start : '') +
            (stop ? '&stop=' + stop : '')
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
  </div>
</template>
<script setup>

const { route } = useRoute()

const props = defineProps({
  yt: {
    type: String,
    default: '',
    required: true,
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
  start: {
    type: [String, Number],
    default: '',
    required: false,
  },
  stop: {
    type: [String, Number],
    default: '',
    required: false,
  },
})

const isIntersecting = ref(true)
const ytPlayer = ref(null)

const handleEvent = (event) => {
  /*  await ytPlayer[event]() */
}
</script>
<style lang="scss">
lite-youtube {
  max-width: none !important;
}
</style>
