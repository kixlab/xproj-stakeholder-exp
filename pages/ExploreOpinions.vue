<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <p class="body-1">
        이 정책이 <strong class="red--text">{{effects[0].stakeholder_group}}</strong>에게<br>
        끼치는 영향을 보여드릴게요!
      </p>

      <v-flex xs12 sm6 offset-sm3
        v-for="effect in effects"
        :key="effect.stakeholder_detail"
        v-if="effects[0].stakeholder_group==effect.stakeholder_group">
        <v-spacer></v-spacer>
        <effect-card :effect="effect"
        @empathy-button-click="onEmpathyButtonClick(effect)"
        @novelty-button-click="onNoveltyButtonClick(effect)" />
      </v-flex>
      
      <v-btn 
        v-if = "active_button"
        color = "success"
        @click="onNextButtonClick"
        block ripple>
        다른 것도 볼래요!
      </v-btn>
      <v-btn
        :loading="loading"
        :disabled="loading"
        color="cyan"
        @click.native="onPostNewEffectButtonClick"
        ripple
      >
        여러분의 생각도 들려주세요!
      </v-btn>

      <v-btn
        :loading="loading"
        :disabled="loading"
        color="cyan"
        @click.native="onEndButtonClick"
        ripple
      >
        끝
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import EffectCard from '~/components/EffectCard.vue'
import PromisePane from '~/components/PromisePane.vue'
export default {
  fetch: async function ({app, store}) {
    store.dispatch('incrementUserPolicyStakeholdersSeen')
  },
  components: {
    EffectCard,
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    effects: function () {
      return this.$store.state.effects
    }
  },
  data: function () {
    return {
      opinionTexts: false,
      active_button: true,
      loading: false
    }
  },
  methods: {
    onNextButtonClick: function () {
      this.$ga.event({
        eventCategory: '/ExploreOpinions',
        eventAction: 'SeeMoreEffects',
        eventLabel: this.effects[0].stakeholder_group,
        eventValue: 0
      })
      this.$router.push('SelectStakeholder')
    },
    onEndButtonClick: function () {
      this.$ga.event({
        eventCategory: '/ExploreOpinions',
        eventAction: 'ClickEndButton',
        eventLabel: this.effects[0].stakeholder_group,
        eventValue: 0
      })
      // In second case, redirect to PostSurvey directly.
      this.$router.push('MiniSurvey')
    },
    onPostNewEffectButtonClick: function () {
      this.$ga.event({
        eventCategory: '/ExploreOpinions',
        eventAction: 'PostNewEffect',
        eventLabel: this.effects[0].stakeholder_group,
        eventValue: 0
      })
      this.$router.push('GuessEffect')
    },
    onNoveltyButtonClick: function (effect) {
      this.$axios.$post('/api/novelty/', {
        effect: effect.id
      }).then(() => {
        this.$axios.$get('/api/stakeholdergroups/', {
          params: {
            policy: this.$store.state.policyIdx
          }
        }).then((result) => {
          this.$store.commit('setStakeholderGroups', result.results)
        })
      })
      this.$ga.event({
        eventCategory: '/ExploreOpinions',
        eventAction: 'UpvoteNovelty',
        eventLabel: effect.id,
        eventValue: 0
      })
    },
    onEmpathyButtonClick: function (effect) {
      this.$axios.$post('/api/empathy/', {
        effect: effect.id
      }).then(() => {
        this.$axios.$get('/api/stakeholdergroups/', {
          params: {
            policy: this.$store.state.policyIdx
          }
        }).then((result) => {
          this.$store.commit('setStakeholderGroups', result.results)
        })
      })
      this.$ga.event({
        eventCategory: '/ExploreOpinions',
        eventAction: 'UpvoteNovelty',
        eventLabel: effect.id,
        eventValue: 0
      })
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  }
}
</script>

