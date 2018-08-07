<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <p>혹시 당신이 {{randomStakeholderGroup.name}}이라면 이 정책으로 어떤 영향을 받게 될까요?</p>
      <v-text-field></v-text-field>
      왜 그렇게 생각하셨나요?
      <v-radio-group>
        <v-radio label="지인" value="friend"></v-radio>
        <v-radio label="언론" value="media"></v-radio>
        <v-radio label="특별한 근거 없음" value="none"></v-radio>
        <v-radio label="기타" value="etc"></v-radio>
      </v-radio-group>
      <v-btn @click="onNextClick">다음</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  // Guess effect to the stakeholder given by the system
  // fetch: function ({app, store}) {
  //   // let effectsLength = store.state.effects.length
  //   // let randomNumber = Math.floor(Math.random() * effectsLength)
  //   // let randomEffect = store.state.effects[randomNumber]
  //   // store.commit('setRandomEffect', randomEffect)
  //   // return {randomEffect: randomEffect}
  //   let stakeholderLength = store.state.stakeholderGroups.lehgth
  //   let randomNumber = Math.floor(Math.random() * stakeholderLength)
  //   let randomStakeholderGroup = store.state.stakeholderGroups[randomNumber]
  //   store.commit('setRandomStakeholderGroup')
  // },
  mounted: function () {
    this.$store.commit('setRandomStakeholderGroup')
  },
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    randomStakeholderGroup: function () {
      return this.$store.getters.randomStakeholderGroup
    }
  },
  methods: {
    onNextClick: function () {
      this.$router.push('VerifyEffect')
    }
  }
}
</script>

<style>

</style>
