<template>
  <aside>
    <v-timeline align-top dense reverse class="toc">
      <v-timeline-item
        v-for="link of toc"
        :key="link.id"
        :small="link.depth > 2"
        class="pb-0"
        :color="link.id === activeToc ? 'primary' : 'grey'"
      >
        <v-row class="pt-1">
          <v-col cols="12">
            <a
              class="text-caption py-1 font-weight-regular"
              :class="link.id === activeToc ? '' : 'text--secondary'"
              :color="link.id === activeToc ? 'primary' : 'grey'"
              nuxt
              :to="`#${link.id}`"
              @click="
                $vuetify.goTo('#' + link.id)
                $router.replace({ hash: '#' + link.id })
              "
              @keyup.enter="
                $vuetify.goTo('#' + link.id)
                $router.replace({ hash: '#' + link.id })
              "
            >
              {{ link.text }}
            </a>
          </v-col>
        </v-row>
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
  mounted() {},
  updated() {
    console.log(this.$route)
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
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
.toc_container {
  width: 100%;
}
.toc {
  position: sticky;
  top: 12rem;
  align-self: start;
}
#default-toc li.router-link-active {
  border-left-color: currentColor;
}

#default-toc.theme--dark li:not(.router-link-active) {
  border-left-color: hsla(0, 0%, 100%, 0.5);
}
</style>
