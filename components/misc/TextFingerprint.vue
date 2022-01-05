<template>
  <div class="frame">
    <div class="overlay">
      <div class="top">
        <div class="d-flex">
          <slot name="categories"></slot>
        </div>

        <span id="caption-content">
          <slot name="caption"></slot>
          <br />
        </span>
        <div id="caption-author">
          <slot name="author"></slot>
          <div></div>
        </div>
      </div>
      <div class="bottom">
        <span id="caption-date">
          <slot name="date"></slot>
        </span>
      </div>
    </div>
    <svg
      :class="'article-fingerprint d-flex' + variant"
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      @mouseenter="trigger()"
      @animationend="finishedAnimation($event)"
      @focusin="trigger()"
    >
      <rect id="overlay" width="100%" height="100%" fill="url(#g1)" />
      <!--  handled by parent component css  
       <linearGradient id="g1" x1="1" y1="1" x2="0">
        <stop stop-color="#2d3436" />
        <stop offset=".74" stop-color="#000000" />
      </linearGradient> -->
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
        <circle fill="url(#bgGradient)" :cx="0" :cy="0" :r="radius" />
        <template v-for="(cell, index) in cells">
          <TextFingerprintCell
            v-if="cell.value !== '\n'"
            :key="index"
            :index="index"
            :theta="index * angleD - Math.PI / 2"
            :origin-radius="radius"
            :circle-radius="scaleNumChars(cell.countChars) / 10"
            :offset-radius="
              // if isMedia, inWard, if is heading is 0
              cell.isHeading
                ? scaleNumChars(cell.countChars) * -1
                : cell.isMedia
                ? scaleNumChars()
                : scaleNumChars(cell.countChars) * 1
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
            :radius="radius"
          />
        </template>
      </g>
    </svg>
  </div>
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
      default() {
        return (this.size / 100) * 20
      },
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
  mounted() {},
  methods: {
    scaleNumChars(n = this.maxNumCharsRadius / 2) {
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

<style scoped>
.frame {
  background: linear-gradient(315deg, #2d3436 0%, #000000 74%);
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 2;
  justify-content: space-between;
}
.top {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  text-align: right;
}
.article-fingerprint {
  transform-box: fill-box;
  transform-origin: center;
  overflow: visible;
}

@-webkit-keyframes breathing {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  40% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  55% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes breathing {
  0% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  40% {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  55% {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }

  100% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
}

.overlay:hover + .article-fingerprint {
  -webkit-animation: breathing 5s ease-out infinite normal;
  animation: breathing 5s ease-out infinite normal;
}
#caption-content,
#caption-author,
#caption-date {
  background-position: 0;
  background-size: 200%;
  transition: all 0.6s ease-in;
  text-align: right;
  text-decoration: none;
  max-width: 66%;
}
#caption-content {
  font-size: 1.1rem;
  line-height: 1.6rem;
  text-decoration: none;
  text-shadow: 1px 1px 0 alpha(white, 0.6);
  padding: 12px;
  color: black;
  background-image: linear-gradient(to left, white 100%, black 100%);
  text-transform: uppercase;
}
#caption-author {
  padding: 4px;
  color: white;
  background-image: linear-gradient(to left, black 100%, white 100%);
  line-height: 2.2rem;
  font-weight: 600;
  text-shadow: 1px 1px 0 alpha(black, 0.6);
}

#caption-date {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: black;
  background-image: linear-gradient(to left, white 100%, black 100%);
  font-size: 1.1rem;
  line-height: 2.2rem;
  text-shadow: 1px 1px 0 alpha(black, 0.6);
}
#caption-author:after {
  content: '';
  width: 60px;
  height: 2px;
  background: rgb(76, 175, 80);
  z-index: 3;
  display: flex;
}
</style>
