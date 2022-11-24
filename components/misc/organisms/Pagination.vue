<template>
  <div class="mt-2">
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
    <template v-if="length <= totalVisible">
      <v-btn
        v-for="index in length"
        :key="index"
        v-bind="getButtonNumberProps(index)"
        @click="handleClick(index)"
      >
        {{ index }}
      </v-btn>
    </template>
    <template v-else>
      <v-btn
        v-for="index in 2"
        :key="index"
        v-bind="getButtonNumberProps(index)"
        @click="handleClick(index)"
      >
        {{ index }}
      </v-btn>
      <!--  process if current index is between 2 and length - 2 -->
      <template v-if="value > 2 && value < length - 2">
        <span class="mr-2">...</span>
        <v-btn v-bind="getButtonNumberProps(value)">
          {{ value }}
        </v-btn>
        <span class="mr-2">...</span>
      </template>
      <template v-else><span class="mr-2">...</span></template>
      <v-btn
        v-for="index in [...Array(length).keys()].slice(length - 2, length)"
        :key="index"
        v-bind="getButtonNumberProps(index)"
        @click="handleClick(index)"
      >
        {{ index }}
      </v-btn>
    </template>
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
    getButtonNumberProps(index) {
      // Return props for button number
      return {
        minWidth: '35',
        height: '35',
        width: '35',
        text: true,
        plain: this.value !== index,
        tile: true,
        outlined: true,
        class: `mr-2 paginate-btn ${this.value === index ? 'selected' : ''}`,
      }
    },
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
