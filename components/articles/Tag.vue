<template>
  <v-chip
    v-bind="$attrs"
    :outlined="
      !($route.query.tags && $route.query.tags.includes(JSON.stringify(tag)))
    "
    @click="updateTag()"
  >
    {{ tag }}
  </v-chip>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      default: '',
      required: true,
    },
    weight: {
      type: Number,
      default: 1,
      required: false,
    },
  },
  methods: {
    updateTag() {
      const tags = this.$route?.query?.tags
        ? JSON.parse(this.$route?.query?.tags)
        : []

      if (tags?.includes(this.tag)) {
        tags.splice(tags.indexOf(this.tag), 1)
      } else {
        tags.push(this.tag)
      }
      this.$router.push({
        ...this.$route.query,
        query: {
          tags: JSON.stringify(tags),
        },
      })
    },
  },
}
</script>
<style lang="scss"></style>
