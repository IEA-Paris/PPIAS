<template>
  <svg
    :class="'ArticleFingerprint position-absolute' + variant"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
  >
    <g :transform="'translate(' + size + '/ 2, ' + size + '/ 2)'">
      <!--      {debug ? ( // outer circle (narrative layer)
            <circle
              cx={0}
              cy={0}
              stroke="var(--gray-500)"
              fill="transparent"
              r={radius + maxNumCharsRadius}
            />
          ) : null}
          {debug ? ( // inner circle (hermeneutics layer)
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
      <circle :cx="0" :cy="0" stroke="var(--secondary)" fill="transparent" r="{baseRadius}" />
      <TextFingerprintCell
        v-for="(cell, index) in cells"
        :key="index"
        :theta="index * angleD - Math.PI / 2"
        :origin-radius="radius"
        :circle-radius="2.5"
        :offset-radius="
          // if isHermeneutic, inWard, if is heading is 0
          cell.isHermeneutic ? scaleNumChars(cell.countChars) * -1 : scaleNumChars(cell.countChars)
        "
        :refs-radius="cell.countRefs ? scaleNumRefs(cell.countRefs) : 0"
        :is-heading="cell.isHeading"
        :is-hermeneutic="cell.isHermeneutic"
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
      // this is the scale function linked to the total numbers of characters in a cell.
      // th scaled value is a number comprised between 0 and baseRadius
      // according to the number of characters
      scaleNumChars: 0,
      scaleNumRefs: 0,
    }
  },
  mounted() {
    this.radius = ((this.size / 2 - this.margin) * 2) / 3
    // value radius, this give us extra safety margin.
    this.maxNumCharsRadius = this.radius / 2
    this.maxNumRefsRadius = 5
    this.angleD = (Math.PI * 2) / (this.cells.length + 1)
    // this is the scale function linked to the total numbers of characters in a cell.
    // th scaled value is a number comprised between 0 and baseRadius
    // according to the number of characters
    this.scaleNumChars = scalePow() // linear, commented out
      // .exponent(1)
      // with powerscale, exponent 0.25
      .exponent(0.25)
      .domain((this.stats && this.stats.extentChars) || [0, 1])
      .range([0, this.maxNumCharsRadius])
    this.scaleNumRefs = scalePow()
      .exponent(1)
      .domain((this.stats && this.stats.extentRefs) || [0, 1])
      .range([1.5, this.maxNumRefsRadius])
  },
}
</script>
<style lang="scss"></style>
