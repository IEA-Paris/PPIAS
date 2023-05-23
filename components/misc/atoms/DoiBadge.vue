<!-- eslint-disable vuejs-accessibility/anchor-has-content -->
<template>
  <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
  <!--   <a :href="'https://doi.org/' + doi" target="_blank"> -->
  <a
    :href="
      $config.modules.zenodo.sandbox
        ? 'https://sandbox.zenodo.org/record/' + zid
        : 'https://zenodo.org/record/' + zid
    "
    target="_blank"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="186" height="20">
      <linearGradient id="b" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1" />
        <stop offset="1" stop-opacity=".1" />
      </linearGradient>
      <mask id="a" width="186" height="20">
        <rect width="186" height="20" rx="3" fill="#fff" />
      </mask>
      <g mask="url(#a)">
        <path fill="#555" d="M0 0h31v20H0z" />
        <path fill="#007ec6" d="M31 0h155v20H31z" />
        <path fill="url(#b)" d="M0 0h186v20H0z" />
      </g>
      <g
        fill="#fff"
        text-anchor="middle"
        font-family="DejaVu Sans,         Verdana,Geneva,sans-serif"
        font-size="11"
      >
        <text x="16" y="15" fill="#010101" fill-opacity=".3">DOI</text>
        <text x="16" y="14">DOI</text>
        <text x="108" y="15" fill="#010101" fill-opacity=".3">
          {{ doi }}
        </text>
        <text x="108" y="14">
          {{ doi }}
        </text>
      </g>
    </svg></a
  >
</template>
<script>
export default {
  props: {
    doi: {
      type: String,
      required: true,
      default: '',
    },
    zid: {
      type: String,
      required: false,
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
