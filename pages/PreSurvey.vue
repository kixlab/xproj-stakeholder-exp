<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" dark fixed app>
      <v-toolbar-title style="margin: 0 auto;">
        <!-- The line must be ended with a single space -->
        <small> 사용 전 설문 </small>
        <v-icon dark>tag_faces</v-icon>
      </v-toolbar-title>
    </v-toolbar>
        
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          <strong>"정책타입"</strong>을 통해<br>정책도 이해하고, 기프티콘도 받아가세요!
        </v-card-text>
      </v-card>
      <p style="text-align:left;">
        <br>
      시스템을 사용하시고, 시스템 사용 전후 설문조사에 참여하시면
      7,500원 상당의 기프티콘을 드립니다. (최대 1시간 소요) <br>
      <br>
      </p>
      <strong> (주의)<br>
      1. 회원가입에서 사용했던 <font size="4">이메일</font>을 꼭 기억하세요!<br>
      2. 설문조사를 완료한 후 <font size="4">코드</font>를 확인하세요!</strong>
      
    </v-flex>
    <!-- The survey link must be added. -->
    <v-btn block color="primary" @click="onSurveyLinkClick">설문조사 하러 가기</v-btn>

    <v-flex xs12 v-if="isSurveyClicked">
      설문을 완료하신 뒤 받은 코드를 적어주세요.
      <v-text-field 
        v-model="code"
        label="코드"
      ></v-text-field>
      <v-btn block color="primary" :disabled="this.code !== this.answer" @click="onClickComplete">완료</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  // TODO: fetch policy list
  computed: {
    experimentCondition: function () {
      return this.$store.getters.experimentCondition
    }
  },
  data: function () {
    return {
      isSurveyClicked: false,
      code: '',
      answer: 'kixlab'
    }
  },
  methods: {
    onClickComplete: function () {
      if (this.code === this.answer) {
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
      window.open('https://goo.gl/forms/qQsZlH1US44ejRWn2', '_blank')
      this.isSurveyClicked = true
    }
  }
}
</script>