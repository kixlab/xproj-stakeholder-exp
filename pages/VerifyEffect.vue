<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <p class="body-1">
        <!-- <v-chip v-for="tag in randomEffect.tags" :key="tag">{{tag}}</v-chip> <br> -->
        <br>
        <!-- 이 정책이 <strong class="red--text">{{randomEffect.stakeholder_detail}}</strong>에게<br>
        끼치는 영향을 보여드릴게요! -->
        지금까지 추측하신 영향이 맞는지 확인해보세요!
      </p>

      <!-- <v-flex xs12 sm6 offset-sm3
        v-for="effect in effects"
        :key="effect.id">
        <v-spacer></v-spacer>
        <effect-card :effect="effect" />
      </v-flex> -->
      <v-expansion-panel>
        <verify-effect-card v-for="effect in usedEffects" :key="effect.id" :used-effect="effect">
        </verify-effect-card>
      </v-expansion-panel>
      
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
            style="background-color:pink !important;
            color:red;"
          > <strong>주의</strong>
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
import VerifyEffectCard from '~/components/VerifyEffectCard.vue'
export default {
  // Verify the guessed effect
  fetch: async function ({app, store}) {
    const effects = await app.$axios.$get('/api/effects/', {
      params: {
        policy: store.state.policyId,
        tag: store.state.randomEffect.tags
        // get_stakeholder_names: true
      }
    })
    // console.log(effects)
    store.commit('setEffects', effects.results)
  },
  mixins: [setTokenMixin],
  computed: {
    effects: function () {
      return this.$store.state.effects
    },
    usedEffects: function () {
      return this.$store.state.usedEffects
    },
    policy: function () {
      return this.$store.state.policies[this.$store.state.policyId - 1]
    },
    answer_left: function () {
      // console.log(this.$store.state.userPolicy)
      return 3 - this.$store.state.userPolicy.stakeholders_answered
    },
    randomEffect: function () {
      return this.$store.state.randomEffect
    }
  },
  components: {
    PromisePane,
    EffectCard,
    VerifyEffectCard
  },
  methods: {
    onExploreOpinionsClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'ToExploreOpinions',
        eventLabel: this.randomEffect.id,
        eventValue: 0
      })
      this.$router.push('/TagOverview')
      this.dialog = false
    },
    onPredictMoreClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'ToPredictMore',
        eventLabel: this.randomEffect.id,
        eventValue: 0
      })
      this.$router.push('/GuessEffectRandom')
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
