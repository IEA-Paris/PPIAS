<template>
  <div>
    <v-chip
      v-if="item.category_1"
      :color="item.category_1.color"
      label
      class="white--text"
    >
      {{ item.category_1.name }}
    </v-chip>
    <v-chip
      v-if="item.category_2"
      :color="item.category_2.color"
      label
      class="white--text"
    >
      {{ item.category_2.name }}
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
