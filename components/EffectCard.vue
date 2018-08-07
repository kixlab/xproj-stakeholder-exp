<template>
    <v-card>
        <v-card-title primary-title>
        <div>
            <div>
            <font size="3"><strong>{{effect.stakeholder_name}}</strong></font>
            &nbsp;
            <font size="2">{{effect.stakeholder_detail}}</font>
            </div>
        </div>
        </v-card-title>
        <v-divider light></v-divider>
        <v-card-actions>
        <v-btn flat icon color="blue lighten-2">
            <v-icon>thumb_up</v-icon>
        </v-btn>

        <v-btn flat icon color="red lighten-2">
            <v-icon>thumb_down</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
        <v-card-text v-show=show>
            <p id="description">{{effect.description}}</p>
        </v-card-text>
        </v-slide-y-transition>
    </v-card>
</template>

<style scoped>
#description {
    text-align: left;
}
</style>

<script>
  export default {
    data: () => ({
      show: false
    }),
    props: {
      source: String,
      effect: {
        validator: function (value) {
          return ('stakeholder_group' in value) && ('stakeholder_detail' in value) && ('description' in value)
        }
      }
    }
  }
</script>


