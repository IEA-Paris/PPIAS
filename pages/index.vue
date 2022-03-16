<template>
  <PageContainer>
    <v-row justify="center">
      <PageTitle :text="$config.full_name" />
      <v-col cols="12" md="8" lg="6" xl="5">
        <nuxt-content :document="page" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <!--   Latest issue -->
        <div class="text-h6">{{ $t('latest-issue') }}</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6" xl="5">
        <!--  Featured articles -->
        <div class="text-h6">{{ $t('featured-articles') }}</div>
      </v-col>
    </v-row>
  </PageContainer>
</template>
<script>
export default {
  props: {},
  async asyncData({ $content }) {
    const page = await $content('pages/about').fetch()
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
