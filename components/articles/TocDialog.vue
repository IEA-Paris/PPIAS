<template>
  <v-dialog v-model="open" fullscreen overflowed>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            fab
            fixed
            bottom
            right
            outlined
            tile
            v-bind="attrs"
            class="mobile-filter-btn"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon>mdi-format-list-group</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('show-the-table-of-content') }}</span>
      </v-tooltip>
    </template>
    <v-card dark color="rgba(0, 0, 0, 0.97)">
      <v-app-bar color="transparent" clipped flat hide-on-scroll height="180">
        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex flex-grow-1 align-start">
            <v-img
              class="ml-10 mr-2"
              src="/icon_dark.png"
              contain
              max-height="120"
              max-width="120"
              style="cursor: pointer"
            ></v-img>
            <v-spacer></v-spacer>
            <v-btn
              icon
              x-large
              class="ma-2 mr-4 mb-4"
              tile
              @click="open = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-app-bar>
      <v-row align="center" justify="end">
        <v-col
          cols="12"
          md="9"
          lg="6"
          :class="$vuetify.breakpoint.smAndUp ? 'mr-12' : ''"
        >
          <Toc
            v-if="item.toc.length"
            max-width="100%"
            :toc="item.toc"
            :active-toc="currentlyActiveToc"
            :title="title ? false : item.article_title"
            :custom-pdf="item.custom_pdf"
            @close="open = false"
            @clickItem="open = false"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'articles',
    },
    currentlyActiveToc: {
      type: String,
      required: false,
      default: 'articles',
    },
    item: {
      type: Object,
      default: () => {},
    },
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
    customPdf: {
      type: [Boolean, String],
      required: true,
      default: '',
    },
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    filtersCount() {
      return this.$store.state[this.type].filtersCount
    },
  },
  mounted() {},
  methods: {},
}
</script>
<style scoped lang="scss">
$input-font-size: 48px;
.menu-logo {
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: color, background, text-shadow;
  transition: all 0.5s ease;
  transform-origin: left top;
  width: 600px !important;
  margin-left: 40px;
  margin-bottom: 25px;
}
.mobile-filter-btn {
  background-color: white;
  margin-bottom: 5em;
}
.v-badge__badge {
}
</style>
