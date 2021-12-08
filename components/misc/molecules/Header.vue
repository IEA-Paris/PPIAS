<template>
  <v-container :fluid="fluid">
    <v-row :no-gutters="nogutters">
      <v-toolbar flat>
        <Filters :type="type" :loading="loading" />
        <v-btn
          v-if="addBtn"
          x-large
          :height="$vuetify.breakpoint.mdAndUp ? '56' : '40'"
          outlined
          color="primary"
          :to="localePath($route.fullPath + '/create')"
        >
          <v-icon left>mdi-plus</v-icon>
          {{ $t('new-x', { item: $tc('x-' + type, 1) }) }}
        </v-btn>
      </v-toolbar>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    fluid: {
      type: Boolean,
      required: false,
      default: false,
    },
    nogutters: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    addBtn: {
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
