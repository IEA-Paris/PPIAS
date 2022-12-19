<template>
  <div class="my-12">
    <span class="section-title text-h4 text-uppercase">{{ $t(text) }}</span>
  </div>
</template>
<script setup>
const props = defineProps({ text: String })
</script>
<style lang="scss">
.section-title {
  border-bottom: 5px solid black;
}
</style>
