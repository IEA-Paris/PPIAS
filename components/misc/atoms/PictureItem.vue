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
<script>
// export component
export default {
  props: {
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
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    hasContent(slot) {
      return !!this.$slots[slot]
    },
  },
}
</script>

<style scoped></style>
