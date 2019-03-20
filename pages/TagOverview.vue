<template>
  <v-container style="padding: 0;">
    <promise-pane :policy="policy"></promise-pane>
    <v-layout justify-center>
      <v-flex lg8 md8>
        <v-card color="grey lighten-4">
          <v-card-text>
          이 정책이 우리 사회의 다양한 사람들에게 끼칠 영향을 확인해보세요.
          </v-card-text>
        </v-card>
        &nbsp;
        
      </v-flex>
    </v-layout>

    <!-- In case the user did persepctive taking(guessing). -->
    <!-- <v-layout>
      <v-flex xs12 sm6 offset-sm3 v-if="guessedTag.length > 0">
        <v-card style="outline:auto;">
          <v-card-actions>
            <v-flex xs10 style="text-align:center;">
              여러분이 생각해보셨던 태그는...
            </v-flex>
            <v-btn outline small color="primary" @click="onSeePredictedTagsClick">
              더 보기
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="show" style="text-align:left;">
              <v-chip 
                color="primary" 
                text-color="white"
                v-for="tag in guessedTag"
                :key="tag"
                @click="onTagClick(tag)">
                <span class="link">#{{tag}}</span>
              </v-chip>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout> -->
    
    <v-layout row wrap>
      <v-flex xs5>
        <!-- <tag-tree :tags="filteredTags" :maxValue="maxValue" category="children" @update-selected-tag="onUpdateSelectedTag" :onTagLoading="onTagLoading"/> -->
        <tag-pane 
          :tags="filteredTags" 
          @tag-high-click="onUpdateSelectedTagHigh" 
          @tag-low-click="onUpdateSelectedTagLow" 
          @tag-high-reset="onTagHighReset"
          :onTagLoading="onTagLoading"
          :onTagLowLoading="onTagLowLoading"/>
      </v-flex>
      <v-flex xs7>
        <effects-pane :effects="effects" :keywords="keywords" :count="count" :onLoading="onLoading" @effect-filter-change="onEffectFilterChanged" :effectFilter="effectFilter"/>
      </v-flex>
    </v-layout>

    <!--v-divider/>

    <v-layout align-center justify-center row id="btn_location">

      <v-flex xs2>
        <v-btn color="success" :disabled="!$store.state.userToken" ripple block large @click="onNewStakeholderClick">
          새로운 영향 남기기
        </v-btn>
      </v-flex>
      <v-flex xs1/>
      <v-flex xs2>
        <v-btn v-if="!$store.state.userToken || userGroup === -1" color="primary" dark ripple block large @click="onShowPolicyListClick">
          다른 정책 보기
        </v-btn>
        <v-dialog
          v-else-if="$store.state.userToken && userGroup >= 0 && userGroup < 6 "
          v-model="dialog"
          width="500"
          full-width
          >
          <v-btn
            slot="activator"
            color="primary"
            dark ripple block
            @click.native="onShowDialogButtonClick">
            다른 정책 보기
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
              현재 '정책의 다양한 영향 이해' 단계에서는 실험자가 
              <strong>{{explorationRequired}}개 태그</strong>에서 영향을 둘러보셔야 보상을 받을 수 있습니다. <br><br>
              <template v-if="effects_left!=0">
              귀하는 <strong><font size="4">{{effects_left}}개 태그를</font></strong> 더 살펴보셔야 합니다.<br>
              아래 <strong style="color:red;"> 돌아가기 </strong>를 누르셔서 조건을 충족시키시기 바랍니다.
              <br><br>
              <strong style="color:red;"> (주의) 조건을 충족하지 않고 <span style="color:blue;">다음으로</span>
              넘어가시면, 포기로 간주되며 보상을 받을 수 없습니다. </strong>
              </template>

              <template v-else>
              귀하는 조건을 모두 충족하셨습니다.<br>
              <strong style="color:blue;"> 다음으로 </strong> 넘어가주세요.<br><br>

              그런데, 혹시 더 살펴보고 싶으시면 <strong style="color:red;">돌아가기</strong>를 누르셔도 좋습니다. :)
              </template>          
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                color="red"
                flat outline ripple
                @click="onDialogGoBackButtonClick"
              > 돌아가기 </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat outline ripple
                @click="onShowPolicyListClick"
              >
                다음으로
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        <v-dialog
          v-else-if="$store.state.userToken && userGroup >=6"
          v-model="dialog"
          width="500"
          full-width
          >
          <v-btn
            slot="activator"
            color="primary"
            dark block ripple
          >
            다른 정책 보기
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
              현재 '정책의 다양한 영향 이해' 단계에서는 실험자가 
              <strong>3개</strong>의 영향을 남겨주셔야 보상을 받을 수 있습니다. <br><br>
              <template v-if="answer_left>0">
                귀하는 <strong><font size="4">{{answer_left}}개 영향을</font></strong> 더 남겨주셔야 합니다.<br>
                아래 <strong style="color:red;"> 돌아가기 </strong>를 누르셔서 조건을 충족시키시기 바랍니다.
                <br><br>
                <strong style="color:red;"> (주의) 조건을 충족하지 않고 <span style="color:blue;">다음으로</span>
                넘어가시면, 포기로 간주되며 보상을 받을 수 없습니다. </strong>
              </template>

              <template v-else>
                귀하는 조건을 모두 충족하셨습니다.<br>
                <strong style="color:blue;"> 다음으로 </strong> 넘어가주세요.<br><br>

                그런데, 혹시 더 살펴보고 싶으시면 <strong style="color:red;">돌아가기</strong>를 누르셔도 좋습니다. :)
              </template>          
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                color="red"
                flat outline ripple
                @click="onDialogGoBackButtonClick"
              > 돌아가기 </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat outline ripple
                @click="onShowPolicyListClick"
              >
                다음으로
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout-->
    <v-speed-dial
      v-model="fab"
      bottom
      right
      direction="top"
      open-on-hover
    >
        <v-btn
          slot="activator"
          v-model="fab"
          color="blue darken-2"
          dark
          fab
          large
        >
          <v-icon>add</v-icon>
          <v-icon>close</v-icon>
        </v-btn>

      <v-tooltip 
        v-model="show1" 
        left
        nudge-left="8"
        close-delay="0"
      >
        <v-btn
          fab
          dark
          color="green"
          slot="activator"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <span>새로운 영향 쓰기</span>
      </v-tooltip>

      <v-tooltip 
        v-model="show2" 
        nudge-left="8"
        left
        close-delay="0"
      >
        <v-btn
          fab
          dark
          color="red"
          slot="activator"
        >
          <v-icon>arrow_forward</v-icon>
        </v-btn>
        <span>다음 정책 보기</span>
      </v-tooltip>

    </v-speed-dial>
 
  </v-container>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
