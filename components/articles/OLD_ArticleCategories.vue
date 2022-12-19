<template>
  <span>
    <v-chip
      v-if="item.category_1 && item.category_1.title"
      :color="item.category_1.color"
      label
      class="white--text"
      v-bind="$attrs"
    >
      {{ item.category_1.title }}
    </v-chip>
    <v-chip
      v-if="item.category_2 && item.category_2.title"
      :color="item.category_2.color"
      label
      class="white--text"
      v-bind="$attrs"
    >
      {{ item.category_2.title }}
    </v-chip>
  </span>
</template>
<script setup>

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => {},
  },
})
</script>
<style lang="scss"></style>
