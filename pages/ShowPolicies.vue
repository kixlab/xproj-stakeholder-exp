<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title style="margin: 0 auto;">
        <div>
          <!-- Length of policy name should be less than 18 Korean syllables -->
          <!-- The line must be ended with a single space -->
          <small> 정책 고르기! </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          여러분의 목소리를 내는 것은 물론,<br>
          다양한 사람의 목소리를 한눈에 들을 수 있습니다!
        </v-card-text>
      </v-card>
      <v-spacer/><br>
      원하는 정책을 선택해주세요.<br>
      <template v-if="userGroup>-1">
        <strong style="color: red;"> 실험 중에는 선택된 정책만 보실 수 있습니다. </strong>
      </template>

      <template v-for="policy in policies">
        <v-btn :key="policy.id" :disabled="selectPolicy(policy.id)" color="primary" block @click="onPolicyClick(policy)">
          {{policy.title}}
        </v-btn>
      </template>

      <template v-if="experimentDone()">
        <v-btn block color="primary" @click="postSurvey">사용 후 설문</v-btn>
      </template>
      <template v-else>
        <v-btn block disabled color="primary">사용 후 설문</v-btn>
      </template>

    </v-flex>

  </v-layout>
</template>

<script>
export default {
  // List of policies fetched from here
  // asyncData: async function ({app, store}) { // fetch the list of policies from the server
  //  let policies = await app.$axios.$get('/api/policies/')
  //  return {policies: policies.results}
  // },
  data: function () {
    return {
      surveyActive: false
    }
  },
  computed: {
    policies: function () {
      return this.$store.state.policies
    },
    userGroup: function () {
      if (!this.$store.state.user.isParticipant) {
        console.log('fire')
        return -1
      } else {
        console.log(this.$store.getters.experimentCondition)
        return this.$store.getters.experimentCondition
      }
    },
    userStep: function () {
      return this.$store.state.user.step
    }
  },
  methods: {
    onPolicyClick: function (policy) { // update the policy index in store
      this.$ga.event({
        eventCategory: 'ShowPolicies',
        eventAction: 'SelectPolicy',
        eventLabel: policy.title,
        eventValue: 0
      })
      this.$store.commit('setPolicyIdx', {policyIdx: policy.id})
      this.$store.commit('setPolicy', policy)
      // TODO: Log to database
      switch (this.userGroup) {
        case 1:
        case 2:
          this.$router.push('readNews')
          break
        case 3:
        case 4:
          this.$router.push('selectStakeholder')
          break
        case 5:
        case 0:
        case -1:
          this.$router.push('Identify')
          break
      }
    },
    selectPolicy: function (policyID) {
      if (this.userGroup === -1) {
        return false
      }
      if (this.userStep === 1) {
        return 2 - (this.userGroup % 2) !== policyID
      } else if (this.userStep === 2) {
        return 1 + (this.userGroup % 2) !== policyID
      } else {
        return true
      }
    },
    experimentDone: function () {
      if (this.userGroup > -1 && this.userStep === 3) {
        return true
      }
      return false
    },
    postSurvey: function () {
      this.$router.push('postSurvey')
    }
  }
}
</script>
<style scoped>
a {
  cursor: pointer;
}
</style>
