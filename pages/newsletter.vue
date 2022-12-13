<template>
  <PageContainer no-resize>
    <PageTitle :text="$t('newsletter')" />
    <v-row justify="center">
      <v-col>
        <!--  <nuxt-content :document="page" /> -->
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script>
export default {
  props: {},
  async asyncData({ $content }) {
    /*  const page = await $content('pages/newsletter').fetch()
    return {
      page,
    } */
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
