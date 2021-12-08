<template>
  <iframe
    width="100%"
    height="166"
    scrolling="no"
    frameborder="no"
    allow="autoplay"
    :title="'soundcloud player ' + src"
    :src="
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' +
      src +
      '&color=%235c3190&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
    "
  ></iframe>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      requried: true,
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
