<template>
  <nuxt-link :to="localePath('/authors/' + path)" @click="$emit('close')">
    <span v-html="item.formatedName"></span>
    <AuthorOrcidIdBadge
      v-if="item.social_channels && item.social_channels.orcid"
      :orcid="item.social_channels.orcid"
    ></AuthorOrcidIdBadge>
    {{ (separator && ',') || '' }}
  </nuxt-link>
</template>
<script setup>
import { formatAuthors, highlight } from '~/assets/utils/transforms'
import { getAuthorSlug } from '~/assets/utils/slugify'
import { useRootStore } from '~/store/root';
import { useI18n } from 'vue-i18n'

const rootStore = useRootStore()
const { t } = useI18n()
const localePath = useLocalePath()

const props = defineProps({
  item: {
    required: true,
    type: Object,
  },
  separator: {
    required: false,
    type: Boolean,
    default: false,
  },
})

const path = ref(getAuthorSlug(props.item))

const formatAuthorsProxy = () => {
  // TODO move the institution in v-list-subtitle
  return [
    highlight(
      formatAuthors([props.item], t, false, false),
      rootStore.getChildrenStore('articles').search || ''
    ),
    highlight(
      (props.item?.positions_and_institutions &&
        props.item?.positions_and_institutions[0] &&
        props.item.positions_and_institutions[0]?.institution) ||
        '',
      rootStore.getChildrenStore('articles').search || ''
    ),
  ]
}
</script>
<style lang="scss"></style>
