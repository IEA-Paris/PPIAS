<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template #activator="{ on, attrs }">
        <v-btn color="white" variant="text" v-bind="attrs" v-on="on">Credits</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">Credits</v-card-title>

        <v-card-text>
          <ContentRenderer :value="credits" class="nuxt-content" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>

const dialog = ref(false)

const {data: credits} = await useAsyncData('credits', () => queryContent('Pages_content/credits').find())
</script>
