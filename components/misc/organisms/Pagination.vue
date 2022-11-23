<template>
  <div>
    <!-- Left side -->
    <v-btn
      min-width="35"
      height="35"
      width="35"
      class="mr-2"
      text
      outlined
      :disabled="value === 1"
      @click="handleClick(value - 1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <!-- Numbers -->
    <v-btn
      v-for="index in length"
      :key="index"
      min-width="35"
      height="35"
      width="35"
      text
      :plain="value !== index"
      tile
      outlined
      :class="{ selected: value === index }"
      class="mr-2 paginate-btn"
      :to="index > 1 ? `/articles/?page=${index}` : '/articles/'"
      nuxt
      @click="handleClick(index)"
    >
      {{ index }}
    </v-btn>
    <!-- Right side -->
    <v-btn
      min-width="35"
      height="35"
      width="35"
      text
      outlined
      :disabled="value === length"
      @click="handleClick(value + 1)"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    totalVisible: {
      type: Number,
      default: 5,
      required: false,
    },
    value: {
      type: Number,
      default: 1,
      required: false,
    },
    length: {
      type: Number,
      default: 1,
      required: false,
    },
  },

  methods: {
    handleClick(page) {
      this.$emit('input', page)
    },
  },
}
</script>
<style>
.paginate-btn.selected {
  background-color: black;
  color: white;
}
</style>
