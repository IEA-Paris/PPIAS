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
      <template v-for="(cell, index) in cells">
        <TextFingerprintCell
          v-if="cell.value !== '\n'"
          :key="index"
          :theta="index * angleD - Math.PI / 2"
          :origin-radius="radius"
          :circle-radius="scaleNumChars(cell.countChars) / 10"
          :offset-radius="
            // if isMedia, inWard, if is heading is 0
            cell.isMedia ? scaleNumChars(cell.countChars) * -1 : scaleNumChars(cell.countChars) * 1
          "
          :refs-radius="cell.countRefs ? scaleNumRefs(cell.countRefs) : 0"
          :is-heading="cell.isHeading"
          :is-media="cell.isMedia"
          :is-metadata="cell.isMetadata"
          :is-figure="cell.isFigure"
          :is-table="cell.isTable"
          :type="cell.type"
          :idx="index"
          :debug="debug"
        />
      </template>
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
      default: 28,
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
      maxNumCharsRadius: ((this.size / 2 - this.margin) * 2) / 3 / 2,
      maxNumRefsRadius: 5,
      angleD: (Math.PI * 2) / (this.cells.length + 1),
    }
  },
  mounted() {
    console.log('cells', this.scaleNumChars(this.cells[2].countChars))
  },
  methods: {
    scaleNumChars(n) {
      const pow = scalePow() // linear, commented out
        // .exponent(1)
        // with powerscale, exponent 0.25
        .domain(this.stats.extentChars || [0, 1])
        .range([0, this.maxNumCharsRadius])
        .exponent(0.25)
      return pow(n)
    },
    scaleNumRefs(n) {
      const pow = scalePow() // linear, commented out
        // .exponent(1)
        // with powerscale, exponent 0.25
        .domain(this.stats.extentChars || [0, 1])
        .range([0, this.maxNumCharsRadius])
        .exponent(0.25)
      return pow(n)
    },
  },
}
</script>
<style lang="scss"></style>
