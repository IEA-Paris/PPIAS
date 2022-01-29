<template>
  <div>
    <v-chip v-if="index < maxItems" outlined label>
      <span>{{ text }}</span>
    </v-chip>
    <span v-if="index === maxItems" class="caption"
      >&nbsp;(+{{ selection.length - maxItems }}
      {{ $tc('misc.other', selection.length - maxItems) }})</span
    >
  </div>
</template>

<script>
import truncate from '~/assets/utils/truncate'
export default {
  props: {
    item: {
      type: [Object, String],
      default: () => ({}),
    },
    selection: {
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
  },

  computed: {
    text() {
      return truncate(
        typeof this.item === 'object' ? this.item.text : this.item,
        18
      )
    },
  },
}
</script>
