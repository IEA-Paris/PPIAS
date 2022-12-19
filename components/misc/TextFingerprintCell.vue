<template>
  <g
    :class="
      (isHeading ? 'is-heading' : '') +
      (isMedia ? 'is-hl' : '') +
      'type-' +
      type
    "
  >
    <line
      :x1="ox"
      :y1="oy"
      :x2="cx"
      :y2="cy"
      :stroke="isHeading ? 'white' : '#FFFFF0'"
    ></line>
    <circle class="origin" :cx="ox" :cy="oy" :r="1" />
    <circle
      v-if="isHeading"
      class="heading-placeholder"
      :cx="ox"
      :cy="oy"
      :r="3"
    />
    <circle
      v-if="refsRadius"
      class="refs"
      :class="isMedia ? 'is-hl' : ''"
      :cx="cosTheta * (offsetRadius + originRadius + refsRadius + 5)"
      :cy="sinTheta * (offsetRadius + originRadius + refsRadius + 5)"
      :r="refsRadius"
    />

    <circle :cx="cx" :cy="cy" :r="circleRadius"></circle>
  </g>
</template>
<script setup>

const props = defineProps({
  item: {
    required: false,
    type: Object,
    default: () => {},
  },
  size: {
    required: false,
    type: Number,
    default: 100,
  },
  debug: {
    required: false,
    type: Boolean,
    default: false,
  },
  margin: {
    required: false,
    type: Number,
    default() {
      return (this.size / 100) * 30
    },
  },
  variant: {
    required: false,
    type: String,
    default: '',
  },
})

const cosTheta = ref(Math.cos(props.theta))
const sinTheta = ref(Math.sin(props.theta))

const cx = ref(Math.cos(props.theta) * (props.offsetRadius + props.originRadius))
const cy = ref(Math.sin(props.theta) * (props.offsetRadius + props.originRadius))

const ox = ref(Math.cos(props.theta) * props.originRadius)
const oy = ref(Math.sin(props.theta) * props.originRadius)
</script>
<style lang="scss">
.origin {
  /*   fill: black; */
}
.is-hl {
  fill: white;
  stroke: white;
}

.heading-placeholder {
  fill: transparent;
  stroke: white;
}
circle {
  fill: transparent;
  stroke: white;
}
</style>
