<template>
  <v-row class="transition-swing flex-row-reverse">
    <v-col :cols="toc ? 9 : 12" class="transition-swing">
      <div
        :id="(item.anchor && item.anchor.toLowerCase()) || item.post_title"
        flat
        v-bind="$attrs"
        class="mx-6"
      >
        <div class="sidebtn">
          <div
            class="d-flex align-center pt-3 pb-1 shadower"
            :class="title ? '' : 'shadow'"
          >
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  tile
                  text
                  v-bind="attrs"
                  class="pa-7"
                  @click="toc = !toc"
                  v-on="on"
                >
                  <v-expand-transition>
                    <span v-show="title && !toc">Menu</span>
                  </v-expand-transition>
                  <v-icon>
                    {{ toc ? 'mdi-chevron-left' : 'mdi-chevron-right' }}
                  </v-icon>
                </v-btn>
              </template>
              <span
                v-html="
                  toc ? $t('hide-the-left-panel') : $t('show-the-left-panel')
                "
              ></span>
            </v-tooltip>
            <span v-if="!toc && !title" class="transition-swing text-h6 ml-6">
              {{ item.article_title }}
            </span>
            <v-spacer></v-spacer>
            <!--  <Search /> -->
            <ZenArticle :item="item" />
          </div>
        </div>

        <v-card-text
          :class="toc ? 'align-start' : 'align-center'"
          class="d-flex flex-column"
        >
          <div
            v-if="item.abstract && item.abstract.length"
            class="abstract-panel text-caption"
          >
            <div class="overline mt-n1 ml-n1 text-grey">
              {{ $t('abstract') }}
            </div>
            {{ item.abstract }}
          </div>

          <!--           <div v-if="item.images && item.images.length > 1" class="pb-8 pt-3">
            <v-carousel
              :height="$vuetify.breakpoint.mdAndUp ? '600' : '300'"
              cycle
            >
              <v-carousel-item
                v-for="image in item.images"
                :key="image"
                eager
                :lazy-src="$img(image, { width: 10, quality: 70 })"
                :src="$img(image, { height: 'auto', quality: 70 })"
                :srcset="_srcset(image).srcset"
                :sizes="_srcset(image).size"
              ></v-carousel-item>
            </v-carousel>
          </div> -->

          <small v-if="item.copyright" class="muted caption"
            >&copy; {{ item.copyright }}</small
          >
          <nuxt-content
            :document="item"
            style="max-width: 650px"
            class="page a4"
          />
        </v-card-text>

        <v-card-subtitle class="pb-0">
          <!--      <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">mdi-pin</v-icon>
            </template>
            <span>This post is pinned</span>
          </v-tooltip> -->
          {{
            new Date(item.date).toLocaleDateString('en-GB', {
              // you can use undefined as first argument
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
          }}
          <!--  +    ' - ' +
        new Date(item.date).toLocaleTimeString('EN', {
          hour: '2-digit',
          minute: '2-digit',
          timezone: 'UTC', 
      })-->
        </v-card-subtitle>
      </div>
    </v-col>
    <v-col v-show="toc" :cols="toc ? 3 : 1" class="transition-swing">
      <Toc
        v-if="item.toc.length"
        :toc="item.toc"
        :active-toc="currentlyActiveToc"
        :title="title ? false : item.article_title"
        @close="toc = false"
      />
    </v-col>
  </v-row>
</template>
<script>
import truncateString from '~/assets/utils/truncate'
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    title: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      toc: true,
      show: false,
      currentlyActiveToc: '',
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0,
      },
      sheet: false,
    }
  },
  computed: {},
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        if (entry.isIntersecting) {
          this.currentlyActiveToc = id
        }
      })
    }, this.observerOptions)
    // Track all sections that have an `id` applied
    document
      .querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id]')
      .forEach((section) => {
        //, .nuxt-content p[id]
        this.observer.observe(section)
      })
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  updated() {},
  methods: {
    truncateString(str = '') {
      return truncateString(str, 250)
    },
    highlight: (word = '', query) => {
      const check = new RegExp(query, 'ig')
      return word.replace(check, function (matchedText, a, b) {
        return (
          '<strong style="color: darkslategray;background-color: yellow;">' +
          matchedText +
          '</strong>'
        )
      })
    },
    _srcset(src) {
      return this.$img.getSizes(src, {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          format: 'webp',
          quality: 70,
        },
      })
    },
  },
}
</script>
<style lang="scss">
.youtube {
  width: 100%;
}
.nuxt-content p {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem !important;
  font-weight: 400 !important;
  line-height: 1.375rem !important;
  letter-spacing: 0.0071428571em !important;
}
.node .index {
  color: rgba(0, 0, 0, 0.2);
  text-decoration: none;
}
.node:hover .index {
  color: black;
}
.sidebtn {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 4;
  align-self: flex-start;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  overflow: hidden;
  padding-bottom: 10px;
}
.sidebtn .shadower.shadow {
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
}
.footnotes {
  color: red;
  display: none;
}
.abstract-panel {
  border: 1px black solid;
  margin: 1em;
  padding-bottom: 1em;
  padding-left: 1em;
  padding-right: 1em;
  width: 100%;
  max-width: 650px;
}
// nuxt content styles
</style>
