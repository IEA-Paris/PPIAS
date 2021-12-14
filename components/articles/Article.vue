<template>
  <v-row class="transition-swing flex-row-reverse">
    <v-col :cols="toc ? 9 : 12" class="transition-swing">
      <div :id="(item.anchor && item.anchor.toLowerCase()) || item.post_title" flat v-bind="$attrs" class="mx-6">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn small depressed text icon v-bind="attrs" @click="toc = !toc" v-on="on">
              <v-icon>{{ toc ? 'mdi-chevron-left-box' : 'mdi-chevron-right-box' }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('show-hide-the-left-panel') }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              text
              icon
              v-bind="attrs"
              :href="'/articles/' + item.slug"
              target="_blank"
              :title="item.post_title"
              small
              class="float-right"
              v-on="on"
            >
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </template>
          <span>Open in a new tab</span>
        </v-tooltip>
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
          <nuxt-content v-show="$route.name !== 'blog' || show || !item.description" :document="wrapContent(item)" />
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
      </div>
    </v-col>
    <v-col v-show="toc" :cols="toc ? 3 : auto" class="transition-swing">
      <Toc
        v-if="item.toc.length"
        :toc="item.toc"
        :active-toc="currentlyActiveToc"
        :title="title ? false : item.article_title"
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
    wrapContent(item) {
      let count = 0
      console.log(item.body.children)
      return {
        ...item,
        body: {
          ...item.body,
          children: item.body.children.map((child, index) => {
            console.log('child: ', child)
            if (child.value !== '\n') {
              count++
              return {
                type: 'element',
                tag: 'div',
                props: { class: 'node d-flex' },
                children: [
                  {
                    type: 'element',
                    tag: 'a',
                    props: {
                      class:
                        'text-right index mr-3 ' + [' mt-8', ' mt-6', 'mt-3'][['h2', 'h3', 'p'].indexOf(child.tag)] ||
                        '',
                      id: count,
                      href: '#' + count,
                      // TODO addd vuetify goTo instead of link
                    },
                    children: [{ type: 'text', value: count }],
                  },
                  {
                    type: 'element',
                    tag: 'div',
                    props: {
                      class: '',
                    },
                    processed: true,
                    children: [child],
                  },
                ],
              }
            } else {
              return child
            }
          }),
        },
      }
    },
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
.nuxt-content p {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem !important;
  font-weight: 400 !important;
  line-height: 1.375rem !important;
  letter-spacing: 0.0071428571em !important;
}
.node .index {
  opacity: 45%;
  text-decoration: none;
  color: black;
}
.node:hover .index {
  opacity: 100%;
}
// nuxt content styles
.nuxt-content h2 {
  font-weight: 500;
  font-size: 30px;
  padding-bottom: 0.3rem;
  margin-bottom: 1em;
  margin-top: 2rem;
}
.nuxt-content h3 {
  font-weight: 400;
  margin-top: 1.5rem;
  font-size: 22px;
}

.nuxt-content p {
  font-size: 16px;
  margin-bottom: 15px;
  margin-top: 10px;
  word-spacing: 2px;
  line-height: 32px;
}

.nuxt-content p code,
.nuxt-content h2 code,
.nuxt-content h3 code {
  color: #476582;
  padding: 0.25rem 0.5rem;
  margin: 0;
  font-size: 0.85em;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-family: Consolas, Lato Mono, monospace;
}

.nuxt-content ul {
  font-size: 14px;
  margin-bottom: 30px;
  word-spacing: 2px;
  line-height: 32px;
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.nuxt-content li {
}
.v-application code {
  all: initial;
  all: unset;
}

.v-application a {
  text-decoration: none;
}

.nuxt-content-highlight {
  font-family: Consolas;
  font-size: 16px;
  position: relative;
  z-index: 1;
  border-radius: 6px;
}

.nuxt-content-highlight > .filename {
  font-family: Lato;
  right: 0;
  top: 0;
  position: absolute;
  margin-right: 0.8rem;
  font-size: 0.8rem;
  color: rgba(203, 213, 224, 1);
  font-weight: 300;
  z-index: 10;
  margin-top: 0.5rem;
}

.nuxt-content pre {
  position: static;
  border-radius: 6px;
  font-family: Consolas;
  font-size: 16px;
  padding: 20px;
}
</style>
