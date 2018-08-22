<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
        이 정책은 우리 사회에 어떤 영향을 끼칠까요?<br>
        이 정책의 이해당사자들은 어뗜 영향을 받을까요?
        </v-card-text>
      </v-card>
      &nbsp;
      <p class="body-1 prompt"> 아래 버튼을 누르면 이해당사자들이 받는 영향을<br>확인할 수 있습니다. </p>

      <v-layout row wrap>
        <stakeholder-overview-item v-for="sg in stakeholderGroups" :key="sg.id" :stakeholder="sg" @stakeholder-item-click="onStakeholderItemClick(sg)"></stakeholder-overview-item>
        <v-flex d-flex xs6>
          <v-card color="blue lighten-4" ripple @click.native="onNewStakeholderGroupClick" v-if="!isLookingAround">
            <v-card-text>
              <span class="link">혹시 여기 없는 이해당사자를 알고 계시나요?</span>
            </v-card-text>
          </v-card>
        </v-flex>          
      </v-layout>
      <v-btn v-if="!$store.state.userToken" color="primary" dark ripple block @click="onShowPolicyListClick">
        다른 정책 보기
      </v-btn>
      <v-dialog
        v-else
        v-model="dialog"
        width="500"
        full-width
      >
        <v-btn
          slot="activator"
          color="primary"
          dark ripple block
          @click.native="onShowDialogButtonClick">
          다른 정책 보기
        </v-btn>

        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
            style="background-color:pink !important;
            color:red;"
          > <strong>주의</strong>
          </v-card-title>

          <v-card-text>
            현재 '정책의 다양한 영향 이해' 단계에서는 실험자가 
            <strong>3개 그룹</strong>의 영향을 둘러보셔야 보상을 받을 수 있습니다. <br><br>
            <template v-if="stakeholder_left!=0">
            귀하는 <strong><font size="4">{{stakeholder_left}}개 그룹을</font></strong> 더 살펴보셔야 합니다.<br>
            아래 <strong style="color:red;"> 돌아가기 </strong>를 누르셔서 조건을 충족시키시기 바랍니다.
            <br><br>
            <strong style="color:red;"> (주의) 조건을 충족하지 않고 <span style="color:blue;">다음으로</span>
            넘어가시면, 포기로 간주되며 보상을 받을 수 없습니다. </strong>
            </template>

            <template v-else>
            귀하는 조건을 모두 충족하셨습니다.<br>
            <strong style="color:blue;"> 다음으로 </strong> 넘어가주세요.<br><br>

            그런데, 혹시 더 살펴보고 싶으시면 <strong style="color:red;">돌아가기</strong>를 누르셔도 좋습니다. :)
            </template>          
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              color="red"
              flat outline ripple
              @click="onDialogGoBackButtonClick"
            > 돌아가기 </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat outline ripple
              @click="onShowPolicyListClick"
            >
              다음으로
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-flex>
  </v-layout>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
import StakeholderOverviewItem from '~/components/StakeholderOverviewItem.vue'
export default {
  fetch: async function ({app, store, params}) {
    let stakeholderGroups = await app.$axios.$get('/api/stakeholdergroups/', {
      params: {
        policy: store.state.policyIdx
      }
    })
    store.commit('setStakeholderGroups', stakeholderGroups.results)
  },
  components: {
    PromisePane,
    StakeholderOverviewItem
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    effect: function () {
      return this.$store.state.effect
    },
    stakeholderGroups: function () {
      return this.$store.state.stakeholderGroups
    },
    isLookingAround: function () {
      return this.$store.getters.isLookingAround
    },
    stakeholder_left: function () {
      if (this.$store.state.userPolicy.stakeholders_seen > 3) {
        return 0
      }
      return 3 - this.$store.state.userPolicy.stakeholders_seen
    },
    effect_left: function () {
      if (this.$store.state.userPolicy.effects_seen > 9) {
        return 0
      }
      return 9 - this.$store.state.userPolicy.effects_seen
    }
  },
  data: function () {
    return {
      opinionTexts: false,
      dialog: false
    }
  },
  methods: {
    onNewStakeholderGroupClick: function () {
      this.$ga.event({
        eventCategory: '/SelectStakeholder',
        eventAction: 'NewStakeholderGroup',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      this.$router.push('/NewStakeholder')
    },
    onStakeholderItemClick: async function (sg) {
      const effects = await this.$axios.$get('/api/effects/', {
        params: {
          policy: this.policy.id,
          stakeholder_group: sg.id,
          get_stakeholder_names: true
        }
      })
      this.$store.commit('setEffects', effects.results)
      this.$ga.event({
        eventCategory: '/SelectStakeholder',
        eventAction: 'ShowStakeholderGroupEffects',
        eventLabel: `${this.policy.title} / ${sg.name}`,
        eventValue: 0
      })
      this.$store.commit('setStakeholderGroupIdx', sg.id)
      this.$router.push('/ExploreOpinions')
    },
    onShowPolicyListClick: function () {
      this.$ga.event({
        eventCategory: '/SelectStakeholder',
        eventAction: 'ShowPolicyList',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      if (!this.$store.state.userToken || !this.$store.state.user.is_participant || this.$store.state.user.step > 2) {
        this.$router.push('/ShowPolicies')
      } else {
        this.$router.push('/MiniSurvey')
      }
    },
    onShowDialogButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SeeOtherPolicy',
        eventLabel: `${this.policy.title} / stakeholder_left: ${this.stakeholder_left} / effect_left: ${this.effect_left}`,
        eventValue: 0
      })
      this.dialog = true
    },
    onDialogGoBackButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'GoBackToStakeholderList',
        eventLabel: `${this.policy.title} / stakeholder_left: ${this.stakeholder_left} / effect_left: ${this.effect_left}`,
        eventValue: 0
      })
      this.dialog = false
    }
  }
}
</script>
<style scoped>
.link {
  cursor: pointer;
  word-break: keep-all;
}
</style>


