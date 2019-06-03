<template>
  <v-container style="padding: 0;">
    <promise-pane :policy="policy"></promise-pane>
    <v-layout row wrap justify-center
      v-if="tagHigh.pos_count + tagHigh.neg_count >= 10">
      <!-- <v-flex xs12>
        <opinion-revisit-pane />
      </v-flex> -->
      <v-flex xl8 lg10 xs12>
        <opinion-revisit-pane></opinion-revisit-pane>
        <guess-pane></guess-pane>
      </v-flex>
      <v-flex xs12>
        <span class="question">
          <span class="tag">#{{tagHigh.tag}}</span> 집단은 <span class="policy">{{policy.title}}</span> 정책으로 어떤 영향을 받을까요? 
          <br>
          아래 워드 클라우드를 참고해 적어주세요.
          정답은 없으니 생각 나시는대로 편하게 적어주세요!         
        </span>
      </v-flex>
      <v-flex xl8 lg10 xs12>
        <v-text-field
          :disabled="isRatingPaneVisible"
          :label="`#${tagHigh.tag} 집단은 어떤 영향을 받을까요?`">
        </v-text-field>
      </v-flex>
      <v-flex xl8 lg10 xs12 v-if="!isRatingPaneVisible">
        <v-btn block color="primary" @click="onRateClick">
          실제 #{{tagHigh.tag}} 집단의 의견 확인하기
        </v-btn>
      </v-flex>
      <v-flex xl8 lg10 xs12 v-if="isRatingPaneVisible">
        <span class="question"> 
          #{{tagHigh.tag}} 집단은 {{tagHigh.pos_count}}명이 긍정적 영향을 받고, {{tagHigh.neg_count}}명이 부정적 영향을 받는다고 응답했습니다.
          <br>
          #{{tagHigh.tag}} 집단이 적은 의견은 어떤 느낌인가요?
        </span>
        <br>
        <rating-pane
          @rating-enough="onRatingEnough"
          >
        </rating-pane>
        <template v-if="showNextOptions">
          이제, #{{tagHigh.tag}} 집단의 의견을 더 알아보거나, 다른 사람들의 의견을 보실 수 있습니다!
          <v-layout row wrap justify-center>
            <v-flex xs6>
              <v-btn block color="secondary" @click="onNextClick">
                #{{tagHigh.tag}} 집단의 더 많은 의견 보기
              </v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block color="primary" @click="onSeeMoreTagsClick">
                다른 집단 보러 가기
              </v-btn>
            </v-flex>
            <v-flex xl8 lg10 xs12>
              <v-btn block @click="onShowPolicyListClick">
                다음 정책 보기
              </v-btn>
            </v-flex>
          </v-layout>
        </template>
      </v-flex>
      <v-flex xl8 lg10 xs12>
        <v-divider :class="isRatingPaneVisible ? '' : 'invisible'" ref="mydivider"/>
      </v-flex>
      <v-flex xl8 lg10 xs12 style="height: 80vh;">
        <effects-word-cloud
          :keywords="keywords[0]"
          >
        </effects-word-cloud>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center v-else>
      <v-flex xl8 lg10 xs12>
        <guess-pane></guess-pane>
      </v-flex>
      <v-flex xl8 lg10>
        <span class="question">
          #{{tagHigh.tag}} 집단은 {{tagHigh.pos_count}}명이 긍정적 영향을 받고, {{tagHigh.neg_count}}명이 부정적 영향을 받는다고 응답했습니다.
          <br>
          #{{tagHigh.tag}} 집단이 적은 의견은 어떤 느낌인가요?
        </span>
        <br>
        <rating-pane
          @rating-enough="onRatingEnough"
          >
        </rating-pane>
        <v-divider/>
        <span>
          #{{tagHigh.tag}} 집단은 어떤 영향을 받는 것 같나요? 정답은 없으니 생각나는 대로 편하게 적어주세요!
        </span>
        <v-text-field
          :disabled="showNextOptions"
          :label="`#${tagHigh.tag} 집단은 어떤 영향을 받나요? 간단히 적어주세요!`">
        </v-text-field>
        <v-btn color="primary" v-if="!showNextOptions" @click="showNextOptions = true">
          다 적었어요!
        </v-btn>
        <br>
        <template v-if="showNextOptions">
          이제, #{{tagHigh.tag}} 집단의 의견을 더 알아보거나, 다른 사람들의 의견을 보실 수 있습니다!
          <v-layout row wrap justify-center>
            <v-flex xs6>
              <v-btn block color="secondary" @click="onNextClick">
                #{{tagHigh.tag}} 집단의 의견 보기
              </v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block color="primary" @click="onSeeMoreTagsClick">
                다른 집단 보러 가기
              </v-btn>
            </v-flex>
            <v-flex xl8 lg10 xs12>
              <v-btn block @click="onShowPolicyListClick">
                다음 정책 보기
              </v-btn>
            </v-flex>
          </v-layout>
        </template>
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
import OpinionRevisitPane from '~/components/OpinionRevisitPane.vue'
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
    GuessPane,
    OpinionRevisitPane
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
      isRatingPaneVisible: false,
      showNextOptions: false
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
      // this.$vuetify.goTo(this.$refs.mydivider)
    },
    onNextClick: function () {
      this.$router.push('/ExploreEffects')
    },
    onSeeMoreTagsClick: function () {
      this.$router.push('/GuessStakeholder')
    },
    onRatingEnough: function () {
      this.showNextOptions = true
    },
    onShowPolicyListClick: function () {
      if (!this.$store.state.userToken || !this.$store.state.user.is_participant || this.$store.state.user.step > 2) {
        this.$router.push('/ShowPolicies')
      } else {
        this.$router.push('/PostSurvey')
      }
    }
  }
}
</script>
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

.v-divider {
  margin-top: 1em;
  margin-bottom: 1em;
}

.v-divider.invisible {
  border-width: 0px;
}
</style>


