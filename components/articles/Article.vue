<template>
  <v-row
    class="transition-swing flex-row-reverse justify-center"
    :no-gutters="!toc || $vuetify.breakpoint.smAndDown"
  >
    <TocDialog
      v-if="item.toc.length && $vuetify.breakpoint.smAndDown"
      v-model="toc"
      :item="item"
      :currently-active-toc="currentlyActiveToc"
      :toc="item.toc"
      :title="title ? false : item.article_title"
      :custom-pdf="item.custom_pdf"
      @close="toc = false"
    />
    <v-col
      :cols="
        item.toc && item.toc.length && toc && $vuetify.breakpoint.mdAndUp
          ? 9
          : 12
      "
      class="transition-swing"
    >
      <div
        :id="(item.anchor && item.anchor.toLowerCase()) || item.post_title"
        flat
        v-bind="$attrs"
        :class="$vuetify.breakpoint.smAndUp ? 'mx-6' : 'mx-0'"
      >
        <div class="article sidebtn">
          <div
            class="d-flex align-center pt-3 pb-1 shadower"
            :class="title ? '' : 'shadow'"
          >
            <v-tooltip
              v-if="item.toc && item.toc.length && $vuetify.breakpoint.mdAndUp"
              bottom
            >
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
                    <span v-show="title && !toc">{{
                      $t('table-of-content')
                    }}</span>
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
            <v-spacer></v-spacer>
            <span
              v-if="!toc && !title"
              class="transition-swing text-h6 ml-6"
              :class="{
                ' text-center':
                  item.article_title && item.article_title.length > 80,
              }"
              style="max-width: 850px"
            >
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
          :flat="$vuetify.breakpoint.xs"
        >
          <div
            v-if="item.abstract && item.abstract.length"
            class="abstract-panel"
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
          <div
            v-if="item.bibliography && item.bibliography.length"
            class="bibliography-panel"
          >
            <div
              id="bibliography"
              class="text-h4 mt-3 d-flex"
              :class="$vuetify.breakpoint.xs ? 'ml-0' : 'ml-3'"
            >
              {{ $t('bibliography') }}
              <v-spacer></v-spacer>
              <BibliographyStyleMenu></BibliographyStyleMenu>
            </div>
            <ArticleBibliography :item="item"></ArticleBibliography>
          </div>
          <template v-if="item.footnotes && item.footnotes.length">
            <div
              id="footnotes"
              class="text-h4 mt-3 d-flex"
              :class="$vuetify.breakpoint.xs ? 'ml-0' : 'ml-6'"
            >
              {{ $t('footnotes') }}
            </div>
            <ArticleFootnotes :item="item"></ArticleFootnotes>
          </template>
          {{
            new Date(item.date).toLocaleDateString('en-GB', {
              // you can use undefined as first argument
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
          }}
        </v-card-text>
      </div>
    </v-col>
    <v-col
      v-show="toc"
      v-if="$vuetify.breakpoint.mdAndUp && item.toc && item.toc.length"
      :cols="toc ? 3 : 1"
      class="transition-swing"
    >
      <Toc
        v-if="item.toc.length"
        :toc="item.toc"
        :active-toc="currentlyActiveToc"
        :title="title ? false : item.article_title"
        :custom-pdf="item.custom_pdf"
        @close="toc = false"
        @click="currentlyActiveToc = $event"
      />
    </v-col>
  </v-row>
</template>
<script>
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
      toc: this.item.toc.length,
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
          console.log('intersecting', id)
          this.currentlyActiveToc = id
        }
      })
    }, this.observerOptions)
    // Track all sections that have an `id` applied
    document
      .querySelectorAll(
        '.nuxt-content h2[id], .nuxt-content h3[id], #bibliography, #footnotes'
      )
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
@import '~vuetify/src/styles/settings/_variables';

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
.node > div {
  width: 100%;
}
.node:hover .index {
  color: black;
}
.article.sidebtn {
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
.article.sidebtn .shadower.shadow {
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
  padding-bottom: 1em;
  margin-bottom: 2em;
  padding-left: 1em;
  padding-right: 1em;
  width: 100%;
  max-width: 650px;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: initial !important;
  font-family: 'Bodoni Moda', sans-serif !important;
}
.bibliography-panel {
  max-width: 650px;
  margin-left: 0.9em;
}
@media #{map-get($display-breakpoints, 'xs-only')} {
  .node.d-flex a {
    display: none;
  }
  .bibliography-panel,
  .abstract-panel {
    margin-left: 0;
  }
}

// nuxt content styles
</style>
