<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title style="margin: 0 auto;">
        <!-- The line must be ended with a single space -->
        <small> 사용 후 설문 </small>
        <v-icon dark>tag_faces</v-icon>
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      <h1>수고 많으셨습니다!</h1>
      이제 마지막입니다.
      사용 후 설문조사를 완료하시면 10,000원 상당의 기프티콘을 드립니다.
    </v-flex>
    <v-btn block color="primary" @click="onSurveyLinkClick">
      설문조사 하러 가기
    </v-btn>
  </v-layout>
</template>
<style scoped>
#goback {
    float: left;
    position: absolute;
}
</style>
<script>
export default {
  computed: {
    surveyAddr: function () {
      if (this.$store.getters.experimentCondition === 1 || this.$store.getters.experimentCondition === 2) {
        return 'https://goo.gl/forms/RuE9zgh1FoEWNReE3'
      } else if (this.$store.getters.experimentCondition === 3 || this.$store.getters.experimentCondition === 4) {
        return 'https://goo.gl/forms/FZMGfoCZTc36Uj662'
      } else if (this.$store.getters.experimentCondition === 5 || this.$store.getters.experimentCondition === 0) {
        return 'https://goo.gl/forms/jXUzwEm6Wff9FckF2'
      }
    // },
    // answer: function () {
    //   if (this.$store.getters.experimentCondition === 1 || this.$store.getters.experimentCondition === 2) {
    //     return '이명박'
    //   } else if (this.$store.getters.experimentCondition === 3 || this.$store.getters.experimentCondition === 4) {
    //     return '이명박'
    //   } else if (this.$store.getters.experimentCondition === 5 || this.$store.getters.experimentCondition === 0) {
    //     return '이명박'
    //   }
    }
  },
  data: function () {
    return {
      isSurveyClicked: false
    }
  },
  methods: {
    goback () {
      this.$router.push('/ShowPolicies')
    },
    onSurveyLinkClick () {
      window.open(this.surveyAddr, '_blank')
      this.isSurveyClicked = true
    }
  }
}
</script>