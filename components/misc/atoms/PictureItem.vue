<template>
  <Item>
    <template v-if="hasContent('categories')" #categories>
      <slot name="categories"></slot>
    </template>
    <template v-if="hasContent('caption')" #caption>
      <slot name="caption"></slot>
    </template>
    <template v-if="hasContent('author')" #author>
      <slot name="author"></slot>
    </template>
    <template v-if="hasContent('date')" #date>
      <slot name="date"></slot>
    </template>
    <template #content>
      <OptimizedImage :src="item.picture"></OptimizedImage>
    </template>
  </Item>
</template>
<script setup>
const slots = useSlots()
const props = defineProps({
  item: {
    required: false,
    type: Object,
    default: () => {},
  },
  size: {
    required: false,
    type: Number,
    default: 100,
  },
  ratio: { type: Number, default: 16 / 9 },
  height: { type: [Number, String], default: 600 },
  src: {
    type: String,
    default: '/img/header-bg.jpg',
  },
})
const router = useRouter()

const hasContent = (name) => {
  return !!slots[name]
}
</script>

<style scoped></style>
