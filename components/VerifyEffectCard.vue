<template>
  <v-expansion-panel-content lazy>
    <div slot="header">
      <!-- <v-chip v-for="tag in usedEffect.tags" :key="tag">{{tag}}</v-chip> -->
      {{usedEffect.stakeholder_detail}}
    </div>
    <div v-if="effects.length > 0">
      <effect-card v-for="effect in effects" :key="effect.id" :effect="effect" expanded 
      @empathy-button-click="onEmpathyButtonClick"
      @novelty-button-click="onNoveltyButtonClick"
      @fishy-button-click="onFishyButtonClick"
      >
      </effect-card>
      <v-divider/>
    </div>
  </v-expansion-panel-content>
</template>

<script>
// import setTokenMixin from '~/mixins/setToken.js'
import EffectCard from '~/components/EffectCard.vue'
export default {
  data: function () {
    return {
      effects: []
    }
  },
  components: {
    EffectCard
  },
  props: {
    usedEffect: {
      validator: function (value) {
        return ('tags' in value) && ('description' in value)
      }
    }
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    }
  },
  mounted: async function () {
    const effects = await this.$axios.$get('/api/effects/', {
      params: {
        policy: this.policy.id,
        tag: this.usedEffect.tags,
        page_size: 50
      }
    })
    this.effects = effects.results
  },
  methods: {
    onEmpathyButtonClick: async function (effect) {
      const isEmpathyVoted = effect.empathy.includes(this.$store.state.user.pk)

      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: isEmpathyVoted ? 'CancelUpvoteEmpathy' : 'UpvoteEmpathy',
        eventLabel: `${effect.id},${effect.stakeholder_detail}`,
        eventValue: 0
      })
      try {
        await this.$axios.$post('/api/empathy/', {
          effect: effect.id
        })
        effect.empathy.push(this.$store.state.user.pk)
      } catch (err) {
        if (err.response.code === 409) {
          // this.$store.commit('decreaseEmpathyCount', {
          //   effect: this.effect.id
          // })
          const idx = effect.empathy.indexOf(this.$store.state.user.pk)
          effect.empathy.splice(idx, 1)
        }
      } finally {
        const result = await this.$axios.$get('/api/effects/', {
          params: {
            policy: this.policy.id,
            tag: this.usedEffect.tags,
            page_size: 50
          }
        })
        this.effects = result.results
      }
    },
    onNoveltyButtonClick: async function (effect) {
      const isNoveltyVoted = effect.novelty.includes(this.$store.state.user.pk)

      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: isNoveltyVoted ? 'CancelUpvoteNovelty' : 'UpvoteNovelty',
        eventLabel: `${effect.id},${effect.stakeholder_detail}`,
        eventValue: 0
      })
      try {
        await this.$axios.$post('/api/novelty/', {
          effect: effect.id
        })
        effect.novelty.push(this.$store.state.user.pk)
      } catch (err) {
        if (err.response.code === 409) {
          // this.$store.commit('decreaseNoveltyCount', {
          //   effect: this.effect.id
          // })
          const idx = effect.novelty.indexOf(this.$store.state.user.pk)
          effect.novelty.splice(idx, 1)
        }
      } finally {
        const result = await this.$axios.$get('/api/effects/', {
          params: {
            policy: this.policy.id,
            tag: this.usedEffect.tags,
            page_size: 50
          }
        })
        this.effects = result.results
      }
    },
    onFishyButtonClick: async function (effect) {
      const isFishyVoted = effect.fishy.includes(this.$store.state.user.pk)

      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: isFishyVoted ? 'CancelUpvoteFishy' : 'UpvoteFishy',
        eventLabel: `${effect.id},${effect.stakeholder_detail}`,
        eventValue: 0
      })
      try {
        await this.$axios.$post('/api/fishy/', {
          effect: effect.id
        })
        effect.fishy.push(this.$store.state.user.pk)
      } catch (err) {
        if (err.response.code === 409) {
          // this.$store.commit('decreaseFishyCount', {
          //   effect: this.effect.id
          // })
          const idx = effect.fishy.indexOf(this.$store.state.user.pk)
          effect.fishy.splice(idx, 1)
        }
      } finally {
        const result = await this.$axios.$get('/api/effects/', {
          params: {
            policy: this.policy.id,
            tag: this.usedEffect.tags,
            page_size: 50
          }
        })
        this.effects = result.results
      }
    }
  }
}
</script>

<style scoped>
.v-card__text {
  text-align: left !important;
  padding-bottom: 0;
}
.v-card__title {
  padding-bottom: 0;
}
.effect-card__text {
  color: black;
}
.effect-card__textbox {
  text-align: left !important;
}
.v-btn--small {
  min-width: 70px;
  padding: 0 !important;
}
</style>