import TagPane from '~/components/TagPane.vue'
import EffectsPane from '~/components/EffectsPane.vue'
// import _ from 'lodash'
import setTokenMixin from '~/mixins/setToken.js'

export default {
  fetch: async function ({app, store, params}) {
    const effects = await app.$axios.$get('/api/effects/', {
      params: {
        policy: store.state.policyId,
        'tag[]': store.state.selectedTag,
        page_size: 100
      }
    })
    store.commit('setEffects', effects.results)
    store.commit('setKeywords', effects.keywords)
    // app.onTagLoading = true
    await store.dispatch('setTags')
    // app.onTagLoading = false
  },
  // mounted: async function () {
  //   this.onTagLoading = true
  //   await this.$store.dispatch('setTags')
  //   this.onTagLoading = false
  // },
  components: {
    PromisePane,
    TagPane,
    EffectsPane
  },
  mixins: [setTokenMixin],
  data: function () {
    return {
      fab: false,
      opinionTexts: false,
      dialog: false,
      tag: null,
      show: false,
      show1: false,
      show2: false,
      count: 0,
      onLoading: false,
      onTagLoading: false,
      onTagLowLoading: false,
      effectFilter: [0, 1]
    }
  },
  computed: {
    activeFab: function () {
      return {}
    },
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
    filteredTags: function () {
      const ft = this.tags.filter((tag) => { return tag.total_count >= 3 })
      // .sort((a, b) => {
      //   if (a.total_count > b.total_count) {
      //     return 1
      //   } else if (a.total_count < b.total_count) {
      //     return -1
      //   } else {
      //     return 0
      //   }
      // })
      return ft.length > 0 ? ft : this.tags // [...this.tags].reverse()
    },
    // effects_left: function () {
    //   if (this.$store.state.userPolicy.effects_seen > 9) {
    //     return 0
    //   } else if (this.filteredTags.length < 9) {
    //     return this.filteredTags.length - this.$store.state.userPolicy.effects_seen
    //   }
    //   return 9 - this.$store.state.userPolicy.effects_seen
    // },
    // maxValue: function () {
    //   const t = this.tags.map((tag) => { return tag.total_count })
    //   return Math.max(...t)
    // },
    userGroup: function () {
      return this.$store.getters.userGroup
    // },
    // answer_left: function () {
    //   // console.log(this.$store.state.userPolicy)
    //   if (this.userGroup === 6 || this.userGroup === 7) {
    //     return 3 - this.$store.state.userPolicy.stakeholders_answered
    //   } else {
    //     return 0
    //   }
    // },
    // guessedTag: function () {
    //   return _.uniq(_.concat(...this.$store.state.guessedTags))
    //   // return [].concat.apply([], this.$store.state.guesssedTags)
    // },
    // explorationRequired: function () {
    //   return this.filteredTags.length >= 9 ? 9 : this.filteredTags.length
    }
  },
  methods: {
    // onNewStakeholderClick: function () {
    //   this.$ga.event({
    //     eventCategory: this.$router.currentRoute.path,
    //     eventAction: 'NewStakeholder',
    //     eventLabel: this.policy.title,
    //     eventValue: 0
    //   })
    //   this.$router.push('/NewStakeholder')
    // },
    onUpdateSelectedTagHigh: async function (tag) {
      this.onLoading = true
      this.onTagLoading = true
      console.log('aaa')
      await this.$store.dispatch('setTagHigh', {tag: tag, effectFilter: this.effectFilter})
      this.onLoading = false
      this.onTagLoading = false
    },
    onTagHighReset: async function (tag) {
      this.onLoading = true
      this.onTagLoading = true
      await this.$store.dispatch('setTagHigh', {tag: null, effectFilter: this.effectFilter})
      this.onLoading = false
      this.onTagLoading = false
    },
    onUpdateSelectedTagLow: async function (tag, $event) {
      this.onLoading = true
      this.onTagLowLoading = true
      await this.$store.dispatch('setTagLow', {tag: tag, isOpening: $event, effectFilter: this.effectFilter})
      this.onLoading = false
      this.onTagLowLoading = false
    },
    onUpdateSelectedTag: async function (tag) {
      this.onLoading = true
      await this.$store.dispatch('updateSelectedTag', tag)
      this.onLoading = false
    },
    onEffectFilterChanged: async function (effectFilter, guessFilter) {
      this.onLoading = true
      this.effectFilter = effectFilter
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'EffectFilterChanged',
        eventLabel: this.effectFilter,
        eventValue: 0
      })
      const effects = await this.$axios.$get('/api/effects/', {
        params: {
          policy: this.policy.id,
          tag: this.selectedTags,
          is_benefit: effectFilter.length === 1 ? effectFilter[0] : null,
          include_guess: 0
        }
      })
      this.$store.commit('setEffects', effects.results)
      this.$store.commit('setKeywords', effects.keywords)
      // this.effects = effects.results
      // this.count = effects.count
      this.onLoading = false
    },
    // onSeePredictedTagsClick: function () {
    //   this.$ga.event({
    //     eventCategory: this.$router.currentRoute.path,
    //     eventAction: this.show ? 'HidePredictedTags' : 'ShowPredictedTags',
    //     eventLabel: `${this.policy.title} / ${this.guessedTags}`,
    //     eventValue: 0
    //   })
    //   this.show = !this.show
    // },
    // onTagClick: async function (tag) {
    //   this.$ga.event({
    //     eventCategory: this.$router.currentRoute.path,
    //     eventAction: 'ShowStakeholderGroupEffects',
    //     eventLabel: `${this.policy.title} / ${tag}`,
    //     eventValue: 0
    //   })
    //   this.$store.commit('setSelectedTag', tag)
    //   this.$router.push('/ExploreOpinions')
    //   // this.$router.push('/GuessEffectRandom/0')
    // },
    onShowPolicyListClick: function () {
      this.$ga.event({
        eventCategory: '/SelectStakeholder',
        eventAction: 'ShowPolicyList',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      if (!this.$store.state.userToken || !this.$store.state.user.is_participant || this.$store.state.user.step > 2) {
        this.$router.push('/ShowPolicies')
      } else {
        this.$router.push('/MiniSurvey')
      }
    // },
    // onShowDialogButtonClick: function () {
    //   this.$ga.event({
    //     eventCategory: this.$router.currentRoute.path,
    //     eventAction: 'SeeOtherPolicy',
    //     eventLabel: `${this.policy.title} / effects_left: ${this.effects_left}`,
    //     eventValue: 0
    //   })
    //   this.dialog = true
    // },
    // onDialogGoBackButtonClick: function () {
    //   this.$ga.event({
    //     eventCategory: this.$router.currentRoute.path,
    //     eventAction: 'GoBackToStakeholderList',
    //     eventLabel: `${this.policy.title} / effects_left: ${this.effects_left}`,
    //     eventValue: 0
    //   })
    //   this.dialog = false
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
.link {
  cursor: pointer;
  word-break: keep-all;
}
.v-card__title {
  padding-bottom:0 !important;
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


