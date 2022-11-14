<template>
  <article class="printpanel page pdf" style="background-color: white">
    <header>
      <img src="/icon.png" alt="Avatar" width="100" height="100" />
    </header>

    <table class="paging">
      <thead>
        <tr>
          <td>&nbsp;</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="page-title" v-html="item.article_title"></div>
            <div class="article-authors">
              <ArticleAuthorsString :authors="item.authors" :initials="false" />
            </div>
            <DoiBadge :doi="item.DOI"></DoiBadge>
            <div class="article-label mt-6 mb-3">
              {{ $t('publication-date') }}
            </div>
            <div class="mb-6">
              {{
                new Date(item.date).toLocaleDateString('EN', {
                  timezone: 'UTC',
                })
              }}
            </div>
            <template v-if="item.disciplines && item.discipline.length">
              <div class="article-label mt-6 mb-3">{{ $t('fields') }}</div>

              <div
                v-if="item.disciplines && item.disciplines.length"
                class="mb-6"
              >
                <Tag
                  v-for="(discipline, index2) in item.disciplines"
                  :key="index2"
                  large
                  :tag="discipline"
                  :class="index2 === 0 ? 'my-1 mr-1' : 'ma-1'"
                ></Tag>
              </div>
            </template>
            <template v-if="item.thematics && item.thematic.length">
              <div class="article-label mt-6 mb-3">{{ $t('themes') }}</div>

              <div class="mb-6">
                <Tag
                  v-for="(thematic, index2) in item.thematics"
                  :key="index2"
                  large
                  :thematic="thematic"
                  :class="index2 === 0 ? 'my-1 mr-1' : 'ma-1'"
                ></Tag>
              </div>
            </template>
            <template v-if="item.types && item.types.length">
              <div class="article-label mt-6 mb-3">{{ $t('types') }}</div>

              <div class="mb-6">
                <Tag
                  v-for="(type, index2) in item.type"
                  :key="index2"
                  large
                  :type="type"
                  :class="index2 === 0 ? 'my-1 mr-1' : 'ma-1'"
                ></Tag>
              </div>
            </template>
            <template v-if="item.tag && item.tag.length">
              <div class="article-label mt-6 mb-3">{{ $t('keywords') }}</div>

              <div class="mb-6">
                <Tag
                  v-for="(tag, index2) in item.tag"
                  :key="index2"
                  large
                  :tag="tag"
                  :class="index2 === 0 ? 'my-1 mr-1' : 'ma-1'"
                ></Tag>
              </div>
            </template>
            <div
              v-if="item.abstract && item.abstract.length"
              class="article-label mt-12 mb-4"
            >
              {{ $t('abstract') }}
            </div>
            <div
              v-if="item.abstract && item.abstract.length"
              class="article-abstract-frame"
            >
              <div class="article-abstract">
                {{ item.abstract }}
              </div>
            </div>
            <nuxt-content :document="item" class="article-body" />
            <div
              v-if="item.bibliography && item.bibliography.length"
              class="bibliography-panel"
            >
              <div id="bibliography" class="mt-3 d-flex">
                {{ $t('bibliography') }}
              </div>
              <ArticleBibliography :item="item"></ArticleBibliography>
            </div>
            <template v-if="item.footnotes && item.footnotes.length">
              <div id="footnotes" class="mt-3">
                {{ $t('footnotes') }}
              </div>
              <ArticleFootnotes
                :item="item"
                class="footnotes-panel"
              ></ArticleFootnotes>
            </template>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>&nbsp;</td>
        </tr>
      </tfoot>
    </table>
    <footer>
      <v-divider class="footer-divider"></v-divider>
      <small class="print-footer-text">
        <!-- TODO update with website variable name -->
        <span class="overline"
          >&copy; {{ new Date().getFullYear() }} {{ $t('paris-ias') }}</span
        >
        - <span v-html="item.article_title"></span> by
        <span v-html="formatedAuthors"></span> -.
        {{
          $t(
            'this-article-is-available-online-at-env-name-articles-item-slug',
            [$config.url, item.slug]
          )
        }}
      </small>
    </footer>
  </article>
