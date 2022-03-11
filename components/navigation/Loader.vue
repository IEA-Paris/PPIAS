<template>
  <div class="">
    <div class="box">
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="left"></div>
      <div class="right"></div>

      <v-img
        src="/logo_g.png"
        contain
        max-height="200"
        max-width="200"
        style="cursor: pointer"
      ></v-img>
    </div>
    <!--     <v-sheet class="d-flex justify-center loading mt-6">
      {{ $t('loading') }}
    </v-sheet> -->
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
.loading {
  margin: 20px;
  font-size: 36px;
  color: #75757546 !important;
}

.loading:after {
  display: inline-block;
  animation: dotty steps(1, end) 1s infinite;
  content: '';
  color: #75757546;
}
.loading:before {
  display: inline-block;
  animation: dotty steps(1, end) 1s infinite;
  content: '';
  visibility: hidden;
  color: #75757546;
}
@keyframes dotty {
  0% {
    content: '';
  }
  25% {
    content: '.';
  }
  50% {
    content: '..';
  }
  75% {
    content: '...';
  }
  100% {
    content: '';
  }
}
.box {
  position: relative;
  width: 212px;
  height: 212px;
  margin: 0 auto;
  border: 6px solid transparent;
  padding: 3px;
}

.top,
.bottom,
.left,
.right {
  position: absolute;
  -webkit-animation: 8s ease-in-out infinite;
  animation: 8s ease-in-out infinite;
  background: #75757546;
}
.top {
  top: -3px;
  left: -3px;
  height: 6px;
  -webkit-animation-name: top;
  animation-name: top;
}
@keyframes top {
  25% {
    width: 0;
  }
  38% {
    width: calc(103%);
  }
  50% {
  }
  62% {
  }
  75% {
    width: calc(103%);
  }
  88% {
    left: auto;
    right: -3px;
    width: 0;
  }
}
@-webkit-keyframes top {
  25% {
    width: 0;
  }
  38% {
    width: calc(103%);
  }
  50% {
  }
  62% {
  }
  75% {
    width: calc(103%);
  }
  88% {
    left: auto;
    right: -3px;
    width: 0;
  }
}

.bottom {
  bottom: -3px;
  right: -3px;
  height: 6px;
  -webkit-animation-name: bottom;
  animation-name: bottom;
}
@keyframes bottom {
  0% {
    width: 0;
  }
  12% {
    width: calc(103%);
  }
  25% {
  }
  38% {
  }
  50% {
    width: calc(103%);
  }
  62% {
    left: -3px;
    width: 0;
  }
  75% {
  }
}
@-webkit-keyframes bottom {
  0% {
    width: 0;
  }
  12% {
    width: calc(103%);
  }
  25% {
  }
  38% {
  }
  50% {
    width: calc(103%);
  }
  62% {
    left: -3px;
    width: 0;
  }
  75% {
  }
}

.left {
  bottom: -3px;
  left: -3px;
  width: 6px;
  -webkit-animation-name: left;
  animation-name: left;
}
@keyframes left {
  12% {
    height: 0;
  }
  25% {
    height: calc(103%);
  }
  38% {
  }
  50% {
  }
  62% {
    height: calc(103%);
  }
  75% {
    top: -3px;
    height: 0;
  }
  88% {
  }
}

@-webkit-keyframes left {
  12% {
    height: 0;
  }
  25% {
    height: calc(103%);
  }
  38% {
  }
  50% {
  }
  62% {
    height: calc(103%);
  }
  75% {
    top: -3px;
    height: 0;
  }
  88% {
  }
}
.right {
  top: -3px;
  right: -3px;
  width: 6px;
  -webkit-animation-name: right;
  animation-name: right;
}
@keyframes right {
  38% {
    height: 0;
  }
  50% {
    height: calc(103%);
  }
  62% {
  }
  75% {
  }
  88% {
    height: calc(103%);
  }
  100% {
    top: auto;
    bottom: -3px;
    height: 0;
  }
}
@-webkit-keyframes right {
  38% {
    height: 0;
  }
  50% {
    height: calc(103%);
  }
  62% {
  }
  75% {
  }
  88% {
    height: calc(103%);
  }
  100% {
    top: auto;
    bottom: -3px;
    height: 0;
  }
}
</style>
