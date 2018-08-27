<template>
  <v-layout row wrap justify-center>
    <general-toolbar :pagename="'사용 후 설문'"/>

    <v-flex xs12>
      <h1>수고 많으셨습니다!</h1>
      이제 마지막입니다.
      <br>
      사용 후 설문조사를 완료하시면 7,500원 상당의 기프티콘을 드립니다.
      <br>
      <br>
      <strong style="color:red;"> (주의) 이 설문에 참여하셔야 보상을 받을 수 있습니다. </strong>

      <v-btn block color="primary" @click="onSurveyLinkClick">설문조사 하러 가기</v-btn>

    </v-flex>
    
    <v-flex xs12 v-if="isSurveyClicked">
      <v-divider/>
      <br>
      설문을 모두 완료하셨다면, 이것으로 실험은 끝났습니다.
      아래 버튼을 누르셔서 다른 정책이 사회에 끼치는 영향도 확인해보세요!
      <v-btn block color="success" @click="onClickComplete">다른 정책 보러 가기</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import GeneralToolbar from '~/components/GeneralToolbar.vue'

export default {
  components: {
    GeneralToolbar
  },
  computed: {
    surveyAddr: function () {
      if (this.$store.getters.experimentCondition === 1 || this.$store.getters.experimentCondition === 2) {
        return 'https://goo.gl/forms/AUChMEOC6XjjkRi03'
      } else if (this.$store.getters.experimentCondition === 3 || this.$store.getters.experimentCondition === 4) {
        return 'https://goo.gl/forms/DYYPtPoNRdQZJh7v1'
      } else if (this.$store.getters.experimentCondition === 5 || this.$store.getters.experimentCondition === 0) {
        return 'https://goo.gl/forms/4aTnnOenpV6Q2VCi1'
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
    onSurveyLinkClick () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenPostSurvey',
        eventLabel: ``,
        eventValue: 0
      })
      window.open(this.surveyAddr, '_blank')
      this.isSurveyClicked = true
    },
    onClickComplete () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'FinishPostSurvey',
        eventLabel: ``,
        eventValue: 0
      })
      // is_participant must be set to false
      this.$router.push('/ShowPolicies')
    }
  }
}
</script>