</template>
<script>
import { formatAuthors } from '~/assets/utils/transforms'
export default {
  layout: 'print',
  props: {},
  async asyncData({ $content, params }) {
    const item = (
      await $content('articles', { deep: true })
        .where({
          slug: params.slug,
        })
        .fetch()
    )[0]

    return {
      item,
    }
  },
  data() {
    return {
      /*  item: {}, */
    }
  },
  /*   async fetch() {
    this.item = (
      await this.$content('articles', { deep: true })
        .where({
          slug: this.$route.params.slug,
        })
        .fetch()
    )[0]
    this.$store.commit('setLoading', false)
  }, */
  computed: {
    formatedAuthors() {
      return this.item
        ? formatAuthors(this.item.authors, this.$i18n.$t, true)
        : ''
    },
  },
  destroyed() {
    if (window) window.removeEventListener('onbeforeprint', this.keyDown)
  },
  mounted() {
    console.log('route', this.$route.params.slug)
    console.log(this.item)
    if (window) window.addEventListener('onbeforeprint', this.addPageNumbers)
  },
  methods: {
    addPageNumbers() {
      const totalPages = Math.ceil(document.body.scrollHeight / 1123) // 842px A4 pageheight for 72dpi, 1123px A4 pageheight for 96dpi,
      for (let i = 1; i <= totalPages; i++) {
        const pageNumberDiv = document.createElement('div')
        const pageNumber = document.createTextNode(
          'Page ' + i + ' of ' + totalPages
        )
        pageNumberDiv.style.position = 'absolute'
        pageNumberDiv.style.top = 'calc((' + i + ' * (297mm - 0.5px)) - 440px)' // 297mm A4 pageheight; 0,5px unknown needed necessary correction value; additional wanted 40px margin from bottom(own element height included)
        pageNumberDiv.style.height = '16px'
        pageNumberDiv.appendChild(pageNumber)
        document.body.insertBefore(
          pageNumberDiv,
          document.getElementById('content')
        )
        pageNumberDiv.style.left =
          'calc(100% - (' + pageNumberDiv.offsetWidth + 'px + 280px))'
      }
    },
  },
}
</script>
<style lang="scss">
article.printpanel {
  width: 210mm !important;
  margin-left: -2.5cm;
}

.page-title {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.index {
  display: none !important;
}
td {
  max-width: 100% !important;
  margin-right: 80px !important;
}
@media print {
}
.nuxt-content.article-body p,
.nuxt-content.article-body ul li,
.csl-bib-body,
.bibliography-panel,
.footnotes-panel {
  font-size: 24px !important;
  margin-bottom: 15px;
  margin-top: 10px;
  word-spacing: 2px;
  line-height: 30px !important;
  text-align: justify;
  max-width: 100% !important;
}
.nuxt-content.article-body h2,
#bibliography,
#footnotes {
  font-size: 45px !important;
  margin-bottom: 30px;
  margin-top: 60px;
  word-spacing: 2px;
  line-height: 55px !important;
}
.nuxt-content.article-body h3 {
  font-size: 36px !important;
  line-height: 40px !important;
  margin-bottom: 30px;
  margin-top: 60px;
}
.nuxt-content.article-body h4 {
  font-size: 24px !important;
  line-height: 30px !important;
  margin-bottom: 30px;
  margin-top: 30px;
}
.article-authors {
  padding: 1em 0em;
  font-size: 1.3rem;
  font-family: 'Open sans', sans-serif;
}
.article-abstract {
  font-style: italic;
  margin-top: 0.8em;
}
.article-label {
  text-transform: uppercase;
  font-size: 0.6rem;
  margin-top: 2em;
  margin-bottom: 0.6em;
  color: rgb(37, 37, 37);
}

.page-number {
  display: table-footer-group;
  counter-increment: page;
}

.page-number:after {
  content: 'Page ' counter(page);
  text-align: right;
  white-space: nowrap;
  z-index: 20;
}

@media print {
  body,
  .printpanel {
    overflow: visible !important;
    height: auto !important;
  }
  body {
    margin: 5mm 15mm 15mm 5mm !important;
  }
  @page {
    size: auto; /* auto is the initial value */

    /* this affects the margin in the printer settings */
    margin: 15mm 0mm 15mm 05mm;
  }
  table.paging tfoot td {
    height: 1.2in;
  }
  table.paging thead td {
    height: 1.2in;
    width: 100%;
  }
  .article-abstract-frame {
    border: 1px black solid;
    padding: 1em;
    margin-bottom: 1em;
  }
  .v-divider {
    margin: 0px 1em;
  }
  footer {
    height: 1.2in;
  }

  header,
  footer {
    width: 100%;
    max-width: 800px;
  }

  header {
    position: absolute;
    top: 0;
    height: 150px;
  }
  .page-number {
    display: table-footer-group;
  }
  .footer-divider {
    margin-bottom: 0.5cm;
  }
  .print-footer-text {
    max-width: 15cm !important;
  }

  header,
  footer {
    position: fixed;
  }

  footer {
    bottom: 0;
  }
}
.footnotes {
  color: red;
  display: none;
}
</style>
