<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <p class="body-1">
        이 정책이 <strong class="red--text">{{effects[0].stakeholder_name}}</strong>에게<br>
        끼치는 영향을 보여드릴게요!
      </p>

      <v-flex xs12 sm6 offset-sm3
        v-for="object in effects"
        :key="object">
        <v-spacer></v-spacer>
        <effect-card :effect="object" />
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
        @click.native="loader = 'loading'"
        ripple
      >
        여러분의 생각도 들려주세요!
      </v-btn>

      <v-btn
        :loading="loading"
        :disabled="loading"
        color="cyan"
        @click.native="loader = 'loading'"
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
      active_button: true
    }
  },
  methods: {
    next () {
      this.items.push({message: 'Baz'})
    },
    onNextButtonClick: function () {
      this.$router.push('SelectStakeholder')
    }
  }
}
</script>

