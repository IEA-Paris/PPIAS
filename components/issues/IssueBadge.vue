<template>
  <v-chip
    v-if="!route.name.startsWith('issue')"
    size="small"
    class="d-inline-block issue-badge"
    :inline="inline"
    @click.prevent="router.push('/issue/' + issueText)"
  >
    {{ issueText }}
  </v-chip>
</template>
<script setup>
const route = useRoute()
const router = useRouter()
const props = defineProps({
  issue: {
    type: String,
    required: true,
    default: '',
  },
  inline: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const issueText = ref(props.issue.slice(15, -3))
</script>
<style lang="scss">
.issue-badge {
  font-family: 'Open sans', sans-serif !important;
}
</style>
