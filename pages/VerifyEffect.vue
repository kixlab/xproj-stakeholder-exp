<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <p>실제 {{randomStakeholderGroup.name}}들이 받게 될 영향을 보여드릴게요.</p>
      <effect-card v-for="effect in filteredEffects" :key="effect.stakeholder_detail" :effect="effect">
      </effect-card>
      <v-btn @click="onPredictMoreClick">영향 더 예상하기</v-btn>
      <v-btn @click="onExploreOpinionsClick">효과 모두 보기</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
import EffectCard from '~/components/EffectCard.vue'
export default {
  // Verify the guessed effect
  // asyncData: function ({app, store}) {
  //   let effectsLength = store.state.effects.length
  //   let randomNumber = Math.floor(Math.random() * effectsLength)
  //   let randomEffect = store.state.effects[randomNumber]
  //   store.commit('setRandomEffect', randomEffect)
  //   return {randomEffect: randomEffect}
  // },
  asyncData: async function ({app, store}) {
    let effects = await app.$axios.$get('/api/effects/', {
      params: {
        policy: store.state.policyIdx,
        stakeholder_group: store.getters.randomStakeholderGroup.id
        // get_stakeholder_names: true
      }
    })
    console.log(effects)
    // store.commit('setEffects', effects.results)
    return {filteredEffects: effects.results}
  },
  computed: {
    randomStakeholderGroup: function () {
      return this.$store.getters.randomStakeholderGroup
    },
    // filteredEffects: function () {
    //   return this.$store.state.effects.filter((effect) => {
    //     return effect.stakeholder_group === this.randomEffect.stakeholder_group
    //   })
    // },
    policy: function () {
      return this.$store.state.policy
    }
  },
  components: {
    PromisePane,
    EffectCard
  },
  methods: {
    onExploreOpinionsClick: function () {
      this.$router.push('SelectStakeholder')
    },
    onPredictMoreClick: function () {
      this.$router.push('GuessEffect')
    }
  },
  data: function () {
    return {
    }
  }
}
</script>

<style>

</style>
