<template>
  <div class="card__effect">
    <v-card :color="cardColor">
      <v-card-title>
        <v-flex xs11 style="text-align: left;">
        <strong><font size="3">{{effect.stakeholder_detail}}</font></strong>
        </v-flex>
        <v-flex xs1 style="text-align: right;">
          <v-icon :color="effect.isBenefit ? 'primary' : 'error'">
            {{effect.isBenefit ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied'}}
          </v-icon>
        </v-flex>
      </v-card-title>      
      <v-card-text class="effect-card__textbox">
        <span class="effect-card__text"> {{effect.description}} </span>
      </v-card-text>
      <v-card-actions>
        <v-flex xs11 style="text-align: left;">
          <font size="2"><span style="text-align:left; color:blue;" v-for="tag in effect.tags" :key="tag">#{{tag}}&nbsp;&nbsp;</span></font>
        </v-flex>
        <v-flex xs1>
          <v-btn icon flat :color="disabled ? 'gray': 'yellow'" @click="onPinClick">
            <v-icon>
              star
            </v-icon>
          </v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import setTokenMixin from '~/mixins/setToken.js'
export default {
  data: () => ({
    disabled: true
  }),
  methods: {
    onPinClick: function () {
      const payload = {
        effect: this.effect
      }
      if (this.disabled) {
        this.$store.dispatch('addPinnedEffects', payload)
      } else {
        this.$store.dispatch('removePinnedEffects', payload)
      }
      this.disabled = !this.disabled
    }
  },
  mixins: [setTokenMixin],
  props: {
    source: String,
    effect: {
      validator: function (value) {
        return ('tags' in value) && ('description' in value)
      }
    },
    expanded: Boolean
  },
  computed: {
    shortDescription: function () {
      if (this.effect.description.length > 40) {
        return this.effect.description.slice(0, 23) + '...'
      } else {
        return this.effect.description
      }
    },
    pinnedEffects: function () {
      return this.$store.state.pinnedEffects
    },
    cardColor: function () {
      return 'white'
    },
    tagWord: function () {
      if (this.effect.source === 'guess') {
        return '추측'
      } else {
        return '직접'
      }
    }
  }
}
</script>
<style scoped>
.card__effect {
  margin-bottom: 0.5em;
  width: 100%;
}
.v-card__text {
  text-align: left !important;
  padding-bottom: 0;
}
.v-card__title {
  padding-bottom: 0;
}
.effect-card__text {
  color: black;
}
.effect-card__textbox {
  text-align: left !important;
}
.v-btn--small {
  min-width: 70px;
  padding: 0 !important;
}

a {
  color: black;
}
</style>


