<template>
  <PageContainer no-resize>
    <PageTitle :text="$t('support')" />
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <nuxt-content :document="page" />
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script>
export default {
  props: {},
  async asyncData({ $content }) {
    const page = await $content('pages/support').fetch()
    return {
      page,
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
