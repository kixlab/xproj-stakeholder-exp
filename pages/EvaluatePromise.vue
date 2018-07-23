<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="promise" />
    <v-flex xs12>
      <v-form>
        <p class="body-1 prompt">이 정책은 우리 사회에 도움이 될까요? </p>
        <v-btn class="score__btn" v-for="i in 5" :key="i" :color="firstImpression.score == i ? 'primary' : 'normal'" @click="firstImpression.score = i">{{i}}</v-btn>
        <!-- <p class="body-1 prompt">왜 그렇게 생각하시나요?</p>
        <v-text-field v-model="firstImpression.text"></v-text-field>
        <p class="body-1 prompt">이 정책과 관련되어 있다면, 다음 빈 칸에 들어갈 알맞은 사회적 집단을 적어주세요.
          "내가 이 정책에 직접적인 영향을 받는 이유는 내가 [          ]이기 때문이다."
        </p>
        <v-text-field v-model="identity">
        </v-text-field> -->
        <v-btn block color="primary" to="ExploreStakeholders">다음</v-btn>
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
      identity: ''
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
