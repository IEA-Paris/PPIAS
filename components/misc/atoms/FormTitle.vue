<template>
  <div class="text-h6">{{ $t(item) }}</div>
</template>
<script>
export default {
  props: {
    item: {
      type: String,
      required: true,
      default: '',
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
