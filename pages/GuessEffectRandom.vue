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
      우선 소설 속 주인공처럼 인물을 더욱 자세히 머릿 속에 그려보세요!
      예를 들면, <strong>'선생님'</strong>보다는 <strong>'초등학교 5학년 담임선생님'</strong>처럼 
      장소, 직장, 연령 등을 고려하여 더 구체적으로요.<br>
      그리고 여러분만의 주인공을 설명해주세요!
      </p>
      <v-text-field
      v-validate="'required'"
      v-model="predictedEffect.stakeholder_detail"
      :error-messages="errors.collect('email')"       
      name="stakeholder_detail"
      placeholder="여기에 설명해주세요!" />
      
      <p class="question">그럼 그 인물은 이 정책으로 어떤 영향을 받게 될까요?</p>
      <v-textarea box auto-grow v-model="predictedEffect.description"/>

      <div>
        <p class="body-1 prompt question">이 영향은 그 인물에게 긍정적인가요? 부정적인가요? </p>
        <template v-if="predictedEffect.isBenefit==0">
          <v-btn dark color="primary" class="binarybtn"> 긍정적 </v-btn>
          <v-btn outline color="error" class="binarybtn" @click="predictedEffect.isBenefit=!predictedEffect.isBenefit"> 부정적 </v-btn>
        </template>
        <template v-else>
          <v-btn outline color="primary" class="binarybtn" @click="predictedEffect.isBenefit=!predictedEffect.isBenefit"> 긍정적 </v-btn>
          <v-btn dark color="error" class="binarybtn"> 부정적 </v-btn>
        </template>
      </div>

      <p class="question"> 왜 그렇게 생각하셨는지 간단히 써 주세요.</p>
      <v-text-field
      v-validate="'required'"
      v-model="predictedEffect.source"
      :error-messages="errors.collect('email')"       
      name="stakeholder_detail"/>
      <v-btn block dark color="primary" @click="onNextClick">다음</v-btn>
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
    },
    stakeholderGroups: function () {
      return this.$store.state.stakeholderGroups
    },
    userPolicy: function () {
      return this.$store.state.userPolicy
    }
  },
  methods: {
    onNextClick: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // this.myEffect.policy = this.$store.state.policyIdx
          // this.$store.commit('setMyEffect', this.myEffect)
          // this.$axios.$post('/api/effects/', this.myEffect)
          // TODO: record user activity
          this.$router.push('VerifyEffect')
        }
      }
      )
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
        isBenefit: '',
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
