<template>
  <g :class="(isHeading ? 'is-heading' : '') + (isMedia ? 'is-hl' : '') + 'type-' + type">
    <line :x1="ox" :y1="oy" :stroke="isHeading ? 'white' : '#FFFFF0'">
      <animateTransform
        id="pause"
        begin="expandAnim.end"
        dur="3s"
        type="translate"
        attributeType="XML"
        attributeName="transform"
        repeatCount="indefinite"
      />
      <animateTransform
        id="pause2"
        begin="pause.end"
        dur="3s"
        type="translate"
        attributeType="XML"
        attributeName="transform"
        repeatCount="indefinite"
      />
      <animate
        id="expandAnim"
        attributeName="x2"
        :from="cx"
        :to="cosTheta * (offsetRadius + originRadius + (isHeading ? -10 : 10))"
        dur="3s"
        begin="0; pause.end"
        repeatCount="indefinite"
      />
      <animate
        fill="freeze"
        attributeName="y2"
        :from="cy"
        :to="sinTheta * (offsetRadius + originRadius + (isHeading ? -10 : 10))"
        dur="3s"
        begin="0; pause.end"
        repeatCount="indefinite"
      />
      <animate
        id="collapseAnim"
        attributeName="x2"
        fill="freeze"
        :from="cosTheta * (offsetRadius + originRadius + (isHeading ? -10 : 10))"
        :to="cx"
        dur="3s"
        begin="3; expandAnim.end"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y2"
        fill="freeze"
        :from="sinTheta * (offsetRadius + originRadius + (isHeading ? -10 : 10))"
        :to="cy"
        dur="3s"
        begin="3; expandAnim.end"
        repeatCount="indefinite"
      />
    </line>
    <circle class="origin" :cx="ox" :cy="oy" :r="1" />
    <circle v-if="isHeading" class="heading-placeholder" :cx="ox" :cy="oy" :r="3" />
    <circle
      v-if="refsRadius"
      class="refs"
      :class="isMedia ? 'is-hl' : ''"
      :cx="cosTheta * (offsetRadius + originRadius + refsRadius + 5)"
      :cy="sinTheta * (offsetRadius + originRadius + refsRadius + 5)"
      :r="refsRadius"
    />

    <path
      :id="'circlePath' + Math.round((theta + index + offsetRadius) * 1000)"
      :d="
        'M' +
        cx +
        ',' +
        cy +
        ' L' +
        cosTheta * (offsetRadius + originRadius + (isHeading ? -10 : 10)) +
        ',' +
        sinTheta * (offsetRadius + originRadius + (isHeading ? -10 : 10)) +
        ' L' +
        cx +
        ',' +
        cy
      "
      fill="none"
    />
    <circle :r="circleRadius">
      <animateMotion dur="6s" repeatCount="indefinite" fill="freeze">
        <mpath :xlink:href="'#circlePath' + Math.round((theta + index + offsetRadius) * 1000)" />
      </animateMotion>
    </circle>
  </g>
</template>
<script>
// export component
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'markdown',
    },
    index: {
      type: Number,
      required: false,
      default: 0,
    },
    theta: {
      type: Number,
      required: false,
      default: 0,
    },
    originRadius: {
      type: Number,
      required: false,
      default: 100,
    },
    radius: {
      type: Number,
      required: false,
      default: 100,
    },
    offsetRadius: {
      type: Number,
      required: false,
      default: 10,
    },
    circleRadius: {
      type: Number,
      required: false,
      default: 2.5,
    },
    refsRadius: {
      type: Number,
      required: false,
      default: 0,
    },
    isHeading: {
      type: Boolean,
      required: false,
      default: false,
    },
    isMedia: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      cosTheta: Math.cos(this.theta),
      sinTheta: Math.sin(this.theta),
      // position in x,y of the center of the small circle representing the Cell
      cx: Math.cos(this.theta) * (this.offsetRadius + this.originRadius),
      cy: Math.sin(this.theta) * (this.offsetRadius + this.originRadius),
      // coordinates in x y of the origin
      ox: Math.cos(this.theta) * this.originRadius,
      oy: Math.sin(this.theta) * this.originRadius,
    }
  },
}
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
