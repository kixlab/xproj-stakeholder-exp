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
      원하는 정책을 선택해주세요.

      <template v-for="policy in policies">
        <v-btn :key="policy.id" color="primary" block @click="onPolicyClick(policy)">
          {{policy.title}}
        </v-btn>
      </template>

      <template v-if="!surveyActive">
        <v-btn block disabled color="secondary">사용 후 설문</v-btn>
      </template>
      <template v-else>
        <v-btn block color="secondary" @click="postSurvey">사용 후 설문</v-btn>
      </template>

    </v-flex>

  </v-layout>
</template>

<script>
export default {
  // List of policies fetched from here
  asyncData: async function ({app, store}) { // fetch the list of policies from the server
    const policies = await app.$axios.$get('/api/policies/')
    const userpolicies = await app.$axios.$get('/api/userpolicy/', {
      params: {
        user: store.state.user.pk
      }
    })
    return {
      policies: policies.results,
      surveyActive: (userpolicies.count >= 2) // more logic here...? or should it be placed on the backend?
    }
  },
  computed: {
    isLookingAround: function () {
      return this.$store.state.isLookingAround
    },
    experimentCondition: function () {
      return this.$store.getters.experimentCondition
    }
  },
  methods: {
    onPolicyClick: function (policy) { // update the policy index in store
      this.$ga.event({
        eventCategory: '/ShowPolicies',
        eventAction: 'SelectPolicy',
        eventLabel: policy.title,
        eventValue: 0
      })
      this.$store.commit('setPolicyIdx', {policyIdx: policy.id})
      this.$store.commit('setPolicy', policy)
      if (this.$store.state.user) {
        this.$axios.$get('/api/userpolicy/', {
          params: {
            user: this.$store.state.user.pk,
            policy: policy.id
          }
        }).then((userpolicy) => {
          if (userpolicy.count === 0) {
            const newUP = {
              user: this.$store.state.user.pk,
              policy: policy.id,
              effect_size: 0,
              user_type: this.$store.getters.experimentCondition,
              stakeholders_answered: 0,
              stakeholders_seen: 0
            }
            this.$axios.$post('/api/userpolicy', newUP).then((result) => {
              this.$store.commit('setUserPolicy', result)
            })
          } else {
            this.$store.commit('setUserPolicy', userpolicy.results[0])
          }
          this.$router.push('ReadNews')
        })
      } else {
        this.$router.push('SelectStakeholder')
      }
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
