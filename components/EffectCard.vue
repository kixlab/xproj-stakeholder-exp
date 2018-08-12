<template>
  <v-card ripple @click.native="onShowDescriptionButtonClick">
    <v-card-title primary-title>
    <v-flex xs3 align-space-around fill-height row wrap>
      <v-card flat>
        <v-card-text>
          <small><strong>{{effect.stakeholder_name}}</strong></small>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs9 fill-height row column wrap class="aa">
      <v-card flat>
        <v-card-text>
          <div class="left-align">
          <font size="2">{{effect.description.slice(0, 40)}}</font>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    </v-card-title>

    <v-divider light></v-divider>
    <v-card-actions>
    <v-btn flat small outline color="blue lighten-2" @click.stop="1==1">
      새로워!
    </v-btn>

    <v-btn flat small outline color="red lighten-2" @click.stop="1==1">
      공감해!
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn icon>
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
  padding: 8px;
}
.v-card__title.v-card__title--primary {
  padding: 0;
}
.v-card__text {
  padding: 0;
}
.v-card__title.v-card__title--primary {
  height: 60px;
}
.v-card__actions {
  padding: 0px;
}
.left-align {
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
        return ('stakeholder_name' in value) && ('stakeholder_detail' in value) && ('description' in value)
      }
    }
  },
  methods: {
    onShowDescriptionButtonClick: function () {
      if (this.show) {
        this.$ga.event({
          eventCategory: 'EffectCard',
          eventAction: 'DescriptionClosed',
          eventLabel: this.effect.stakeholder_detail,
          eventValue: 0
        })
      } else {
        this.$ga.event({
          eventCategory: 'EffectCard',
          eventAction: 'DescriptionOpened',
          eventLabel: this.effect.stakeholder_detail,
          eventValue: 0
        })
      }
      this.show = !this.show
    }
  }
}
</script>


