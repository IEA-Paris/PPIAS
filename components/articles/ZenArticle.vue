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
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            v-if="!print"
            class="pa-7 ml-3 mt-4 closebtn"
            v-bind="attrs"
            tile
            icon
            large
            fab
            fixed
            top
            left
            v-on="on"
            @click="toogleZen()"
          >
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('exit-zen-mode') }}</span>
      </v-tooltip>

      <div
        class="d-flex flex-grow-1 justify-center"
        style="background-color: white"
      >
        <v-card flat align="center">
          <PageTitle
            :text="item.article_title"
            class="pa-6 article-title w-100"
          />
          <v-card-text
            ref="zenreader"
            class="d-flex zenreader text-justify justify-self-center"
          >
            <ContentRenderer :value="item" class="nuxt-content" />
          </v-card-text>
          <v-card-actions class="mb-12">
            <v-spacer></v-spacer>
            <v-btn tile variant="outlined" @click="toogleZen()">
              <v-icon left color="black">mdi-exit-to-app</v-icon>
              {{ $t('exit-zen-mode') }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
    </article>
  </v-dialog>
</template>
<script setup>

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  print: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const zen = ref(props.print)
const zenpanel = ref(null)

const toogleZen = () => {
  if (zen.value) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  } else if (zenpanel.value.requestFullscreen) {
    zenpanel.value.requestFullscreen()
  } else if (zenpanel.value.webkitRequestFullscreen) {
    zenpanel.value.webkitRequestFullscreen()
  } else if (zenpanel.value.mozRequestFullScreen) {
    zenpanel.value.mozRequestFullScreen()
  } else if (zenpanel.value.msRequestFullscreen) {
    zenpanel.value.msRequestFullscreen()
  }
  zen.value = !zen.value
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
