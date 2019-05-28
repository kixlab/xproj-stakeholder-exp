<template>
  <v-layout row wrap justify-center>
    <v-flex md10 lg8>
      <effect-card
        :effect="effect"
        >
      </effect-card>
    </v-flex>
    <v-flex xs12>
      <v-btn @click="randEffect()">
        좋아요!
      </v-btn>
      <v-btn @click="randEffect()">
        싫어요!
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import EffectCard from '~/components/EffectCard.vue'
export default {
  components: {
    EffectCard
  },
  computed: {
    effects: function () {
      return this.$store.state.effects
    }
  },
  methods: {
    randEffect: function () {
      const random = Math.floor(Math.random() * this.effects.length)
      console.log(random)
      this.effect = this.effects[random]
    }
  },
  beforeMount: function () {
    this.randEffect()
  },
  data: function () {
    return {
      effect: null
    }
  }
}
</script>

<style scoped>

</style>
