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
    <v-btn icon @click="onShowDescriptionButtonClick">
      <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
    </v-btn>
    </v-card-actions>

    <v-slide-y-transition>
    <v-card-text v-show="show">
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
  },
  methods: {
    onShowDescriptionButtonClick: function () {
      console.log(this.$router.currentRoute.path)
      if (this.show) {
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'CloseDescription',
          eventLabel: this.effect.stakeholder_detail,
          eventValue: 0
        })
      } else {
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'OpenDescription',
          eventLabel: this.effect.stakeholder_detail,
          eventValue: 0
        })
      }
      this.show = !this.show
    }
  }
}
</script>


