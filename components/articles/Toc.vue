<template>
  <aside>
    <div v-show="title" class="text-h6 mb-3" transition="scale-transition">{{ title }}</div>
    <v-timeline align-top dense reverse class="toc">
      <v-timeline-item
        v-for="link of toc"
        :key="link.id"
        small
        class="pb-0 toc-item"
        :color="link.id === activeToc ? 'primary' : 'grey'"
      >
        <a
          class="text-caption py-1 font-weight-regular"
          :class="link.id === activeToc ? '' : 'text--secondary'"
          :color="link.id === activeToc ? 'primary' : 'grey'"
          nuxt
          :to="`#${link.id}`"
          @click="$vuetify.goTo('#' + link.id) && $router.replace({ hash: '#' + link.id })"
          @keyup.enter="$vuetify.goTo('#' + link.id) && $router.replace({ hash: '#' + link.id })"
        >
          {{ link.text }}
        </a>
        <template #icon>
          <v-avatar
            small
            @click="$vuetify.goTo('#' + link.id) && $router.replace({ hash: '#' + link.id })"
            @keyup.enter="$vuetify.goTo('#' + link.id) && $router.replace({ hash: '#' + link.id })"
          ></v-avatar>
        </template>
      </v-timeline-item>
    </v-timeline>
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
      required: true,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
    console.log('toc', this.toc)
  },
  updated() {
    console.log(this.$route)
  },
  methods: {},
}
</script>
<style lang="scss">
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

aside {
  position: sticky;
  top: 256px;
  width: inherit;
  left: 250;
  align-self: start;
  overflow: hidden;
  margin: 25px;
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
.v-application--is-ltr .v-timeline--reverse.v-timeline--dense::before {
  right: 24px !important;
}

#default-toc.theme--dark li:not(.router-link-active) {
  border-left-color: hsla(0, 0%, 100%, 0.5);
}
.v-timeline-item__divider {
  min-width: 48px !important;
}
.v-timeline--dense .v-timeline-item__body {
  max-width: calc(100% - 48px) !important;
}
</style>
