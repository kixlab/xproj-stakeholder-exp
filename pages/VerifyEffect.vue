<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <p class="body-1">
        이 정책이 <strong class="red--text">{{effects[0].stakeholder_name}}</strong>에게<br>
        끼치는 영향을 보여드릴게요!
      </p>

      <v-flex xs12 sm6 offset-sm3
        v-for="effect in effects"
        :key="effect.stakeholder_detail"
        v-if="effects[0].stakeholder_name==effect.stakeholder_name">
        <v-spacer></v-spacer>
        <effect-card :effect="effect" />
      </v-flex>
      
      <v-btn 
        v-if = "active_button"
        color = "success"
        @click="onPredictMoreClick"
        block ripple>
        다른 것도 볼래요!
      </v-btn>
      <v-btn 
        v-if = "active_button"
        color = "success"
        @click="onExploreOpinionsClick"
        block ripple>
        효과 모두 보기
      </v-btn>

      <v-btn
        :loading="loading"
        :disabled="loading"
        color="cyan"
        @click.native="loader = 'loading'"
        ripple>
        끝
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
import EffectCard from '~/components/EffectCard.vue'
export default {
  // Verify the guessed effect

  asyncData: async function ({app, store}) {
    let effects = await app.$axios.$get('/api/effects/', {
      params: {
        policy: store.state.policyIdx,
        stakeholder_group: store.getters.randomStakeholderGroup.id
        // get_stakeholder_names: true
      }
    })
    console.log(effects)
    return {filteredEffects: effects.results}
  },
  computed: {
    randomStakeholderGroup: function () {
      return this.$store.getters.randomStakeholderGroup
    },
    policy: function () {
      return this.$store.state.policy
    },
    effects: function () {
      return this.$store.state.effects
    }
  },
  components: {
    PromisePane,
    EffectCard
  },
  methods: {
    onExploreOpinionsClick: function () {
      this.$ga.event({
        eventCategory: 'VerifyEffect',
        eventAction: 'ToExploreOpinions',
        eventLabel: this.randomStakeholderGroup.name,
        eventValue: 0
      })
      this.$router.push('SelectStakeholder')
    },
    onPredictMoreClick: function () {
      this.$ga.event({
        eventCategory: 'VerifyEffect',
        eventAction: 'ToPredictMore',
        eventLabel: this.randomStakeholderGroup.name,
        eventValue: 0
      })
      this.$router.push('GuessEffect')
    }
  },
  data: function () {
    return {
    }
  }
}
</script>
