<template>
  <v-expansion-panel-content lazy>
    <div slot="header">
      <v-chip v-for="tag in usedEffect.tags" :key="tag">{{tag}}</v-chip>
    </div>
    <div v-if="effects.length > 0">
      <effect-card v-for="effect in effects" :key="effect.id" :effect="effect">
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


