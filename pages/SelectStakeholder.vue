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
      <p class="body-1 prompt"> 이해당사자들의 다양한 목소리를 들어보세요!</p>

      <v-layout row wrap>
        <stakeholder-overview-item v-for="sg in stakeholderGroups" :key="sg.id" :stakeholder="sg" @stakeholder-item-click="onStakeholderItemClick(sg)"></stakeholder-overview-item>
        <v-flex d-flex xs6>
          <v-card color="dark blue" dark ripple @click.native="onNewStakeholderGroupClick" v-if="!isLookingAround">
            <v-card-text>혹시 영향을 받을<br>다른 사람들도 있을까요?</v-card-text>
          </v-card>
        </v-flex>          
      </v-layout>
    
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
      return this.$store.state.isLookingAround
    }
    // summaries: function () {
    //   return this.$store.state.summaries
    // }
  },
  data: function () {
    return {
      opinionTexts: false
    }
  },
  methods: {
    onNewStakeholderGroupClick: function () {
      this.$ga.event({
        eventCategory: '/SelectStakeholder',
        eventAction: 'ClickedNewStakeholderGroupButton',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      this.$router.push('NewStakeholder')
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
        eventAction: 'ClickedStakeholderGroup',
        eventLabel: `${this.policy.title} / ${sg.name}`,
        eventValue: 0
      })
      this.$store.commit('setStakeholderGroupIdx', sg.id)
      this.$router.push('ExploreOpinions')
    }
  }
}
</script>

