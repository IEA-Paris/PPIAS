<template>
  <article class="printpanel page a3" style="background-color: white">
    <header>
      <Logo></Logo>
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
            <template v-if="item.tags && item.tags.length">
              <div class="article-label mt-6 mb-3">{{ $t('keywords') }}</div>

              <div class="mb-6">
                <Tag
                  v-for="(tag, index2) in item.tags"
                  :key="index2"
                  small
                  :tag="tag"
                  :class="index2 === 0 ? 'my-1 mr-1' : 'ma-1'"
                ></Tag>
              </div>
            </template>
            <v-divider class="py-3"></v-divider>
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
            <nuxt-content :document="item" class="d-block article-body" />
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
        - {{ item.article_title }} by <span v-html="formatedAuthors"></span>
        <v-spacer></v-spacer>
      </small>
    </footer>
    <div class="page-number"></div>
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
.page-title {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.index {
  display: none !important;
}
.nuxt-content.article-body {
  margin: 0 3vw;
}
.nuxt-content.article-body p {
  font-size: 24px !important;
  margin-bottom: 15px;
  margin-top: 10px;
  word-spacing: 2px;
  line-height: 26px !important;
  text-align: justify;
}
.article-authors {
  padding: 1em 0em;
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
  margin: 2cm 4cm 2cm 1cm;
}

@media print {
  table.paging tfoot td {
    height: 1in;
  }
  table.paging thead td {
    height: 1.5in;
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
.footer-text {
}
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
</style>
