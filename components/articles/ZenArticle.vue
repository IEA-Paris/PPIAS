<template>
  <v-dialog
    v-model="zen"
    fullscreen
    hide-overlay
    eager
    scrollable
    transition="dialog-bottom-transition"
  >
    <template #activator="{ on: dialog, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            v-if="!print"
            text
            class="py-7 px-6"
            tile
            v-bind="attrs"
            :title="item.post_title"
            small
            @click="toogleZen()"
            v-on="{ ...tooltip, ...dialog }"
          >
            <v-icon>mdi-meditation</v-icon>
          </v-btn>
        </template>
        <span>Switch to zen mode</span>
      </v-tooltip>
    </template>

    <article
      ref="zenpanel"
      class="zenpanel d-flex flex-row fade-in page a4"
      style="background-color: white"
    >
      <div>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              v-if="!print"
              class="pa-7 ml-3 mt-4 closebtn"
              v-bind="attrs"
              tile
              icon
              large
              v-on="on"
              @click="toogleZen()"
            >
              <v-icon large>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('exit-zen-mode') }}</span>
        </v-tooltip>
      </div>

      <div
        class="d-flex flex-grow-1 justify-center"
        style="background-color: white"
      >
        <v-card flat align="center">
          <PageTitle :text="item.article_title" class="pa-6 article-title" />
          <v-card-text
            ref="zenreader"
            class="d-flex zenreader text-justify justify-self-center"
          >
            <nuxt-content :document="item" />
          </v-card-text>
        </v-card>
      </div>
    </article>
  </v-dialog>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    print: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      zen: this.print,
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    toogleZen() {
      if (this.zen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      } else if (this.$refs.zenpanel.requestFullscreen) {
        this.$refs.zenpanel.requestFullscreen()
      } else if (this.$refs.zenpanel.webkitRequestFullscreen) {
        this.$refs.zenpanel.webkitRequestFullscreen()
      } else if (this.$refs.zenpanel.mozRequestFullScreen) {
        this.$refs.zenpanel.mozRequestFullScreen()
      } else if (this.$refs.zenpanel.msRequestFullscreen) {
        this.$refs.zenpanel.msRequestFullscreen()
      }
      this.zen = !this.zen
    },
  },
}
</script>
<style scoped>
.zenreader,
.article-title {
  max-width: 650px;
  overflow: auto;
  background-color: white;
}
.zenpanel {
  overflow: auto;
}
.zenreader .index {
  display: none;
}
.closebtn {
  position: sticky;
  left: 0;
  top: 0;
}
.fade-in {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
  animation-duration: 1s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
