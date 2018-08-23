<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" dark fixed app>
      <v-toolbar-title id="header">
        <v-icon dark id="goback" @click="goback">arrow_back</v-icon>
        <div style="flex: 1;">
          <!-- The line must be ended with a single space -->
          <small> 중간 설문 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
        
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      <h2>{{step}}번째 정책은 잘 보셨나요?</h2>
      아래 설문을 완료한 뒤 다음으로 넘어가주세요.<br>
      (1 : 매우 부정 ~ 7 : 매우 긍정)
    </v-flex>
    <v-flex xs12>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책의 내용을 잘 이해하고 있다.
          <v-slider
            v-model="first_answer"
            :tick-labels="numericScales"
            :max="6"
            step="1"
            tick-size="2"/>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책이 나에게 미치는 영향을 잘 이해하고 있다.
          <v-slider
            v-model="second_answer"
            :tick-labels="numericScales"
            :max="6"
            step="1"
            tick-size="2"/>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책이 나에게 미치는 영향을 잘 이해하고 있다.
          <v-slider
            v-model="second_answer"
            :tick-labels="numericScales"
            :max="6"
            step="1"
            tick-size="2"/>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책이 다른 사회 구성원에게 미치는 영향을 잘 이해하고 있다.
          <v-slider
            v-model="third_answer"
            :tick-labels="numericScales"
            :max="6"
            step="1"
            tick-size="2"/>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책을 시행하는데 {{myStance ? `${myStance}` : '_____'}}한다.
          <br>
          <v-btn 
          :outline="fourth_answer !== 0" 
          :dark="fourth_answer == 0"
          color="primary"
          class="binarybtn"
          @click="fourth_answer=0">
          찬성 </v-btn>
          <v-btn 
          :outline="fourth_answer !== 1" 
          :dark="fourth_answer == 1"
          color="error" 
          class="binarybtn" 
          @click="fourth_answer=1"> 
          반대 </v-btn>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          이 정책에 대한 내 입장{{myStance ? `(${myStance})` : ''}}은 확고하다.<br>
          <v-slider
            v-model="fifth_answer"
            :tick-labels="numericScales"
            :max="6"
            step="1"
            tick-size="2"/>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-btn block color="primary" @click="nextPolicy">다음</v-btn>
  </v-layout>
</template>
<style scoped>
#goback {
    float: left;
    position: absolute;
}
#header {
    flex: 1;
    display: flex;
    position: relative;
}
</style>
<script>
import setTokenMixin from '~/mixins/setToken.js'

export default {
  methods: {
    goback () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'GoBackFromMiniSurvey',
        eventLabel: `${this.policy.title}`,
        eventValue: 0
      })
      this.$router.go(-1)
    },
    async nextPolicy () {
      // console.log(this.fourth_answer)
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'FinishMiniSurvey',
        eventLabel: `${this.policy.title}`,
        eventValue: 0
      })
      if (this.fourth_answer !== -1) {
        await this.$axios.$post('/api/minisurvey/', {
          user: this.user.id,
          policy: this.policy.id,
          first_answer: this.first_answer,
          second_answer: this.second_answer,
          third_answer: this.third_answer,
          fourth_answer: this.fourth_answer,
          fifth_answer: this.fifth_answer
        })
        this.$store.dispatch('incrementUserStep')
        console.log(this.user.step)
        this.$router.push('/ShowPolicies')
      }
    }
  },
  mixins: [setTokenMixin],
  data: function () {
    return {
      numericScales: ['1', '2', '3', '4', '5', '6', '7'],
      confidenceScales: ['매우 적음', '', '보통', '', '매우 확신'],
      first_answer: 3,
      second_answer: 3,
      third_answer: 3,
      fourth_answer: -1,
      fifth_answer: 3
    }
  },
  computed: {
    myStance: function () {
      if (this.fourth_answer === 0) {
        return '찬성'
      } else if (this.fourth_answer === 1) {
        return '반대'
      } else {
        return ''
      }
    },
    user: function () {
      return this.$store.state.user
    },
    policy: function () {
      return this.$store.state.policy
    },
    experimentCondition: function () {
      return this.$store.getters.experimentCondition
    },
    step: function () {
      if (this.user.step === 1) {
        return '첫'
      } else if (this.user.step === 2) {
        return '두'
      }
    }
  }
}
</script>