<template>
  <v-row class="transition-swing flex-row-reverse">
    <v-col :cols="toc ? 9 : 12" class="transition-swing">
      <div :id="(item.anchor && item.anchor.toLowerCase()) || item.post_title" flat v-bind="$attrs" class="mx-6">
        <div class="sidebtn" :class="title ? '' : 'shadow'">
          <div class="d-flex align-center pt-3 pb-1">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn tile text v-bind="attrs" class="pa-7" @click="toc = !toc" v-on="on">
                  <v-expand-transition>
                    <span v-show="title && !toc">Menu</span>
                  </v-expand-transition>
                  <v-icon>{{ toc ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
                </v-btn>
              </template>
              <span v-html="toc ? $t('hide-the-left-panel') : $t('show-the-left-panel')"></span>
            </v-tooltip>
            <span v-if="!toc && !title" class="transition-swing text-h6 ml-6">
              {{ item.article_title }}
            </span>
            <Search />
            <ZenArticle :item="item" />

            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  text
                  class="py-7 px-6"
                  tile
                  v-bind="attrs"
                  nuxt
                  :href="'/articles/' + item.slug"
                  target="_blank"
                  :title="item.post_title"
                  small
                  v-on="on"
                >
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
              </template>
              <span>Open in a new tab</span>
            </v-tooltip>
          </div>
        </div>

        <!--         <v-card-title>
          <span class="text-h4" v-html="highlight(item.article_title, $route.query.search)"></span>
        </v-card-title> -->
        <div class="px-3">
          <Tag v-for="(tag, index2) in sortedTags" :key="index2" :tag="tag" class="ma-1"></Tag>
        </div>

        <v-card-text>
          <YoutubeEmbed v-if="item.youtube_video_id" :yt="item.youtube_video_id" class="mb-9 ml-3"></YoutubeEmbed>
          <OptimizedImage
            v-if="item.images && item.images.length === 1"
            :src="item.images[0]"
            class="my-3"
          ></OptimizedImage>
          <div v-if="item.images && item.images.length > 1" class="pb-8 pt-3">
            <v-carousel :height="$vuetify.breakpoint.mdAndUp ? '600' : '300'" cycle>
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
          </div>

          <small v-if="item.copyright" class="muted caption">&copy; {{ item.copyright }}</small>
          <p v-if="item.description && $route.name === 'blog' && !show">
            {{ item.description }} &nbsp;
            <b
              v-if="item.description && $route.name === 'blog'"
              class="primary--text text-decoration-underline"
              style="cursor: pointer"
              @click="show = !show"
              @keyup.enter.space="show = !show"
            >
              Read&nbsp;more
            </b>
          </p>
          <nuxt-content v-show="$route.name !== 'blog' || show || !item.description" :document="item" />
          <template v-if="item.authors.length">
            <div class="mb-3 px-3 font-italic">
              By
              <template v-if="item.authors.length === 2">
                {{ item.authors[0].name + ' and ' + item.authors[1].name }}
              </template>
              <span v-for="(author, index2) in item.authors" v-else :key="index2">
                {{ author.name }}
                <template v-if="index2 < item.authors.length - 1">,&nbsp;</template>
              </span>
            </div>
          </template>
          <SoundCloud v-for="(track, index2) in item.audio" :key="index2" :src="track" />
        </v-card-text>

        <v-card-subtitle class="pb-0">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">mdi-pin</v-icon>
            </template>
            <span>This post is pinned</span>
          </v-tooltip>
          {{
            new Date(item.date).toLocaleDateString('EN', {
              timezone: 'UTC',
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
import ZenArticle from './ZenArticle.vue'
import truncateString from '~/assets/utils/truncate'
export default {
  components: { ZenArticle },
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
  computed: {
    sortedTags() {
      return this.$route.query?.tags?.length
        ? this.item.tags.reduce((acc, tag) => {
            if (this.$route.query.tags && this.$route.query.tags.includes(JSON.stringify(tag))) {
              return [tag, ...acc]
            }
            return [...acc, tag]
          }, [])
        : this.item.tags
    },
  },
  mounted() {
    console.log(this.item.body.children)
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        if (entry.isIntersecting) {
          this.currentlyActiveToc = id
        }
      })
    }, this.observerOptions)
    // Track all sections that have an `id` applied
    document.querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id]').forEach((section) => {
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
        return '<strong style="color: darkslategray;background-color: yellow;">' + matchedText + '</strong>'
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
}
.sidebtn.shadow {
  -webkit-box-shadow: 0 4px 6px -6px #222;
  -moz-box-shadow: 0 4px 6px -6px #222;
  box-shadow: 0 4px 6px -6px #222;
}
.footnotes {
  color: red;
  display: none;
}
// nuxt content styles
</style>
