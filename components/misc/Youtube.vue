<template>
  <div v-intersect="onIntersect" style="position: relative; padding-bottom: 56.25%; height: 0">
    <iframe
      ref="ytPlayer"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
      :src="isIntersecting ? 'https://www.youtube.com/embed/' + yt : ''"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      :title="'youtube player ' + yt"
    ></iframe>
  </div>
</template>
<script>
export default {
  props: {
    yt: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isIntersecting: true,
    }
  },

  mounted() {},
  methods: {
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting
    },
  },
}
</script>
