<template>
  <v-card>
    <v-card-title>
      <span class="title">예상한 이해 관계자 보기</span>
      <v-spacer />
      <v-btn icon @click="isVisible = !isVisible">
        <v-icon>
          {{isVisible ? 'expand_less' : 'expand_more'}}
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <v-card-text v-if="isVisible">
        <v-layout row wrap justify-space-between>
          <v-flex xs3 v-for="(item, idx) in guessedItems" :key="`guess-item-${idx}`" class="guess-item">
            <guess-pane-stakeholder-item
              :guessedItem="item"
              >
            </guess-pane-stakeholder-item>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
import GuessPaneStakeholderItem from '~/components/GuessPaneStakeholderItem.vue'

export default {
  components: {
    GuessPaneStakeholderItem
  },
  computed: {
    guessedItems: function () {
      return this.$store.state.guessedItems
    }
  },
  data: function () {
    return {
      isVisible: false
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
