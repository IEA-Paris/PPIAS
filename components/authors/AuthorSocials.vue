<template>
  <div>
    <v-tooltip v-for="social in socials" :key="social.link" bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          text
          icon
          color="black"
          v-bind="attrs"
          :href="social.link"
          target="_blank"
          v-on="on"
        >
          <v-icon>{{ social.icon }}</v-icon></v-btn
        >
      </template>
      <span>{{ social.tooltip }} </span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    socials: {
      type: Object,
      required: true,
      default: () => {},
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
