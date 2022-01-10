<template>
  <v-row class="transition-swing flex-row-reverse">
    <v-col cols="12" class="transition-swing pa-12">
      <CiteModal :item="item" text></CiteModal>

      <DoiBadge :doi="item.doi"></DoiBadge>
      <div class="overline mt-6">{{ $t('publication-date') }}</div>
      <div class="mb-6">
        {{
          new Date(item.date).toLocaleDateString('EN', {
            timezone: 'UTC',
          })
        }}
      </div>
      <div class="overline">{{ $t('keywords') }}</div>

      <div class="mb-6">
        <Tag
          v-for="(tag, index2) in sortedTags"
          :key="index2"
          small
          :tag="tag"
          :class="index2 === 0 ? 'my-1 mr-1' : 'ma-1'"
        ></Tag>
      </div>
      <div class="overline">{{ $t('abstract') }}</div>
      <div class="mb-6">
        <template v-if="item.abstract && item.abstract.length">
          {{ item.abstract }}
          <nuxt-link :to="localePath('/articles/' + $route.params.slug)">
            Read&nbsp;more
          </nuxt-link>
        </template>
        <template v-else>
          {{ $t('no-abstract-provided-for-this-article') }}
        </template>
      </div>
      <div class="overline">{{ $t('language') }}</div>
      <div class="mb-6">
        &nbsp;{{
          $t('this-article-is-in', { lang: $t(item.language || 'english') })
        }}
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    sortedTags() {
      return this.$route.query?.tags?.length
        ? this.item.tags.reduce((acc, tag) => {
            if (
              this.$route.query.tags &&
              this.$route.query.tags.includes(JSON.stringify(tag))
            ) {
              return [tag, ...acc]
            }
            return [...acc, tag]
          }, [])
        : this.item.tags
    },
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
