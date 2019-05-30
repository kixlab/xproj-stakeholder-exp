<template>
  <v-container style="padding: 0;">
    <promise-pane :policy="policy"></promise-pane>
    <v-layout row wrap justify-center
      v-if="tagHigh.pos_count + tagHigh.neg_count >= 10">
      <!-- <v-flex xs12>
        <opinion-revisit-pane />
      </v-flex> -->
      <v-flex xs12>
        <guess-pane></guess-pane>
      </v-flex>
      <v-flex xs12>
        <span class="question">
          <span class="tag">#{{tagHigh.tag}}</span> 집단은 <span class="policy">{{policy.title}}</span> 정책에 대해 어떻게 생각할까요? 
          <br>
          아래 워드 클라우드를 보시고 생각나는 대로 아래에 적어주세요!
        </span>
      </v-flex>
      <v-flex xl8 lg10>
        <v-text-field
          :label="`#${tagHigh.tag} 집단은 어떻게 생각할까요?`">
        </v-text-field>
      </v-flex>
      <v-flex xl8 lg10>
        <effects-word-cloud
          :keywords="keywords[0]"
          >
        </effects-word-cloud>
      </v-flex>
      <v-flex xl8 lg10>
        <v-btn block primary @click="onRateClick">
          실제 #{{tagHigh.tag}} 집단의 의견 확인하기
        </v-btn>
      </v-flex>
      <v-flex xl8 lg10>
        <v-divider v-show="isRatingPaneVisible" ref="mydivider"/>
      </v-flex>
      <v-flex xl8 lg10 v-if="isRatingPaneVisible">
        <span class="question"> 
          #{{tagHigh.tag}} 집단이 적은 의견 몇 개를 먼저 보여드릴게요.
          의견을 평가해주시면 다른 의견을 볼 수 있습니다.
        </span>
        <br>
        <rating-pane
          >
        </rating-pane>
        <v-btn @click="onSeeMoreTagsClick">
          다른 집단 보러 가기
        </v-btn>
        <v-btn @click="onNextClick">
          #{{tagHigh.tag}} 집단의 더 많은 의견 보기
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center v-else>
      <v-flex xs12>
        <guess-pane></guess-pane>
      </v-flex>
      <v-flex xl8 lg10>
        <span class="question"> 
          #{{tagHigh.tag}} 집단이 적은 의견 몇 개를 먼저 보여드릴게요.
          <br>
          의견을 평가해주시면 다른 의견을 볼 수 있습니다.
        </span>
        <br>
        <rating-pane
          >
        </rating-pane>
        <span>
          #{{tagHigh.tag}} 집단은 어떤 영향을 받는 지 간단히 적어주세요.
        </span>
        <v-text-field
          :label="`${tagHigh.tag} 집단은 어떻게 영향을 받나요? 간단히 적어주세요!`">
        </v-text-field>
        <v-btn @click="onSeeMoreTagsClick">
          다른 집단 보러 가기
        </v-btn>
        <v-btn @click="onNextClick">
          #{{tagHigh.tag}} 집단의 더 많은 의견 보기
      </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
