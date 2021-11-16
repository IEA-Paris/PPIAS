<template>
  <g :class="isHeading ? 'is-heading' : '' + isHermeneutic ? 'is-hl' : '' + 'type-' + type">
    <line :x1="ox" :y1="oy" :x2="cx" :y2="cy" />
    <circle class="origin" :cx="ox" :cy="oy" :r="1" />
    <circle v-if="isHeading" class="heading-placeholder" :cx="ox" :cy="oy" :r="5" />
    <circle
      v-if="refsRadius"
      class="refs"
      :cx="cosTheta * (offsetRadius + origin - radius + refs - radius + 5)"
      :cy="sinTheta * (offsetRadius + origin - radius + refs - radius + 5)"
      :r="refsRadius"
    />
    <circle :cx="cx" :cy="cy" :r="circleRadius" />
  </g>
</template>
<script>
// export component
export default {
  props: {
    type: {
      type: String,
      required: true,
      default: 'markdown',
    },
    theta: {
      type: Number,
      required: true,
      default: 0,
    },
    originRadius: {
      type: Number,
      required: true,
      default: 100,
    },
    offsetRadius: {
      type: Number,
      required: true,
      default: 10,
    },
    circleRadius: {
      type: Number,
      required: true,
      default: 2.5,
    },
    refsRadius: {
      type: Number,
      required: true,
      default: 0,
    },
    isHeading: {
      type: Boolean,
      required: true,
      default: false,
    },
    isHermeneutic: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      cosTheta: Math.cos(this.theta),
      sinTheta: Math.sin(this.theta),
      // position in x,y of the center of the small circle representing the Cell
      cx: this.cosTheta * (this.offsetRadius + this.originRadius),
      cy: this.sinTheta * (this.offsetRadius + this.originRadius),
      // coordinates in x y of the origin
      ox: this.cosTheta * this.originRadius,
      oy: this.sinTheta * this.originRadius,
    }
  },
}
</script>
<style lang="scss"></style>
