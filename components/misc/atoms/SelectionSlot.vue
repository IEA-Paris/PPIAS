<template>
  <div>
    <v-chip v-if="index < maxItems" outlined label>
      <span>{{ text }}</span>
    </v-chip>
    <v-tooltip v-if="index === maxItems" bottom>
      <template #activator="{ on, attrs }">
        <span class="caption" v-bind="attrs" v-on="on"
          >&nbsp;( {{ $t('pls-x-more', [items.length - maxItems]) }})</span
        >
      </template>
      <span>{{ remainingItems }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import truncate from '~/assets/utils/truncate'
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      required: true,
    },
    maxItems: {
      type: Number,
      default: 3,
    },
    item: {
      type: [Object, String],
      default: () => ({}),
    },
  },

  computed: {
    text() {
      const str = typeof this.item === 'object' ? this.item.text : this.item
      return str.length > 18 ? truncate(str, 18) : str
    },
    remainingItems() {
      return (
        this.items
          .slice(this.maxItems)
          .map((item) => (typeof item === 'object' ? item.text : item), 18)
          .join(', ') || []
      )
    },
  },
}
</script>
