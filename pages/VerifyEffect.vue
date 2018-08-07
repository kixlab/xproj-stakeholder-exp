<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <p>실제 {{randomEffect.stakeholder_detail}}들이 받게 될 영향을 보여드릴게요.</p>
      
      <v-btn @click="onPredictMoreClick">영향 더 예상하기</v-btn>
      <v-btn @click="onExploreOpinionsClick">효과 모두 보기</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  // Verify the guessed effect
  // asyncData: function ({app, store}) {
  //   let effectsLength = store.state.effects.length
  //   let randomNumber = Math.floor(Math.random() * effectsLength)
  //   let randomEffect = store.state.effects[randomNumber]
  //   store.commit('setRandomEffect', randomEffect)
  //   return {randomEffect: randomEffect}
  // },
  computed: {
    randomEffect: function () {
      return this.$store.state.randomEffect
    },
    filteredEffects: function () {
      return this.$store.state.effects.filter((effect) => {
        return effect.stakeholder_group === this.randomEffect.stakeholder_group
      })
    }
  },
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    }
  },
  methods: {
    onExploreOpinionsClick: function () {
      this.$router.push('ExploreOpinions')
    },
    onPredictMoreClick: function () {
      this.$router.push('GuessEffect')
    }
  }
}
</script>

<style>

</style>
