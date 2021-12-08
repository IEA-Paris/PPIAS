<template>
  <v-card
    :width="$vuetify.breakpoint.mdAndUp ? '' : '100%'"
    class="d-flex flex-column"
    raised
    min-height="100px"
    to="/"
  >
    <OptimizedImage
      :src="item.image"
      :expanded="scroll"
      :class="{ expanded: scroll }"
      :ratio="first ? 8 / 9 : 16 / 9"
      :tags="item.tags"
    >
      <template #caption>
        {{ item.title }}
      </template>
      <template #author>
        {{ item.author }}
      </template>
      <template #date>
        {{ item.date }}
      </template>
    </OptimizedImage>
  </v-card>
</template>
<script>
import quotes from '~/assets/data/quotes'
import tags from '~/assets/data/tags'

export default {
  props: {
    first: {
      type: Boolean,
      default: false,
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    item: {
      default: () => {
        const rnd = Math.floor(Math.random() * (100 + 1))
        return {
          image: 'https://picsum.photos/seed/' + Math.floor(Math.random() * 10) + 1 + '/600/400',
          title: quotes[rnd].quote,
          author: quotes[rnd].author,
          tags: [tags[1], tags[0]],
          date: 'Tue 8, May 22',
        }
      },
      type: Object,
    },
  },
  data() {
    return {
      quotes,
    }
  },
  methods: {},
}
</script>
<style></style>
