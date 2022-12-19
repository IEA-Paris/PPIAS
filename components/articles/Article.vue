<template>
  <v-row
    class="transition-swing flex-row-reverse justify-center"
    :no-gutters="(!showToc || smAndDown)"
  >
    <TocDialog
      v-if="smAndDown"
      v-model="showToc"
      :item="item"
      :currently-active-toc="currentlyActiveToc"
      :toc="item.toc"
      :title="title ? false : item.article_title"
      :custom-pdf="item.custom_pdf"
      @close="showToc = false"
    />
    <v-col
      :cols="showToc && mdAndUp ? 9 : 12"
      class="transition-swing"
    >
      <div
        :id="(item.anchor && item.anchor.toLowerCase()) || item.post_title"
        flat
        v-bind="attrsProps"
        :class="smAndUp ? 'mx-6' : 'mx-0'"
      >
        <div class="article sidebtn">
          <div
            class="d-flex align-center pt-3 pb-1 shadower"
            :class="title ? '' : 'shadow'"
          >
            <v-tooltip v-if="mdAndUp" bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  tile
                  text
                  v-bind="attrs"
                  class="pa-7"
                  @click="showToc = !showToc"
                  v-on="on"
                >
                  <v-expand-transition>
                    <span v-show="title && !showToc">{{
                      $t('table-of-content')
                    }}</span>
                  </v-expand-transition>
                  <v-icon>
                    {{ showToc ? 'mdi-chevron-left' : 'mdi-chevron-right' }}
                  </v-icon>
                </v-btn>
              </template>
              <span
                v-html="
                  showToc
                    ? $t('hide-the-left-panel')
                    : $t('show-the-left-panel')
                "
              ></span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <span
              v-if="!showToc && !title"
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
          :class="showToc ? 'align-start' : 'align-center'"
          class="d-flex flex-column"
          :flat="isXsDisplay"
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
              :height="mdAndUp ? '600' : '300'"
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
          <ContentRenderer
            :value="item"
            style="max-width: 650px; width: 100%"
            class="page a4 nuxt-content"
          />
          <div
            v-if="item.bibliography && item.bibliography.length"
            class="bibliography-panel"
          >
            <div id="bibliography" class="text-h4 mt-3 d-flex ml-0">
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
              :class="isXsDisplay ? 'ml-0' : 'ml-6'"
            >
              {{ $t('footnotes') }}
            </div>
            <ArticleFootnotes :item="item"></ArticleFootnotes>
          </template>
          {{
            new Date(item.date).toLocaleDateString('en-US', {
              // you can use undefined as first argument
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })
          }}
        </v-card-text>
      </div>
    </v-col>
    <v-col
      v-show="showToc"
      v-if="mdAndUp"
      :cols="showToc ? 3 : 1"
      class="transition-swing"
    >
      <!-- v-if="item.toc.length" -->
      <Toc
        :toc="item.toc"
        :active-toc="currentlyActiveToc"
        :title="title ? false : item.article_title"
        :custom-pdf="item.custom_pdf"
        @close="showToc = false"
        @click="currentlyActiveToc = $event"
      />
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from 'vuetify'

const { xs: isXsDisplay, smAndDown, smAndUp, mdAndUp } = useDisplay()
const attrsProps = useAttrs()
const nuxtApp = useNuxtApp()

const nuxtContent = ref(null)
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  title: {
    type: Boolean,
    default: false,
  },
})

const showToc = ref(true)
const currentlyActiveToc = ref('')
const observer = reactive(null)
const observerOptions = reactive({
  root: nuxtContent,
  threshold: 0,
})
const sheet = ref(false)

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id')
      if (entry.isIntersecting) {
        currentlyActiveToc.value = id
      }
    })
  }, observerOptions)
  // Track all sections that have an `id` applied
  const sections = document.querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id], #bibliography, #footnotes')
  sections.forEach((section) => {
    observer.observe(section)
  })
})

onBeforeUnmount(() => {
  observer.disconnect()
})

const _srcset = (src) => nuxtApp.$img.getSizes(src, {
    sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
    modifiers: {
      format: 'webp',
      quality: 70,
    },
  })
</script>
<style lang="scss">
@use 'vuetify/settings';

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
  margin-left: 0;
}
@media #{map-get(settings.$display-breakpoints, 'xs')} {
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
