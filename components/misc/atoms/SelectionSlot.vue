<template>
  <div>
    <v-chip v-if="index < maxItems" outlined label>
      <span>{{ text }}</span>
    </v-chip>
    <v-tooltip v-else-if="index === maxItems" bottom>
      <template #activator="{ on, attrs }">
        <span class="caption" v-bind="attrs" v-on="on"
          >&nbsp;( {{ $t('pls-x-more', [items.length - maxItems]) }})</span
        >
      </template>
      <span>{{ remainingItems }}</span>
    </v-tooltip>
  </div>
</template>

<script setup>
import truncate from '~/assets/utils/truncate'

const props = defineProps({
  items: Array,
  index: Number,
  maxItems: Number,
  item: [Object, String, Number],
})

const text = computed(() => {
  const str = typeof props.item === 'object' ? props.item.text : props.item
  return str.length > 18 ? truncate(str, 18) : str
})

const remainingItems = computed(() => (
  props.items
    .slice(props.maxItems)
    .map((item) => (typeof item === 'object' ? item.text : item), 18)
    .join(', ') || []
))
</script>
