<template>
  <v-chip
    v-bind="attrs"
    :outlined="
      !(route.query.tags && route.query.tags.includes(JSON.stringify(tag)))
    "
    @click="updateTag()"
  >
    {{ tag }}
  </v-chip>
</template>
<script setup>
const attrs = useAttrs()
const route = useRoute()
const router = useRouter()

const props = defineProps({
  tag: {
    type: String,
    required: true,
    default: '',
  },
  weight: {
    type: Number,
    required: false,
    default: 1,
  },
})

const updateTag = () => {
  const tags = route.query.tags ? JSON.parse(route.query?.tags) : []

  if (tags.includes(props.tag)) {
    tags.splice(tags.indexOf(props.tag), 1)
  } else {
    tags.push(props.tag)
  }
  router.push({
    ...route.query,
    query: {
      tags: JSON.stringify(tags),
    },
  })
}
</script>
<style lang="scss"></style>
