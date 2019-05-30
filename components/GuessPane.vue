<template>
  <v-card>
    <v-card-title>
      <template v-if="isGuessingStakeholder">
        <a @click="onAllStakeholdersClick">
          <span class="title">
            모든 이해 관계자
          </span>
        </a>
        <v-icon>chevron_right</v-icon>
        <span class="title">모든 이해 관계자</span>
      </template>
      <template v-else-if="isGuessingEffect || isExploringEffect">
        <a @click="onAllStakeholdersClick">
          <span class="title">
            모든 이해 관계자
          </span>
        </a>
        <v-icon>chevron_right</v-icon>
        <span class="title">#{{tagHigh.tag}}</span>
      </template>
      <v-spacer />
      <v-btn icon @click="isVisible = !isVisible">
        <v-icon>
          {{isVisible ? 'expand_less' : 'expand_more'}}
        </v-icon>
      </v-btn>
    </v-card-title>
    <!-- <v-expand-transition>
      <v-card-text v-if="isVisible">
        <v-layout row wrap justify-space-between>
          <v-flex xs3 v-for="(item, idx) in guessedItems" :key="`guess-item-${idx}`" class="guess-item">
            <guess-stakeholder-item
              v-if="item.tag"
              :guessedItem="item"
              :fixed="true"
              >
            </guess-stakeholder-item>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-expand-transition> -->
  </v-card>
</template>

<script>
export default {
  computed: {
    guessedItems: function () {
      return this.$store.state.guessedItems
    },
    tagHigh: function () {
      return this.$store.state.tagHigh
    },
    isGuessingStakeholder: function () {
      return this.$router.currentRoute.path === '/GuessStakeholder'
    },
    isGuessingEffect: function () {
      return this.$router.currentRoute.path === '/GuessEffects'
    },
    isExploringEffect: function () {
      return this.$router.currentRoute.path === '/ExploreEffects'
    }
  },
  data: function () {
    return {
      isVisible: false
    }
  },
  methods: {
    onAllStakeholdersClick: async function () {
      this.$router.push('/GuessStakeholder')
      // await this.$store.dispatch('setTagHigh', {tag: null})
    }
  }
}
</script>

<style scoped>
.guess-item {
  outline: 1px black;
}
.subheader {
  padding-bottom: 0.5em;
}
.v-card__title {
  padding-bottom: 0 !important;
  padding-top: 0 !important;
}
</style>
