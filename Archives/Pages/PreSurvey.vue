<template>
  <v-layout row wrap justify-center>
    <general-toolbar :pagename="'사용 전 설문'"/>
        
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          <strong>"정책타입"</strong>과 함께<br>정책도 이해하고, 기프티콘도 받아가세요!
        </v-card-text>
      </v-card>
      <p style="text-align:left;">
      <br>
      첫 번째 단계입니다. 
      설문에 앞서 몇 가지 <strong>유의사항</strong>이 있으니 아래를 확인해주세요.<br>
      <br>

      <strong>1. 회원가입에서 사용했던 <font size="4">이메일</font>을 꼭 기억하세요!<br></strong>
        - 이메일이 일치하지 않으면 보상이 지급되지 않습니다.<br><br>
      <strong>2. 설문조사를 완료한 후 제시되는 <font size="4" style="color:red;">코드</font>를 
      아래에 입력하시면 다음 단계로 넘어갈 수 있습니다!</strong>
      </p>
      
    </v-flex>
    <!-- The survey link must be added. -->
    <v-btn block color="primary" @click="onSurveyLinkClick">설문조사 하러 가기</v-btn>
    

    <v-flex xs12>
      <v-divider/>
      <br>
      설문을 완료했을 때 제시되는 코드를<br>아래 칸에 적어주세요.
      <v-text-field 
        v-model="code"
        label="코드"
      ></v-text-field>
      <v-btn block color="primary" :disabled="this.code.trim() !== this.answer" @click="onClickComplete">완료</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import GeneralToolbar from '~/components/GeneralToolbar.vue'

export default {
  // TODO: fetch policy list
  components: {
    GeneralToolbar
  },
  data: function () {
    return {
      isSurveyClicked: false,
      code: '',
      answer: '청바지'
    }
  },
  methods: {
    onClickComplete: function () {
      if (this.code === this.answer) {
        this.$ga.set({
          userId: this.$store.state.user.email
        })
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'FinishPreSurvey',
          eventLabel: ``,
          eventValue: 0
        })
        this.$store.dispatch('finishPresurvey')
        this.$router.push('/ShowPolicies')
      }
    },
    onSurveyLinkClick () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenPreSurvey',
        eventLabel: ``,
        eventValue: 0
      })
      window.open('https://goo.gl/forms/UuNJqFVuYQas6ZJI3', '_blank')
      this.isSurveyClicked = true
    }
  }
}
</script>