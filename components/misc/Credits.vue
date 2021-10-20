<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template #activator="{ on, attrs }">
        <v-btn color="white" text v-bind="attrs" v-on="on">Credits</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">Credits</v-card-title>

        <v-card-text>
          <nuxt-content :document="credits" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      credits: {},
    }
  },
  async fetch() {
    this.credits = await this.$content('Pages_content/credits').fetch()
  },
}
</script>
