<template>
  <div>
    <!-- Left side -->
    <v-btn
      min-width="35"
      height="35"
      width="35"
      class="mr-2"
      elevation="5"
      :disabled="value === 1"
      @click="handleClick(value - 1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <!-- Numbers -->
    <v-btn
      v-for="index in length"
      :key="index"
      light
      min-width="35"
      height="35"
      width="35"
      class="mr-2"
      elevation="5"
      :color="value === index ? 'black' : 'white'"
      :class="value === index ? 'white--text' : ''"
      :href="index > 1 ? `/articles/?page=${index}` : '/articles/'"
      nuxt
      @click.stop="handleClick(index)"
    >
      {{ index }}
    </v-btn>
    <!-- Right side -->
    <v-btn
      min-width="35"
      height="35"
      width="35"
      elevation="5"
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
