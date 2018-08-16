<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <p class="body-1">
        이 정책이 <strong class="red--text">{{stakeholderName}}</strong>에게<br>
        줄 수 있는 영향을 보여드릴게요!
        <!--TODO: Disclaimer -->
      </p>

      <v-flex xs12 sm6 offset-sm3
        v-for="effect in effects"
        :key="effect.stakeholder_detail">
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
        다른 이해당사자의 목소리도 살펴보세요!
      </v-btn>
      <v-btn
        :loading="loading"
        :disabled="!$store.state.userToken || loading"
        color="primary"
        dark
        @click.native="onPostNewEffectButtonClick"
        ripple
      >
        여러분의 생각도 들려주세요!
      </v-btn>

      <v-btn
        :loading="loading"
        :disabled="loading"
        color="primary"
        dark
        @click.native="onEndButtonClick"
        ripple
      >
        다른 정책으로 넘어가기
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import EffectCard from '~/components/EffectCard.vue'
import PromisePane from '~/components/PromisePane.vue'
import setTokenMixin from '~/mixins/setToken.js'
export default {
  fetch: async function ({app, store}) {
    store.dispatch('incrementUserPolicyStakeholdersSeen')
  },
  mixins: [setTokenMixin],
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
    },
    stakeholderName: function () {
      return this.$store.getters.randomStakeholderGroup.name
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
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.$router.push('/SelectStakeholder')
    },
    onEndButtonClick: function () {
      this.$ga.event({
        eventCategory: '/ExploreOpinions',
        eventAction: 'ClickEndButton',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      if (!this.$store.state.userToken || !this.$store.user.is_participant) {
        this.$router.push('/ShowPolicies')
      } else {
        this.$router.push('/MiniSurvey')
      }
    },
    onPostNewEffectButtonClick: function () {
      this.$ga.event({
        eventCategory: '/ExploreOpinions',
        eventAction: 'PostNewEffect',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.$router.push('/GuessEffect')
    },
    onNoveltyButtonClick: function (effect) {

    },
    onEmpathyButtonClick: function (effect) {

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

