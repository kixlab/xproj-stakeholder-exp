<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
        이 정책은 우리 사회에 어떤 영향을 끼칠까요?<br>
        이 정책의 이해당사자들은 어떤 영향을 받을까요?
        </v-card-text>
      </v-card>
      &nbsp;
      <p class="body-1 prompt"> 아래 버튼을 누르면 이해당사자들이 받는 영향을<br>확인할 수 있습니다. </p>
      <tag-overview-item v-for="tag in tags" :key="tag.name" :tag="tag" :maxValue="maxValue" @tag-click="onTagClick">
      </tag-overview-item>
      <v-btn color="primary" dark ripple block @click="onNewStakeholderClick">
        새로운 영향 남기기
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
import TagOverviewItem from '~/components/TagOverviewItem.vue'
export default {
  fetch: async function ({app, store, params}) {
    store.dispatch('setTags')
  },
  components: {
    PromisePane,
    TagOverviewItem
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    tags: function () {
      return this.$store.state.tags
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
    },
    maxValue: function () {
      const t = this.tags.map((tag) => { return tag.refs })
      console.log(t)
      return Math.max(...t)
    }
  },
  data: function () {
    return {
      opinionTexts: false,
      dialog: false
    }
  },
  methods: {
    onNewStakeholderClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'NewStakeholder',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      this.$router.push('/NewStakeholder')
    },
    onTagClick: async function (tag) {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'ShowStakeholderGroupEffects',
        eventLabel: `${this.policy.title}`,
        eventValue: 0
      })
      this.$store.commit('setSelectedTag', tag)
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
.v-card__title {
  padding-bottom:0 !important;
}
</style>


