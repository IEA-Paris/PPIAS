<template>
  <PageContainer no-resize>
    <PageTitle :text="$t('contact')" />
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
  async asyncData({ app, $content, store }) {
    const page = await $content('pages/' + app.i18n.locale + '/contact').fetch()
    return {
      page,
    }
  },
  data() {
    return {}
  },

  computed: {},
  watch: {
    '$i18n.locale': '$fetch',
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
