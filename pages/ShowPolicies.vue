<template>
  <v-layout row wrap justify-center>
    <general-toolbar :pagename="'정책 고르기'"/>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          영향을 알고 싶으신 정책을 선택해주세요.
        </v-card-text>
      </v-card>
      <v-spacer/><br>
      <br>
      <template v-if="userGroup>-1 && this.userStep < 3">
        <strong style="color: red;"> 실험 중에는 선택된 정책만 보실 수 있습니다. </strong>
      </template>

      <template v-for="policy in policies">
        <v-btn :key="policy.id" :disabled="selectPolicy(policy.id)" color="primary" large block @click="onPolicyClick(policy)">
          {{policy.title}}
        </v-btn>
      </template>
      <br>
      <template>
        <v-btn block :disabled="!experimentDone" color="success" @click="postSurvey">사용 후 설문</v-btn>
      </template>

    </v-flex>

  </v-layout>
</template>

<script>
import setTokenMixin from '~/mixins/setToken.js'
import GeneralToolbar from '~/components/GeneralToolbar.vue'

export default {
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from.path === '/MiniSurvey') {
        vm.$store.dispatch('incrementUserStep')
      }
    })
  },
  components: {
    GeneralToolbar
  },
  data: function () {
    return {
      drawer: false
    }
  },
  // List of policies fetched from here
  mixins: [setTokenMixin],
  fetch: async function ({app, store}) {
    const policies = await app.$axios.$get('/api/policies/')
    store.commit('setPolicies', policies.results)
  },
  asyncData: async function ({app, store}) { // fetch the list of policies from the server
    const userpolicies = await app.$axios.$get('/api/userpolicy/', {
      params: {
        user: store.state.user.pk
      }
    })
    return {
      userpolicies: userpolicies.results
    }
  },
  computed: {
    isLookingAround: function () {
      return this.$store.getters.isLookingAround
    },
    policies: function () {
      return this.$store.state.policies
    },
    userGroup: function () {
      // if (!this.$store.state.userToken || !this.$store.state.user.is_participant) {
      //   // console.log(this.$store.state.userToken)
      //   // console.log(this.$store.state.user.is_participant)
      //   return -1
      // } else {
      //   // console.log(this.$store.getters.experimentCondition)
      //   return this.$store.getters.experimentCondition
      // }
      return this.$store.getters.userGroup
    },
    userStep: function () {
      // console.log(this.$store.state.user)
      return this.$store.state.user.step
    },
    experimentDone: function () {
      return (this.userGroup > -1 && this.userStep >= 3)
    }
  },
  methods: {
    onPolicyClick: async function (policy) { // update the policy index in store
      this.$ga.event({
        eventCategory: '/ShowPolicies',
        eventAction: 'SelectPolicy',
        eventLabel: policy.title,
        eventValue: 0
      })
      // this.$store.commit('setPolicyId', {policyId: policy.id})
      this.$store.commit('setPolicy', policy)
      if (this.$store.state.userToken) {
        // const userpolicy = await this.$axios.$get('/api/userpolicy/', {
        //   params: {
        //     user: this.$store.state.user.pk,
        //     policy: policy.id
        //   }
        // })
        const upIdx = this.userpolicies.findIndex((up) => {
          return up.policy === policy.id
        })
        if (upIdx === -1) {
          const newUP = {
            user: this.$store.state.user.pk,
            policy: policy.id,
            effect_size: 0,
            user_type: this.$store.getters.userGroup,
            stakeholders_answered: 0,
            stakeholders_seen: 0,
            articles_seen: 0,
            effects_seen: 0
          }
          const result = await this.$axios.$post('/api/userpolicy/', newUP)
          this.$store.commit('setUserPolicy', result)
        } else {
          this.$store.commit('setUserPolicy', this.userpolicies[upIdx])
        }
        // this.$store.commit('clearBrowsedTags')
        if (!this.$store.state.user.is_participant) {
          this.$router.push('/Identify')
        } else if (this.$store.state.user.is_participant && (this.$store.state.user.step < 3)) {
          this.$store.commit('setReadCounter1', 0)
          this.$store.commit('setReadCounter2', 0)
          this.$router.push('/ReadNews')
        } else if (this.$store.state.user.is_participant && (this.$store.state.user.step >= 3)) {
          this.$router.push('/TagOverview')
        }
      } else {
        this.$router.push('/TagOverview')
      }
    },
    selectPolicy: function (policyID) {
      // console.log(policyID)
      if (this.userGroup === -1) {
        return false
      }
      if (this.userStep === 1) {
        return 2 - (this.userGroup % 2) !== policyID
      } else if (this.userStep === 2) {
        return 1 + (this.userGroup % 2) !== policyID
      } else {
        return false
      }
    },
    postSurvey: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'ToPostSurvey',
        eventLabel: '',
        eventValue: 0
      })
      this.$router.push('/PostSurvey')
    },
    closeDrawer: function (val) {
      this.drawer = val
    }
  }
}
</script>
<style scoped>
a {
  cursor: pointer;
}
</style>
