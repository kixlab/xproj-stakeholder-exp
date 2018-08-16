<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title id="header">
        <v-icon dark id="gohome" @click="gohome">home</v-icon>
        <div style="flex: 1;">
          <!-- The line must be ended with a single space -->
          <small> 사용 전 설문 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
        
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      시스템 이용 전후 설문조사와, 시스템 내에서 정책 세 번에 대해 여러분의 목소리를 들려주시면
      10,000원 상당의 기프티콘을 드립니다. (약 1시간 소요) <br>
      <br>
      <strong style="color:red;"> (주의) 설문에 참여하지 않고 진행하시면 보상을 받을 수 없습니다. </strong>
    </v-flex>
    <!-- The survey link must be added. -->
    <v-btn block color="primary" @click="onSurveyLinkClick">설문 하러 가기</v-btn>

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
<style scoped>
#gohome {
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
      answer: '이명박'
    }
  },
  methods: {
    gohome () {
      this.$router.push('/')
    },
    onClickComplete: function () {
      if (this.code === this.answer) {
        this.$router.push('/ShowPolicies')
      }
    },
    onSurveyLinkClick () {
      window.open('https://goo.gl/forms/qQsZlH1US44ejRWn2', '_blank')
      this.isSurveyClicked = true
    }
  }
}
</script>