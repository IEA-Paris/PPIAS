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
        </div>
      </div>
      <div class="bottom">
        <span id="caption-date">
          <slot name="date"></slot>
        </span>
      </div>
    </div>
    <div class="yt-content">
      <Youtube :yt="item.yt" nocontrols autoplay />
    </div>
  </div>
</template>
<script>
// export component
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style>
.frame {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: black;
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
.yt-content {
  flex: 1;
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
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-decoration: none;
  text-shadow: 1px 1px 0 alpha(white, 0.6);
  padding: 12px;
  color: black;
  background-image: linear-gradient(to left, rgba(255, 255, 255, 0.95) 100%, black 100%);
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
  font-size: 1.2rem;
  line-height: 2.2rem;
  text-shadow: 1px 1px 0 alpha(black, 0.6);
}
#caption-author.underline {
  width: 60px;
  height: 2px;
  z-index: 3;
  display: flex;
}
</style>
