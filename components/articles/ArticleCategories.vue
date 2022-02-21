<template>
  <div>
    <v-chip
      v-if="item.category_1 && item.category_1.path"
      :color="item.category_1.color"
      label
      class="white--text"
      v-bind="$attrs"
    >
      {{ item.category_1.path.slice(12) }}
    </v-chip>
    <v-chip
      v-if="item.category_2 && item.category_2.path"
      :color="item.category_2.color"
      label
      class="white--text"
      v-bind="$attrs"
    >
      {{ item.category_2.path.slice(12) }}
    </v-chip>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
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
