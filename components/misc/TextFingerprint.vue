<template>
  <svg
    :class="'ArticleFingerprint d-absolute' + variant"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
  >
    <g :transform="'translate(' + size / 2 + ', ' + size / 2 + ')'">
      <!--      {debug ? ( // outer circle (narrative layer)
            <circle
              cx={0}
              cy={0}
              stroke="var(--gray-500)"
              fill="transparent"
              r={radius + maxNumCharsRadius}
            />
          ) : null}
          {debug ? ( // inner circle (medias layer)
            <circle
              cx={0}
              cy={0}
              stroke="var(--primary)"
              fill="transparent"
              r={radius - maxNumCharsRadius}
            />
          ) : null}
          {debug ? ( // baseRadius
            <circle
              cx={0}
              cy={0}
              stroke="var(--secondary)"
              fill="transparent"
              r={radius}
            />
          ) : null} -->
      <circle :cx="0" :cy="0" stroke="var(--secondary)" fill="transparent" :r="radius" />
      <TextFingerprintCell
        v-for="(cell, index) in cells"
        :key="index"
        :theta="index * angleD - Math.PI / 2"
        :origin-radius="radius"
        :circle-radius="2.5"
        :offset-radius="
          // if isMedia, inWard, if is heading is 0
          cell.isMedia ? scaleNumChars() * -1 : scaleNumChars()
        "
        :refs-radius="cell.countRefs ? scaleNumRefs() : 0"
        :is-heading="cell.isHeading"
        :is-media="cell.isMedia"
        :is-metadata="cell.isMetadata"
        :is-figure="cell.isFigure"
        :is-table="cell.isTable"
        :type="cell.type"
        :idx="index"
        :debug="debug"
      />
    </g>
  </svg>
</template>
<script>
import { scalePow } from 'd3-scale'

// export component
export default {
  props: {
    stats: {
      required: false,
      type: Object,
      default: () => {},
    },
    cells: {
      required: true,
      type: Array,
      default: () => [],
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
      default: 20,
    },
    variant: {
      required: false,
      type: String,
      default: '',
    },
  },
  data() {
    return {
      radius: ((this.size / 2 - this.margin) * 2) / 3,
      // value radius, this give us extra safety margin.
      maxNumCharsRadius: this.radius / 2,
      maxNumRefsRadius: 5,
      angleD: (Math.PI * 2) / (this.cells.length + 1),
      scaleNumChars: scalePow() // linear, commented out
        // .exponent(1)
        // with powerscale, exponent 0.25
        .exponent(0.25)
        .domain((this.stats && this.stats.extentChars) || [0, 1])
        .range([0, this.maxNumCharsRadius]),
      scaleNumRefs: scalePow() // linear, commented out
        // .exponent(1)
        // with powerscale, exponent 0.25
        .exponent(0.25)
        .domain((this.stats && this.stats.extentChars) || [0, 1])
        .range([0, this.maxNumCharsRadius]),
    }
  },
  mounted() {
    console.log('cells', this.cells)
  },
  methods: {
    // this is the scale function linked to the total numbers of characters in a cell.
    // th scaled value is a number comprised between 0 and baseRadius
    // according to the number of characters
  },
}
</script>
<style lang="scss"></style>
