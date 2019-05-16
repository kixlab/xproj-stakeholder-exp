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

      <template v-for="policy in policies"> <!-- ontest -->
        <v-btn :key="policy.id" :disabled="selectPolicy(policy.id)" color="primary" large block @click="onPolicyBtnClick(policy)">
          {{policy.title}}
        </v-btn>
      </template>
      <br>
      <template>
        <v-btn block :disabled="!experimentDone" color="success" @click="postSurvey">사용 후 설문</v-btn>
      </template>

    </v-flex>
    <v-dialog
      v-model="showInitialOpinionDialog"
      max-width="50%"
      >
      <v-card>
        <v-card-title>
          <span class="dialog__title">이 정책에 대해 어떻게 생각하시는 지 알려주세요!</span>
        </v-card-title>
        <v-divider/>
        <v-card-text>
          먼저, <span class="policy__title">{{chosenPolicy.title}}</span> 정책에 대한 간단한 설명을 읽어주세요.
          <br>
          <div v-html="chosenPolicy.description">
          </div>
          <br>
          <v-divider/>
          <br>
          이 정책에 대해 어떻게 생각하시나요? 
          <v-slider
            max="5"
            min="1"
            :tick-labels="opinions"
            v-model="initialStance">
          </v-slider>
          
          왜 그렇게 생각하시나요? 이유를 적어주세요!
          <v-text-field 
            v-model="initialOpinion"
            multi-line="true">

          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="success" @click="onPolicyClick(chosenPolicy)">
            다음
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      drawer: false,
      opinions: ['매우 부정적', '부정적', '중립', '긍정적', '매우 긍정적'],
      showInitialOpinionDialog: false,
      chosenPolicy: {},
      initialOpinion: '',
      initialStance: ''
    }
  },
  // List of policies fetched from here
  mixins: [setTokenMixin],
  fetch: async function ({app, store}) {
    const policies = await app.$axios.$get('/api/policies/')
    policies.results.forEach(function (p) {
      p.key_stakeholders = p.key_stakeholders.split(',')
    })
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
      return this.$store.getters.userGroup
    },
    userStep: function () {
      return this.$store.state.user.step
    },
    experimentDone: function () {
      return (this.userGroup > -1 && this.userStep >= 3)
    }
  },
  methods: {
    onPolicyBtnClick: function (policy) {
      this.chosenPolicy = policy
      this.showInitialOpinionDialog = true
    },
    onPolicyClick: async function (policy) {
      this.$ga.event({
        eventCategory: '/ShowPolicies',
        eventAction: 'SelectPolicy',
        eventLabel: policy.title,
        eventValue: 0
      })
      this.$store.commit('setPolicy', policy)
      this.$store.dispatch('setInitialOpinion', {
        initialStance: this.initialStance,
        initialOpinion: this.initialOpinion,
        policy: policy.id
      })
      if (this.$store.state.userToken) {
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
        if (!this.$store.state.user.is_participant) {
          // this.$router.push('/GuessStakeholder')
          this.$router.push('/ReadNews')
        } else if (this.$store.state.user.is_participant && (this.$store.state.user.step < 3)) {
          // this.$store.commit('setReadCounter1', 0)
          // this.$store.commit('setReadCounter2', 0)
          this.$router.push('/ReadNews')
          // this.$router.push('/TagOverview')
        } else if (this.$store.state.user.is_participant && (this.$store.state.user.step >= 3)) {
          // this.$router.push('/TagOverview')
          this.$router.push('/ReadNews')
        }
      } else {
        this.$router.push('/TagOverview')
      }
    },
    selectPolicy: function (policyID) {
      if (this.userGroup === -1) {
        return false // non-participants can select whatever they want
      }
      if (this.userStep === 1) {
        return 2 - (this.userGroup % 2) !== policyID // 0 & 4 will see the second policy first
      } else if (this.userStep === 2) {
        return 1 + (this.userGroup % 2) !== policyID // 3 & 5 will see the first policy first
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

.policy__title {
  font-weight: bold;
}

.dialog__title {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
