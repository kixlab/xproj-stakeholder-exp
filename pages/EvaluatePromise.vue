<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="promise" />
    <v-flex xs12>
      <v-form>
        <p class="body-1 prompt">이 정책을 지지하시나요?</p>
        <v-btn class="score__btn" v-for="i in 5" :key="i" :color="firstImpression.score == i ? 'primary' : 'normal'" @click="firstImpression.score = i">{{i}}</v-btn>
        <p class="body-1 prompt">이 공약이 얼마나 큰 영향을 주시나요?</p>
        <v-radio-group row v-model="isStakeholder">
          <v-radio label="영향 없음" value="0"></v-radio>
          <v-radio label="약간 영향받음" value="1"></v-radio> 
          <v-radio label="매우 영향받음" value="2"></v-radio> 
        </v-radio-group>
        <v-btn block color="primary" @click="onNextButtonClick">다음</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  // Policy list will be fetched from here.
  // fetch: async function ({app, store, params}) {
  //   let promise = await app.$axios.$get('/api/policies/' + store.state.policyIdx + '/')
  //   store.commit('setPromise', promise)
  // },
  components: {
    PromisePane
  },
  computed: {
    promise: function () {
      return this.$store.state.policy
    }
  },
  data: function () {
    return {
      // TODO: Adjust the data field to match with UserPolicy model
      firstImpression: {
        score: 0,
        text: ''
      },
      isStakeholder: -1
    }
  },
  methods: {
    onNextButtonClick: function () {
      // TODO: Record user inputs
      this.$store.commit('setFirstImpression', this.firstImpression)
      let to = (this.isStakeholder === 2) ? 'EstimateBenefits' : 'ExploreStakeholders'
      this.$router.push(to)
    }
  }
}
</script>
<style scoped>
.score__btn {
  display: inline-block;
  min-width: 0;
}
</style>
