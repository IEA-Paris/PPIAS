<template>
  <article class="printpanel page pdf" style="background-color: white">
    <header>
      <v-img
        src="/ppias.svg"
        contain
        alt="Avatar"
        style="
          cursor: pointer;
          width: 120px;
          height: 120px;
          border: 3px solid black;
        "
      ></v-img>
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
            <div class="page-title">{{ item.article_title }}</div>
            <div class="article-authors">
              <ArticleAuthorsString :authors="item.authors" />
            </div>
            <DoiBadge :doi="item.doi"></DoiBadge>
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
      <small class="footer-text">
        <!-- TODO update with website variable name -->
        <span class="overline"
          >&copy; {{ new Date().getFullYear() }} {{ $t('paris-ias') }}</span
        >
        - {{ item.article_title }} by <span v-html="formatedAuthors"></span> -.
        {{
          $t(
            'this-article-is-available-online-at-env-name-articles-item-slug',
            [item.article_title, item.slug]
          )
        }}
        Page
        <span class="page-number"></span>
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
    return {}
  },
  computed: {
    formatedAuthors() {
      return this.item
        ? formatAuthors(this.item.authors, this.$i18n.$t, true)
        : ''
    },
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
article.printpanel {
  width: 210mm !important;
  border-top: 10px solid red !important;
}
.page-title {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.index {
  display: none !important;
}
td {
  border-top: 15px solid blue !important;
  max-width: 100% !important;
  margin-right: 80px !important;
}
.nuxt-content.article-body p,
.nuxt-content.article-body ul li,
.csl-bib-body,
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
@page {
  margin: 2cm 4cm 0cm 1cm;
}

@media print {
  table.paging tfoot td {
    height: 1in;
  }
  table.paging thead td {
    height: 1.8in;
    width: 100%;
  }
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
  height: 1in;
}
header {
  height: 1.5in;
}

header,
footer {
  width: 100%;
}

header {
  position: absolute;
  top: 0;
}
.page-number {
  display: table-footer-group;
}
.footer-divider {
  margin-bottom: 0.5cm;
}
/* .footer-text {
} */
.page-number:after {
  text-align: right;
  counter-increment: page;
  content: counter(page);
}

@media print {
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
