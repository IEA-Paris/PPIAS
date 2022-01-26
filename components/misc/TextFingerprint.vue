<template>
  <Item>
    <template v-if="hasContent('categories')" #categories>
      <slot name="categories"></slot>
    </template>
    <template v-if="hasContent('caption')" #caption>
      <slot name="caption"></slot>
    </template>
    <template v-if="hasContent('author')" #author>
      <slot name="author"></slot>
    </template>
    <template v-if="hasContent('date')" #date>
      <slot name="date"></slot>
    </template>
    <template #content>
      <svg
        class="article-fingerprint d-flex"
        :class="{ item: hasContent('author') }"
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="'-' + size / 2 + ' -' + size / 2 + ' ' + size + ' ' + size"
      >
        <rect id="overlay" width="100%" height="100%" fill="url(#g1)" />
        <!--  handled by parent component css  
       <linearGradient id="g1" x1="1" y1="1" x2="0">
        <stop stop-color="#2d3436" />
        <stop offset=".74" stop-color="#000000" />
      </linearGradient> -->
        <g>
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
    </template>
  </Item>
</template>
<script>
import { scalePow } from 'd3-scale'
// export component
export default {
  props: {
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
  },
  data() {
    return {
      cells: this.item?.body?.children.map((child, index) => {
        return {
          ...child,
          countChars: this.item.countMap[index],
          countRefs: Math.floor(this.item.countRefs[index]),
        }
      }),
      stats: {
        countRefs: Math.floor(this.item?.countRefs?.length / 2),
        countLines: this.item?.countMap?.length,
        countChars: this.item?.countMap.reduce(
          (partialSum, a) => partialSum + a,
          0
        ),
        countContributors: 3,
        countHeadings: this.item?.toc?.length,
        countMediaCells: 2,
        countCodeCells: 10,
        countCells: this.item.body.children.length,
        extentChars: [
          Math.min(...this.item.countMap),
          Math.max(...this.item.countMap),
        ],
        extentRefs: [
          Math.min(...this.item.countRefs),
          Math.max(...this.item.countRefs),
        ],
      },
      radius: ((this.size / 2 - this.margin) * 2) / 3,
      // value radius, this give us extra safety margin.
      maxNumCharsRadius: ((this.size / 2 - this.margin) * 2) / 3 / 2,
      maxNumRefsRadius: 5,
      angleD: (Math.PI * 2) / (this.item?.body?.children.length + 1),
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
    hasContent(slot) {
      return !!this.$slots[slot]
    },
  },
}
</script>

<style scoped>
.article-fingerprint {
  transform-box: fill-box;
  transform-origin: center;
}
.article-fingerprint.item {
  position: absolute;
  top: 0;
  right: 0;
  width: 150%;
  height: 200%;
  -webkit-animation-name: spin;
  -webkit-animation-duration: 180s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: spin;
  -moz-animation-duration: 180s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: spin;
  -ms-animation-duration: 180s;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;
  animation-name: spin;
  animation-duration: 180s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
}

/* .overlay:not(:hover) + .article-fingerprint.item {
  filter: blur(4px);
}
.overlay:hover + .article-fingerprint.item + svg {
  filter: blur(0px);
} */
.overlay:not(:hover) + .article-fingerprint.item {
  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused;
}

.overlay:hover + .article-fingerprint.item {
  -webkit-animation-play-state: running;
  -moz-animation-play-state: running;
  -o-animation-play-state: running;
  animation-play-state: running;
}
/* 
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
    transform: scale(1.1); * 2
  }

  100% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
} */
@-ms-keyframes spin {
  from {
    -ms-transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
  }
}

@-moz-keyframes spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
