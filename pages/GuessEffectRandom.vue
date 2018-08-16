<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          다른 사람의 입장에서<br>정책을 이해해보세요!
        </v-card-text>
      </v-card>
      
      <p class="body-1 prompt head"><strong>{{randomStakeholderGroup.name}}</strong>의 입장에서 생각해주세요!</p>
      <br>
      <p class="question">
      여러분은 <strong>{{randomStakeholderGroup.name}}</strong>(이)가 주인공인 소설을 쓰고 있습니다.
      여러분이 정한 주인공을 머릿 속에서 <strong>더욱 자세히 상상</strong>해보세요!
      예를 들면, <strong>'선생님'</strong>보다는 <strong>'초등학교 5학년 담임선생님'</strong>처럼 
      장소, 직장, 연령 등을 고려해서 더 구체적으로요.<br>
      이제 여러분만의 주인공을 간단히 설명해주시겠어요?
      </p>
      <v-text-field v-model="predictedEffect.stakeholder_detail" placeholder="여기에 설명해주세요!" />

<!--       <v-text-field
      v-validate="'required'"
      v-model="predictedEffect.stakeholder_detail"
      :error-messages="errors.collect('email')"       
      name="stakeholder_detail"
      placeholder="여기에 설명해주세요!" /> -->
      
      <p class="question">그럼 그 사람은 이 정책으로 어떤 영향을 받게 될까요?</p>
      <v-textarea box auto-grow v-model="predictedEffect.description"/>

      <div>
        <p class="body-1 prompt question">방금 쓰신 내용은 그 사람에게 긍정적인가요? 부정적인가요? </p>
        <v-btn 
        :outline="predictedEffect.isBenefit !== 0" 
        :dark="predictedEffect.isBenefit == 0"
        color="primary"
        class="binarybtn"
        @click="predictedEffect.isBenefit=0">
        긍정적 </v-btn>
        <v-btn 
        :outline="predictedEffect.isBenefit !== 1" 
        :dark="predictedEffect.isBenefit == 1"
        color="error" 
        class="binarybtn" 
        @click="predictedEffect.isBenefit=1"> 
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
    store.commit('setRandomStakeholderGroup')
  },
  mixins: [setTokenMixin],
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    randomStakeholderGroup: function () {
      return this.$store.getters.randomStakeholderGroup
    },
    stakeholderGroups: function () {
      return this.$store.state.stakeholderGroups
    },
    userPolicy: function () {
      return this.$store.state.userPolicy
    },
    allFilled: function () {
      return (this.predictedEffect.source !== '' && this.predictedEffect.description !== '' &&
      this.predictedEffect.stakeholder_detail !== '' && this.predictedEffect.isBenefit !== -1 &&
      this.predictedEffect.stakeholder_group !== 0)
    }
  },
  methods: {
    onNextClick: function () {
      /* this.$validator.validateAll().then((result) => {
        if (result) { */
      this.predictedEffect.policy = this.$store.state.policyIdx
      this.predictedEffect.stakeholder_group = this.randomStakeholderGroup.id
      this.$axios.$post('/api/effects/', this.predictedEffect)
      // TODO: record user activity
      this.$ga.event({
        eventCategory: '/GuessEffectRandom',
        eventAction: 'SubmitGuess',
        eventLabel: this.randomStakeholderGroup.name,
        eventValue: 0
      })
      this.$store.dispatch('incrementUserPolicyStakeholdersAnswered')
      this.$router.push('/VerifyEffect')
      /* }
      }
      ) */
    },
    findStakeholderName: function (id) {
      if (id === 0) {
        return ''
      }
      for (let sg of this.stakeholderGroups) {
        if (sg.id === id) {
          return sg.name
        }
      }
    }
  },
  data: function () {
    return {
      predictedEffect: {
        isBenefit: -1,
        stakeholder_detail: '',
        stakeholder_group: '0',
        description: '',
        empathy: 0,
        novelty: 0,
        source: ''
      },
      dialog: false
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
