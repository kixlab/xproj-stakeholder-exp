<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <p class="body-1">
        이 정책이 <strong class="red--text">{{randomStakeholderGroup.name}}</strong>에게<br>
        끼치는 영향을 보여드릴게요!
      </p>

      <v-flex xs12 sm6 offset-sm3
        v-for="effect in effects"
        :key="effect.id">
        <v-spacer></v-spacer>
        <effect-card :effect="effect" />
      </v-flex>
      
      <v-btn 
        color = "primary"
        @click="onPredictMoreClick"
        block ripple>
        다른 사람의 입장도 되어 볼래요!
      </v-btn>
    
    
    <v-dialog
      v-model="dialog"
      width="500"
      full-width
    >
      <v-btn
        slot="activator"
        color="primary"
        dark block ripple
      >
        끝! 이제 정책 영향을 한눈에 보여주세요!
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        > 주의
        </v-card-title>

        <v-card-text>
          현재 '정책의 영향 추론' 단계에서는 실험자가
          추론을 최소 3번 해야 보상을 받을 수 있습니다. <br><br>
          <template v-if="answer_left>0">
          귀하는 <strong><font size="4">{{answer_left}}번</font></strong> 남으셨습니다.<br>
          아래 <strong style="color:red;"> 추론하기 </strong>를 누르셔서 조건을 충족시키시기 바랍니다.
          <br><br>
          <strong style="color:red;"> (주의) 조건을 충족하지 않고 <span style="color:blue;">다음으로</span>
          넘어가시면, 포기로 간주되며 보상을 받을 수 없습니다. </strong>
          </template>

          <template v-else>
          귀하는 조건을 모두 충족하셨습니다.<br>
          <strong style="color:blue;"> 다음으로 </strong> 넘어가주세요.<br><br>

          그런데, 혹시 더 해보시고 싶으시면 <strong style="color:red;">추론하기</strong>를 누르셔도 좋습니다. :)
          </template>          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="red"
            flat outline ripple
            @click="onPredictMoreClick"
          > 추론하기 </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat outline ripple
            @click="onExploreOpinionsClick"
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
import EffectCard from '~/components/EffectCard.vue'
import setTokenMixin from '~/mixins/setToken.js'
export default {
  // Verify the guessed effect
  fetch: async function ({app, store}) {
    let effects = await app.$axios.$get('/api/effects/', {
      params: {
        policy: store.state.policyIdx,
        stakeholder_group: store.getters.randomStakeholderGroup.id
        // get_stakeholder_names: true
      }
    })
    // console.log(effects)
    store.commit('setEffects', effects.results)
  },
  mixins: [setTokenMixin],
  computed: {
    randomStakeholderGroup: function () {
      return this.$store.getters.randomStakeholderGroup
    },
    effects: function () {
      return this.$store.state.effects
    },
    policy: function () {
      return this.$store.state.policies[this.$store.state.policyIdx - 1]
    },
    answer_left: function () {
      // console.log(this.$store.state.userPolicy)
      return 3 - this.$store.state.userPolicy.stakeholders_answered
    }
  },
  components: {
    PromisePane,
    EffectCard
  },
  methods: {
    onExploreOpinionsClick: function () {
      this.$ga.event({
        eventCategory: '/VerifyEffect',
        eventAction: 'ToExploreOpinions',
        eventLabel: this.randomStakeholderGroup.name,
        eventValue: 0
      })
      this.$router.push('/SelectStakeholder')
      this.dialog = false
    },
    onPredictMoreClick: function () {
      this.$ga.event({
        eventCategory: '/VerifyEffect',
        eventAction: 'ToPredictMore',
        eventLabel: this.randomStakeholderGroup.name,
        eventValue: 0
      })
      this.$router.push('/GuessEffect')
      this.dialog = false
    }
  },
  data: function () {
    return {
      dialog: false
    }
  }
}
</script>
