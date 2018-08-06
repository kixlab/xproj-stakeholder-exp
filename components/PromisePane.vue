<template>
  <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
    <v-toolbar-title>
      <div style="cursor: pointer;">
        <!-- Length of policy name should be less than 18 Korean syllables -->
        <!-- The line must be ended with a single space -->
        <small>{{policy.title}} </small>
        <v-icon dark>arrow_drop_down</v-icon>
      </div>
    </v-toolbar-title>
    
    <v-dialog
      v-model = "dialog"
      max-width = "290"
    >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{policy.title}} 
      </v-card-title>

      <v-card-text>
        {{policy.description}} 
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="dialog = false"
        >
          다 읽었어요!
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
  </v-toolbar>

</template>

<script>
  export default {
    data: () => ({
      dialog: false
    }),
    props: {
      source: String,
      policy: {
        validator: function (value) {
          return ('title' in value) && ('description' in value)
        }
      }
    }
  }
</script>


