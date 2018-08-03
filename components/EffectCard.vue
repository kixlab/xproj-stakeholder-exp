<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-card-title primary-title>
        <div>
          <div>
            <font size="2">{{effect.stakeholder_detail}}</font>
            &nbsp;
            <font size="3"><strong>{{effect.stakeholder_group}}</strong></font>
          </div>
          <span>{{effect.description}}</span>
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
          <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          {{effect.description}}
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  props: {
    effect: {
      validator: function (value) {
        return ('stakeholder_group' in value) && ('stakeholder_detail' in value) && ('description' in value)
      }
    }
  },
  data: function () {
    return {
      show: false
    }
  }
}
</script>
<style scoped>

</style>
