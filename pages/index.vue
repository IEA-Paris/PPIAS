<template>
  <div v-scroll="onScroll">
    <IssueSwitcher></IssueSwitcher>
    <Section title="latest" />
    <Section title="events" alt />
    <Section title="research" />
    <Section title="library" />
  </div>
</template>
<script>
export default {
  async asyncData({ $content, params, route }) {
    const issue = await $content('issues')
      .where({ number: route?.query?.issue || 0, published: true })
      .fetch()
    return {
      issue,
    }
  },
  data() {
    return {
      scrolled: false,
    }
  },
  methods: {
    onScroll() {
      this.$store.commit('setScrolled')
    },
  },
}
</script>
