<template>
  <v-layout row wrap justify-center>
    <general-toolbar :pagename="'중간 설문'"/>
    <v-flex xs12>
      <h2>{{step}}번째 정책은 잘 보셨나요?</h2>
      아래 링크의 설문을 완료한 뒤 다음으로 넘어가주세요.<br>
      <v-btn block color="success" @click="openPostSurvey">설문 하러가기</v-btn>
    </v-flex>
    <v-flex xs12 v-if="user.step === 2">
      중간 설문을 마치신 후, 꼭 실험 후 설문까지 참여해주세요!
    </v-flex>
    <v-flex xs12>
      <v-btn block color="primary" @click="nextPolicy">다음</v-btn>
    </v-flex>
  </v-layout>
</template>
<style scoped>
#goback {
    float: left;
    position: absolute;
}
</style>
<script>
import setTokenMixin from '~/mixins/setToken.js'
import goNextMixin from '~/mixins/goNext.js'
import GeneralToolbar from '~/components/GeneralToolbar.vue'
import Loader from '~/components/Loader.vue'

export default {
  components: {
    GeneralToolbar,
    Loader
  },
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
    nextPolicy () {
      this.$store.dispatch('incrementUserStep')
      this.$router.push('/ShowPolicies')
    },
    openPostSurvey: function () {
      window.open(this.surveyURLs[`post${this.policy.id}`], '_blank')
    }
  },
  mixins: [setTokenMixin, goNextMixin],
  data: function () {
    return {
      onLoading: false
    }
  },
  computed: {
    user: function () {
      return this.$store.state.user
    },
    policy: function () {
      return this.$store.state.policy
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