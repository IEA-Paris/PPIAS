<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-icon v-bind="attrs" small v-on="on">
        {{ outline ? 'mdi-help-circle-outline' : 'mdi-help-circle' }}</v-icon
      >
    </template>
    <span
      >This list is based on the information available on this website
      <!--  TODO update when it's not the case anymore -->
    </span>
  </v-tooltip>
</template>
<script>
export default {
  props: {
    outline: {
      type: Boolean,
      required: false,
      default: false,
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
