<template>
  <v-list-item
    nuxt
    :to="localePath('/authors/' + item.slug)"
    @click="$emit('close')"
  >
    <v-list-item-icon>
      <v-icon x-large>mdi-account-outline</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>
        {{ item.firstname + ' ' + item.lastname }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