import EffectsWordCloud from '~/components/EffectsWordCloud.vue'
import setTokenMixin from '~/mixins/setToken.js'
import RatingPane from '~/components/RatingPane.vue'
import GuessPane from '~/components/GuessPane.vue'
export default {
  // fetch: async function ({app, store, params}) {
  //   const effects = await app.$axios.$get('/api/effects/', {
  //     params: {
  //       policy: store.state.policyId,
  //       include_guess: 0
  //     }
  //   })
  //   store.commit('setEffects', effects.results)
  //   store.commit('setKeywords', effects.keywords)
  //   store.commit('setKeywordsAll', effects.keywords)
  // },
  components: {
    PromisePane,
    EffectsWordCloud,
    RatingPane,
    GuessPane
  },
  mixins: [setTokenMixin],
  data: function () {
    return {
      dialog: false,
      tag: null,
      onLoading: false,
      onTagLoading: false,
      onTagLowLoading: false,
      effectFilter: [0, 1],
      isRatingPaneVisible: false
    }
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    effects: function () {
      return this.$store.state.effects
    },
    keywords: function () {
      return this.$store.state.keywords
    },
    tags: function () {
      return this.$store.state.tags
    },
    // tagLows: function () {
    //   if (this.tagHigh) {
    //     return this.tagHigh.children.slice().sort((a, b) => {
    //       if (a.total_count < b.total_count) {
    //         return 1
    //       } else if (a.total_count > b.total_count) {
    //         return -1
    //       } else {
    //         return 0
    //       }
    //     })
    //   } else {
    //     return []
    //   }
    // },
    tagHigh: function () {
      return this.$store.state.tagHigh
    }
    // tagLow: function () {
    //   return this.$store.state.tagLow
    // },
    // tagHighInfo: function () {
    //   return this.$store.state.tagHighInfo
    // },
    // tagLowInfo: function () {
    //   return this.$store.state.tagLowInfo
    // },
    // filteredTags: function () {
    //   const ft = this.tags.filter((tag) => { return tag.total_count >= 3 })
    //   return ft.length > 0 ? ft : this.tags
    // },
    // userGroup: function () {
    //   return this.$store.getters.userGroup
    // }
  },
  methods: {
    // onUpdateSelectedTagHighByLink: function (tagTxt) {
    //   const tag = this.tags.find((t) => {
    //     return t.tag === tagTxt
    //   })
    //   this.onUpdateSelectedTagHigh(tag)
    // },
    // onUpdateSelectedTagHigh: async function (tag) {
    //   this.onLoading = true
    //   this.onTagLoading = true
    //   console.log('aaa')
    //   await this.$store.dispatch('setTagHigh', {tag: tag, effectFilter: this.effectFilter})
    //   this.onLoading = false
    //   this.onTagLoading = false
    // },
    // onTagHighReset: async function () {
    //   this.onLoading = true
    //   await this.$store.dispatch('setTagHigh', {tag: null, effectFilter: this.effectFilter})
    //   this.onLoading = false
    // },
    // onUpdateSelectedTagLow: async function (tag, isOpening, idx) {
    //   this.onLoading = true
    //   this.onTagLowLoading = true
    //   // if (!idx) {
    //   //   idx = this.tagLows.findIndex(t => {
    //   //     return t.tag === tag.tag
    //   //   })
    //   // }
    //   await this.$store.dispatch('setTagLow', {tag: tag, isOpening: isOpening, effectFilter: this.effectFilter})
    //   this.expansionPanelValue = idx
    //   this.onLoading = false
    //   this.onTagLowLoading = false
    // },
    // onUpdateSelectedTag: async function (tag) {
    //   this.onLoading = true
    //   await this.$store.dispatch('updateSelectedTag', tag)
    //   this.onLoading = false
    // },
    // onShowPolicyListClick: function () {
    //   if (!this.$store.state.userToken || !this.$store.state.user.is_participant || this.$store.state.user.step > 2) {
    //     this.$router.push('/ShowPolicies')
    //   } else {
    //     this.$router.push('/PostSurvey')
    //   }
    // },
    onRateClick: function () {
      this.isRatingPaneVisible = true
      this.$vuetify.goTo(this.$refs.mydivider)
    },
    onNextClick: function () {
      this.$router.push('/ExploreEffects')
    },
    onSeeMoreTagsClick: function () {
      this.$router.push('/GuessStakeholder')
    }
  }
}
</script>
<style>
.v-speed-dial {
  position: fixed;
}

</style>
<style scoped>
.question {
  font-size: 1.1em;
}
.tag {
  font-weight: bold;
}
.policy {
  font-weight: bold;
}
.link {
  cursor: pointer;
  word-break: keep-all;
}
.v-card__title {
  padding-bottom:0 !important;
  padding-top: 0 !important;
}

#btn_location {
  position: fixed;
  width: 100%;

  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 15px;

  /* background-color: rgb(120, 134, 219); */
  z-index: 1;
}

</style>


