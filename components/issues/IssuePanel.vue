<template>
  <v-card variant="outlined" class="px-3 pb-3" nuxt :to="'/issue/' + issue._path.split('/').at(-1)">
    <v-card-title v-html="issue.name_of_the_issue"></v-card-title>
    <v-card-text
      v-if="issue.body && issue.body.children && issue.body.children.length"
    >
      <ContentRenderer :value="issue" class="mx-6 nuxt-content" />
    </v-card-text>
    <v-card-actions v-if="total > 1 && !route.name.startsWith('print')">
      <v-spacer></v-spacer>
      <v-btn size="x-large" tile variant="outlined">
        {{ $t('see-the-complete-issue') + ' (' + total + ')' }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script setup>

const route = useRoute()
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const {data: issue} = await useAsyncData('issues', () => queryContent('issues').where({slug: props.item.slice(15, -3)}).findOne())
const {data: total} = await useAsyncData('total', () => queryContent('articles').where({issue: 'content' + issue.path + '.md', published: true}).find().length)

const path = computed(() => `${localePath('/articles')}?view=issues&filters={"issue"%3A["${issue._path.split('/').at(-1)}"]}`)
</script>
<style lang="scss"></style>
