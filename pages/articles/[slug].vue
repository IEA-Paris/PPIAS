<template>
  <div>
    {{ item }}
  </div>
  <!-- <ArticleContainer :item="item[0]">
    <div v-intersect="onIntersect"></div>
    <v-expansion-panels v-model="panels" flat tile accordion hover multiple>
      <v-expansion-panel>
        <v-divider></v-divider>
        <v-expansion-panel-header color="rgb(249, 249, 249)">
          <div class="article_cat">
            {{ $t('about') }}
          </div>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content>
          <ArticleSummary v-if="item.length" :item="item[0]"></ArticleSummary>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-divider></v-divider>
        <v-expansion-panel-header color="rgb(249, 249, 249)">
          <div class="article_cat">
            {{ $t('article') }}
          </div>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="article-panel">
          <Article
            v-if="item.length"
            class="px-0"
            :item="item[0]"
            :title="show"
          ></Article>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar
      v-model="showNote"
      multi-line
      timeout="-1"
      outlined
      style="mt-0"
      class="note-snack"
    >
      <div class="d-flex" align="end">
        <b v-if="footnote" class="mb-2">Footnote {{ noteIndex }}</b>

        <v-btn small icon class="ml-auto" @click="hideSnack">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <ContentRenderer class="nuxt-content" v-if="footnote" :value="note" />
      <div v-else class="mt-2" v-html="note"></div>
    </v-snackbar>
  </ArticleContainer> -->
</template>
<script setup>
import filtersRaw from '~/assets/data/filters'
import { useRootStore } from '~/store/root';

const nuxtApp = useNuxtApp()
const rootStore = useRootStore()
const route = useRoute()
const footnote = ref(true)
const noteIndex = ref(1)
const showNote = ref(false)
const show = ref(false)
const tab = ref(0)
const note = reactive(false)
const loop = ref(false)
const panels = ref(route.hash === '#authors' ? [0, 1] : [1])

const { data: item } = await useAsyncData('item-article', () => queryContent('articles').where({slug: route.params.slug, published: true}).find())

const hideSnack = () => {
  showNote.value = false
}


onBeforeRouteUpdate((to, from, next) => {
  if (to.hash && to.hash.startsWith('#fn-')) {
    footnote.value = true
    const footnote = item[0]?.footnotes[+to.hash.substring(4) - 1]

    note = {
      body: {
        children: footnote.body.children.shift(),
        ...footnote.body,
      },
      ...footnote,
    }
    showNote.value = true
    noteIndex.value = +to.hash.substring(4)
  } else if (to.hash && to.hash.startsWith('#!bb-')) {
    note = item[0].bibliography.find(
      (element) => element.id === to.hash.substring(5)
    )[rootStore.getChildrenStore('articles').style]
    if (note) {
      footnote.value = false
      nextTick(() => {
        showNote.value = true
      })
      next(from)
    }
  } else if (to.hash && to.hash.substring(1).startsWith('blfn')) {
    nuxtApp.$vuetify.goTo(to.hash.replace('#blfn', '#fn'), { offset: 100 })
  } else if (to.hash && to.hash.substring(1).startsWith('blbb')) {
    nuxtApp.$vuetify.goTo(to.hash.replace('#blbb', '#bb'), { offset: 100 })
  } else if (to.hash && to.hash === '#authors' && !panels.value.includes(0)) {
    panels.value.push(0)
    next()
  } else {
    next()
  }
})

watch(showNote, (newVal) => {
  if (newVal) {
    document.addEventListener('scroll', hideSnack)
  } else {
    document.removeEventListener('scroll', hideSnack)
  }
})

onMounted(() => {
  rootStore.setLoading(false)
})

onUnmounted(() => {
  window.removeEventListener('scroll', hideSnack)
})
</script>
<style lang="scss">
@use 'vuetify/settings';

@media #{map-get(settings.$display-breakpoints, 'xs')} {
  .article-panel .v-expansion-panel-content__wrap {
    padding-left: 0;
  }
}
.note-snack .v-snack__content {
  padding-right: 0;
}
.article_cat {
  text-transform: uppercase;
  font-weight: bold;
}
.article-panel {
}
.article-panel .v-expansion-panel-content__wrap {
  padding-right: 0;
}
</style>
