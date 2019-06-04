<template>
  <div class="card__effect">
    <v-card :color="cardColor">
      <v-card-title>
        <v-flex xs11 style="text-align: left;">
          <template v-if="showTag">
            <strong><font size="3">{{effect.stakeholder_detail}}</font></strong>
          </template>
        </v-flex>
        <v-flex xs1 style="text-align: right;">
          <v-icon :color="effect.isBenefit ? 'primary' : 'error'">
            {{effect.isBenefit ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied'}}
          </v-icon>
        </v-flex>
      </v-card-title>      
      <v-card-text class="effect-card__textbox">
        <span class="effect-card__text" v-html="highlightedDescription"> </span>
      </v-card-text>
      <v-card-actions>
        <v-flex xs11 style="text-align: left;">
          <template v-if="showTag">
            <font size="2"><span style="text-align:left; color:blue;" v-for="tag in effect.tags" :key="tag">#{{tag}}&nbsp;&nbsp;</span></font>
          </template>
        </v-flex>
        <v-flex xs1>
          <v-btn icon flat :color="pinned ? 'yellow': 'grey'" @click="onPinClick">
            <v-icon>
              star
            </v-icon>
          </v-btn>
        </v-flex>
      </v-card-actions>
      <v-card-actions v-if="isGuessing">
        <v-btn color="green" block outline @click="onNewClick">
          새로워요!
        </v-btn>
        <v-btn color="red" block outline @click="onExpectedClick">
          뻔해요...
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import setTokenMixin from '~/mixins/setToken.js'
export default {
  data: function () {
    return {
      pinned: this.$store.getters.pinnedEffectIds.includes(this.effect.id)
    }
  },
  methods: {
    onPinClick: async function () {
      const payload = {
        effect: this.effect
      }
      if (!this.pinned) {
        await this.$store.dispatch('addPinnedEffects', payload)
      } else {
        await this.$store.dispatch('removePinnedEffects', payload)
      }
      this.pinned = !this.pinned
    },
    onNewClick: function () {
      this.$emit('new-click')
    },
    onExpectedClick: function () {
      this.$emit('expected-click')
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
    expanded: Boolean,
    selectedKeyword: String,
    showTag: {
      default: true
    },
    isGuessing: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    // shortDescription: function () {
    //   if (this.effect.description.length > 40) {
    //     return this.effect.description.slice(0, 23) + '...'
    //   } else {
    //     return this.effect.description
    //   }
    // },
    // pinned: function () {
    //   return this.$store.getters.pinnedEffectIds.includes(this.effect.id)
    // },
    highlightedDescription: function () {
      if (this.selectedKeyword) {
        return this.effect.description.replace(new RegExp(this.selectedKeyword, 'gi'), match => {
          return `<span style="font-weight: bold">${match}</span>`
        })
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
  /* margin-top: 10vh; */
  width: 100%;
}
/* 
.card__effect::before{
  position: relative;
  
  top: 0;
  height: 10vh;
  width: 100%;
  box-sizing: border-box;
  fill: #00000080;
  content: "aaaaaaaaaaaa";
  border: 1px #000000 solid;
  
} */
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

.keyword {
  font-weight: bold;
}

a {
  color: black;
}
</style>


