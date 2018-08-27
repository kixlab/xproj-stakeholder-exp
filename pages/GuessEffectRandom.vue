<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          다른 사람의 입장에서<br>정책을 이해해보세요!
        </v-card-text>
      </v-card>
      
      <p class="body-1 prompt head" style="text-align: left;">
        한 사용자가 <strong style="color:blue;">{{randomEffect.tags.join(', ')}}</strong>(으)로서
        본인이 받게 될 영향을 말씀해주셨습니다.
        <br>
        <strong>이 분의 입장에서 생각해주세요.</strong>
      </p>
      <br>

      <p class="question">이 정책으로 어떤 영향을 받게 될까요?</p>
      <v-textarea box auto-grow v-model="predictedEffect.description"/>

      <div>
        <p class="body-1 prompt question">방금 쓰신 내용은 이 분에게 긍정적인가요? 부정적인가요? </p>
        <v-btn 
        :outline="predictedEffect.isBenefit !== 1" 
        :dark="predictedEffect.isBenefit == 1"
        color="primary"
        class="binarybtn"
        @click="predictedEffect.isBenefit=1">
        긍정적 </v-btn>
        <v-btn 
        :outline="predictedEffect.isBenefit !== 0" 
        :dark="predictedEffect.isBenefit == 0"
        color="error" 
        class="binarybtn" 
        @click="predictedEffect.isBenefit=0"> 
        부정적 </v-btn>
      </div>

      <p class="question"> 위 빈칸에 '영향'을 쓰실 때 가장 큰 영향을 끼친 사람/상황 등이 있다면 간단히 적어주세요.<br>(예. 언론기사, 지인 등)</p>
      <v-text-field placeholder="여기에 설명해주세요!" v-model="predictedEffect.source"/>

      <p v-if="!allFilled" style="color:red;">모든 빈칸을 채워넣어야 다음으로 넘어갈 수 있습니다.</p>
      <v-btn v-if="!allFilled" disabled block> 다음 </v-btn>
      <v-btn v-else dark block color="primary" @click="onNextClick">다음</v-btn>    
    </v-flex>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
import setTokenMixin from '~/mixins/setToken.js'

export default {
  fetch: function ({app, store}) {
    store.dispatch('fetchRandomEffect')
  },
  mixins: [setTokenMixin],
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    userPolicy: function () {
      return this.$store.state.userPolicy
    },
    allFilled: function () {
      return (this.predictedEffect.source !== '' && this.predictedEffect.description !== '' && this.predictedEffect.isBenefit !== -1)
    },
    randomEffect: function () {
      return this.$store.state.randomEffect
    }
  },
  methods: {
    onNextClick: function () {
      this.predictedEffect.policy = this.$store.state.policyId
      this.predictedEffect.stakeholder_group = 1
      this.predictedEffect.tags = this.randomEffect.tags

      this.$axios.$post('/api/effects/', this.predictedEffect)
      // TODO: record user activity
      this.$ga.event({
        eventCategory: '/GuessEffectRandom',
        eventAction: 'SubmitGuess',
        eventLabel: this.randomEffect.id,
        eventValue: 0
      })
      this.$store.dispatch('incrementUserPolicyStakeholdersAnswered')
      this.$router.push('/VerifyEffect')
    }
  },
  data: function () {
    return {
      predictedEffect: {
        isBenefit: -1,
        stakeholder_detail: '밍',
        stakeholder_group: 1,
        description: '',
        source: ''
      }
    }
  }
}
</script>

<style scoped>
.v-card__text {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
}

.question {
  margin-top: 5px;
  margin-bottom: 0;
  text-align: left;
}
.head {
  margin-top: 10px;
  margin-bottom: 0;
}
</style>
