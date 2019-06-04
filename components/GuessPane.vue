<template>
  <v-card>
    <v-card-title :class="(isGuessingEffect || isExploringEffect) ? 'no--padding' : ''">
      <template v-if="isGuessingStakeholder">
        <!-- <a @click="onAllStakeholdersClick">
          <span class="title">
            모든 이해 관계자
          </span>
        </a>
        <v-icon>chevron_right</v-icon> -->
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
      <v-btn v-if="!opened && (isGuessingEffect || isExploringEffect)" icon @click="isVisible = !isVisible">
        <v-icon>
          {{isVisible ? 'expand_less' : 'expand_more'}}
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <v-card-text v-if="isVisible || opened">
        <span class="prompt" v-if="opened">
          {{policy.title}} 정책과 관련해 의견을 알고 싶으신 집단을 선택해주세요!
        </span>
        <v-layout row justify-space-between fill-height> 
          <v-flex xs3>
            <v-card class="guesses" dark color="grey"
              >
              <v-card-title class="title">
                기사에 많이 언급된 사람들
              </v-card-title>
              <v-card-text>
                <div v-for="t in importantTags" 
                  :key="t"
                  @click="onKeywordSelected(t)"
                  class="mytags"
                  >
                  <span class="mytag">{{t}}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs3 v-for="(box, idx) in mybox" :key="`box${idx}`">
            <v-card class="guesses" dark :color="colors[idx]">
              <v-card-title class="title">
                {{title[idx]}}
              </v-card-title>
              <v-card-text>
                <div v-for="e in box" 
                  :key="e.tag"
                  @click="onKeywordSelected(e.tag)"
                  class="mytags"
                  >
                  <span class="mytag">{{e.tag}}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    opened: {
      default: false
    }
  },
  computed: {
    guessedItems: function () {
      return this.$store.state.guessedItems
    },
    tagHigh: function () {
      return this.$store.state.tagHigh
    },
    isGuessingStakeholder: function () {
      return (this.$router.currentRoute.path.toLowerCase().includes('/guessstakeholder')) || (this.$router.currentRoute.path.toLowerCase().includes('/guesseffects') && !this.tagHigh)
    },
    isGuessingEffect: function () {
      return this.$router.currentRoute.path.toLowerCase().includes('/guesseffects') && this.tagHigh
    },
    isExploringEffect: function () {
      return this.$router.currentRoute.path.toLowerCase().includes('/exploreeffects')
    },
    mybox: function () {
      return this.$store.state.mybox
    },
    title: function () {
      return [
        '나와 관련있는 사람들',
        '예상하지 못한 사람들',
        '의견을 예상할 수 있는 사람들'
      ]
    },
    colors: function () {
      return ['green', 'light-blue', 'red']
    },
    importantTags: function () {
      return this.$store.state.policy.key_stakeholders
    },
    policy: function () {
      return this.$store.state.policy
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
    },
    onKeywordSelected: async function (tag) {
      const targetTag = this.$store.state.tags.find(t => {
        return t.tag === tag
      })
      await this.$store.dispatch('setTagHigh', {tag: targetTag})
      this.$router.push('/GuessEffects')
      this.isVisible = false
      this.$emit('update-tag-high')
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
/* .v-card__title {
  padding-bottom: 0 !important;
  padding-top: 0 !important;
} */
.no--padding {
  padding-bottom: 0 !important;
  padding-top: 0 !important;
}

.mytag {
  font-size: 1.1em;
  text-decoration: #fafafa underline;
  cursor: pointer;
}

.v-card.guesses {
  height: 100%;
}

.prompt {
  font-size: 1.1em;
  line-height: 1.6em;
}

.v-card__title {
  word-break: keep-all;
}
</style>
