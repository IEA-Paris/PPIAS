<template>
  <aside id="toc" class="toc">
    <div
      v-show="title"
      class="text-h6 mt-3 mb-6 mr-4 shadow"
      transition="scale-transition"
    >
      {{ title }}
    </div>
    <v-timeline align-top dense reverse class="toc">
      <v-timeline-item
        v-for="(link, index) of toc"
        :key="link.id"
        :ref="'toc_' + activeToc"
        :small="link.depth !== 2"
        class="pb-0 toc-item"
        :class="link.depth === 2 && index > 0 ? ' mt-6' : ''"
        :color="link.id === activeToc ? 'primary' : 'grey'"
      >
        <!--   TODO add space -->
        <a
          :id="'toc_' + link.id"
          v-intersect="onIntersect"
          class="text-overline py-1"
          :class="[
            link.id === activeToc ? '' : 'text--secondary',
            link.depth === 2 ? ' font-weight-bold' : ' font-weight-regular',
            { 'font-italic': link.isMedia },
          ]"
          :color="link.id === activeToc ? 'primary' : 'grey'"
          nuxt
          :to="`#${link.id}`"
          @click="
            $vuetify.goTo('#' + link.id, { offset: 100 }) &&
              $router.replace({ hash: '#' + link.id })
          "
          @keyup.enter="
            $vuetify.goTo('#' + link.id, { offset: 100 }) &&
              $router.replace({ hash: '#' + link.id })
          "
        >
          {{ link.text }}
        </a>
        <template #icon>
          <v-avatar
            style="cursor: pointer"
            @click="
              $vuetify.goTo('#' + link.id, { offset: 100 }) &&
                $router.replace({ hash: '#' + link.id })
            "
            @keyup.enter="
              $vuetify.goTo('#' + link.id, { offset: 100 }) &&
                $router.replace({ hash: '#' + link.id })
            "
          >
            <v-icon v-if="link.isMedia" color="white" x-small>mdi-play</v-icon>
            <!--   <v-icon  :small="link.depth !== 2">mdi-pencil</v-icon> -->
          </v-avatar>
        </template>
      </v-timeline-item>
    </v-timeline>
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          text
          outlined
          class="justify-self-center my-6"
          v-bind="attrs"
          :href="
            customPdf && customPdf.length
              ? customPdf
              : '/pdfs/' + $route.params.slug + '.pdf'
          "
          nuxt
          target="_blank"
          :title="title"
          v-on="on"
        >
          <v-icon left>mdi-download</v-icon>
          PDF version
        </v-btn>
      </template>
      <span>{{ $t('download-this-article-as-a-pdf-file') }}</span>
    </v-tooltip>
  </aside>
</template>
<script>
export default {
  props: {
    toc: {
      type: Array,
      required: true,
      default: () => [],
    },
    title: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    activeToc: {
      type: String,
      required: false,
      default: '',
    },
    customPdf: {
      type: [Boolean, String],
      required: true,
      default: '',
    },
  },
  data() {
    return {
      scrolling: false,
      intersected: {},
    }
  },
  computed: {},
  async updated() {
    console.log('UPDATED')
    if (
      this.activeToc &&
      !this.scrolling &&
      !this.intersected['toc_' + this.activeToc]
    ) {
      const currentRef = '#toc_' + this.activeToc
      this.scrolling = true
      await this.$vuetify.goTo(currentRef, {
        container: '#toc',
        offset: 100,
        easing: 'easeInOutQuint',
      })
      this.scrolling = false
    }
  },
  mounted() {},
  methods: {
    onIntersect(entries, observer) {
      this.intersected[entries[0].target.id] = entries[0].isIntersecting
    },
  },
}
</script>
<style>
/* .container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  border: 2px dashed rgba(114, 186, 94, 0.35);
  height: 400px;
  background: rgba(114, 186, 94, 0.05);
}
.item {
  position: sticky;
  top: 4em;
} */

aside.toc {
  position: sticky;
  top: 10px;
  width: inherit;
  left: 250;
  margin-top: 6.5rem;
  margin-left: 25px;
  align-self: start;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scroll-snap-type: y;
}
.toc-item:hover .v-timeline-item__body a {
  color: black !important;
}
.toc-item:hover .v-timeline-item__inner-dot {
  background-color: black !important;
}
#default-toc li.router-link-active {
  border-left-color: currentColor;
}
.v-application--is-ltr .toc.v-timeline--reverse.v-timeline--dense::before {
  right: 18px;
}

#default-toc.theme--dark li:not(.router-link-active) {
  border-left-color: hsla(0, 0%, 100%, 0.5);
}
.toc .v-timeline-item__divider {
  min-width: 36px;
}
.toc.v-timeline--dense .v-timeline-item__body {
  max-width: calc(100% - 36px);
}
.toc .v-timeline-item__dot {
  box-shadow: none;
}
.v-timeline-item__body {
  padding-right: 0.5rem;
  padding-bottom: 0.2rem;
}
.v-timeline-item__body .text-overline {
  line-height: 1rem;
}
.v-timeline-item {
  display: flex;
  align-items: center;
}
@supports (scroll-snap-type: y mandatory) {
  aside.toc {
    scroll-snap-type: y;
  }
  .v-timeline-item {
    scroll-snap-align: center;
  }
}
</style>
