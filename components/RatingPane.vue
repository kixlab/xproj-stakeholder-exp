<template>
  <v-layout row wrap justify-center>
    <v-flex md10 lg8>
      <template v-if="effects.length <= 0">
        <div class="done">
          <div class="done--text">#{{tagHigh.tag}} 집단이 남긴 모든 의견을 보셨습니다!</div>
        </div>
      </template>
      <template v-else>
        <effect-card
          :effect="effect"
          :isGuessing="true"
          @new-click="onNewClick"
          @expected-click="onExpectedClick"
          >
        </effect-card>
      </template>
    </v-flex>
    <!-- <v-flex xs12>
      <v-btn @click="randEffect()">
        새로워요
      </v-btn>
      <v-btn @click="randEffect()">
        뻔해요
      </v-btn>
    </v-flex> -->
  </v-layout>
</template>

<script>
import EffectCard from '~/components/EffectCard.vue'
export default {
  components: {
    EffectCard
  },
  // computed: {
  //   effects: function () {
  //     return this.$store.state.effects
  //   }
  // },
  methods: {
    onNewClick: async function () {
      this.effectCount += 1
      await this.$store.dispatch('rateEffect', {mark: 'new', effectId: this.effect.id})
      this.effects.splice(this.random, 1)
      if (this.effectCount >= 5 || this.effects.length <= 0) {
        this.$emit('rating-enough')
      }
      this.randEffect()
    },
    onExpectedClick: async function () {
      this.effectCount += 1
      await this.$store.dispatch('rateEffect', {mark: 'new', effectId: this.effect.id})
      this.effects.splice(this.random, 1)
      if (this.effectCount >= 5 || this.effects.length <= 0) {
        this.$emit('rating-enough')
      }
      this.randEffect()
    },
    randEffect: function () {
      this.random = Math.floor(Math.random() * this.effects.length)
      this.effect = this.effects[this.random]
    }
  },
  beforeMount: function () {
    this.randEffect()
  },
  data: function () {
    return {
      effect: null,
      effectCount: 0,
      effects: [...this.$store.state.effects],
      random: 0
    }
  },
  computed: {
    tagHigh: function () {
      return this.$store.state.tagHigh
    }
  }
}
</script>

<style scoped>
.done {
  height: 10vh;
  position: relative;
}

.done--text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
