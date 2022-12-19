<template>
  <div class="text-center">
    <v-dialog v-model="dialog" fullscreen>
      <template #activator="{ on, attrs }">
        <v-btn color="white" variant="text" v-bind="attrs" v-on="on">placeholder</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">Website in progress</v-card-title>

        <v-card-text>
          We are working on this website. It is not ready yet for its prime day
          :-)
        </v-card-text>
        <v-text-field v-model="textInput" @keyup.enter="close()"></v-text-field>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();

const dialog = ref(config.public.NODE_ENV === 'production')
const textInput = ref('')

const close = () => {
  if (textInput.value === 'ieaftw') dialog.value = false
}
</script>
