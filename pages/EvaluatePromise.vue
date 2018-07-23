<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="promise" />
    <v-flex xs12>
      <v-form>
        <p class="body-1 prompt">이 정책은 우리 사회에 도움이 될까요? </p>
        <v-btn class="score__btn" v-for="i in 5" :key="i" :color="firstImpression.score == i ? 'primary' : 'normal'" @click="firstImpression.score = i">{{i}}</v-btn>
        <p class="body-1 prompt">이 공약이 얼마나 큰 영향을 주시나요?</p>
        <v-radio-group row v-model="isStakeholder">
          <v-radio label="영향 없음" value="0"></v-radio>
          <v-radio label="약간 영향받음" value="1"></v-radio> 
          <v-radio label="매우 영향받음" value="2"></v-radio> 
        </v-radio-group>
        <v-btn block color="primary" :to="isStakeholder == 2 ? 'EstimateBenefits' : 'ExploreStakeholders'">다음</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  components: {
    PromisePane
  },
  computed: {
    promise: function () {
      return this.$store.state.promise
    }
  },
  data: function () {
    return {
      firstImpression: {
        score: 0,
        text: ''
      },
      isStakeholder: -1
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
