<template>
  <client-only>
    <div>
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
    </div>
  </client-only>
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
  mounted() {
    console.log('CREATED', this.item)
  },
  methods: {},
}
</script>
<style lang="scss"></style>
