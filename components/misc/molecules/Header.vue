<template>
  <v-container :fluid="fluid">
    <v-row :no-gutters="nogutters">
      <v-toolbar flat>
        <Filters :type="type" :loading="loading" />
        <v-btn
          v-if="addBtn"
          x-large
          :height="mdAndUp ? '56' : '40'"
          outlined
          color="primary"
          :to="localePath(route.fullPath + '/create')"
        >
          <v-icon left>mdi-plus</v-icon>
          {{ $t('new-x', { item: $t('x-' + type, 1) }) }}
        </v-btn>
      </v-toolbar>
    </v-row>
  </v-container>
</template>
<script setup>
import { useRootStore } from '~/store/root';

const { mdAndUp } = useVuetify()
const route = useRoute()
const router = useRouter()
const rootStore = useRootStore()

const props = defineProps({
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
})
</script>
<style lang="scss"></style>
