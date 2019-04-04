<template>
  <v-container style="padding: 0;">
    <promise-pane :policy="policy"></promise-pane>
    <v-layout v-if="!tagHigh" justify-center>
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
      <v-flex v-if="tagHigh" xs8 offset-xs2>
        <v-card color="grey lighten-4">
          <v-card-title>
            <span class="title">#{{tagHigh.tag}}</span>
            <v-spacer/>
            <v-btn icon @click="show = !show"><v-icon>{{show ? 'remove' : 'add'}}</v-icon></v-btn>
            <v-btn icon style="float: right;" @click="onTagHighReset"><v-icon>close</v-icon></v-btn>
          </v-card-title>
          <v-slide-y-transition>
          <v-card-text v-if="show">
            <!-- <v-chip>{{tagHigh.tag}}</v-chip> -->
            <div>
              함께 자주 등장한
              <v-chip v-for="tag in tagHighInfo.closest" :key="tag" @click="onUpdateSelectedTagHighByLink(tag)">{{tag}}</v-chip>
              <!-- <v-chip @click="onTagHighLinkClick(tagHighInfo.closest)">{{tagHighInfo.closest}}</v-chip> -->
            </div>
            <div>
              가장 적게 같이 등장한
              <v-chip v-for="tag in tagHighInfo.farthest" :key="tag" @click="onUpdateSelectedTagHighByLink(tag)">{{tag}}</v-chip>
            </div>
            <div>
              가장 의견이 다른 
              <v-chip v-for="tag in tagHighInfo.different" :key="tag" @click="onUpdateSelectedTagHighByLink(tag)">{{tag}}</v-chip>
            </div>
            <br>
            집단의 의견도 확인해보세요.
          </v-card-text>
          </v-slide-y-transition>
          <!-- <v-card-actions>
            <v-btn color="blue" flat>긍정적 영향 {{tagHigh.pos_count}} </v-btn>
            <v-btn color="red" flat>부정적 영향 {{tagHigh.neg_count}} </v-btn>
            <v-spacer />
            <v-btn icon @click="show = !show">
              <v-icon>{{show ? 'remove' : 'add'}}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show">
              <div style="text-align: left;">
                <br>
                선택하신 집단과 유사한 <a @click="onTagHighLinkClick(tagHighInfo.closest)"><span class="blue--text">#{{tagHighInfo.closest}}</span></a>
                <br>
                가장 거리가 먼 <a @click="onTagHighLinkClick(tagHighInfo.farthest)"><span class="blue--text">#{{tagHighInfo.farthest}}</span></a>
                <br>
                의견이 다른 <a @click="onTagHighLinkClick(tagHighInfo.different)"><span class="blue--text">#{{tagHighInfo.different}}</span></a> 
                <br>        
                집단의 의견도 확인해보세요.
              </div>
            </v-card-text>
          </v-slide-y-transition> -->
        </v-card>
      </v-flex>
      <v-flex xs4>
        <!-- <tag-tree :tags="filteredTags" :maxValue="maxValue" category="children" @update-selected-tag="onUpdateSelectedTag" :onTagLoading="onTagLoading"/> -->
        <tag-pane 
          :tags="filteredTags" 
          @tag-high-click="onUpdateSelectedTagHigh" 
          @tag-low-click="onUpdateSelectedTagLow" 
          @tag-high-reset="onTagHighReset"
          :onTagLoading="onTagLoading"
          :onTagLowLoading="onTagLowLoading"/>
      </v-flex>
      <v-flex xs8>
        <effects-pane 
          :effects="effects" 
          :keywords="keywords" 
          :count="count" 
          :onLoading="onLoading"
          @effect-filter-change="onEffectFilterChanged" 
          @tag-high-click="onUpdateSelectedTagHigh" 
          @tag-low-click="onUpdateSelectedTagLow"
          :effectFilter="effectFilter" 
          :closeTags="closeTags"
          :tab="tab"/>
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
        policy: store.state.policyId
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
      effectFilter: [0, 1],
      tab: 0
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
    tagHigh: function () {
      return this.$store.state.tagHigh
    },
    tagLow: function () {
      return this.$store.state.tagLow
    },
    tagHighInfo: function () {
      return this.$store.state.tagHighInfo
    },
    tagLowInfo: function () {
      return this.$store.state.tagLowInfo
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
    },
    closeTags: function () {
      const tagList = this.tagHigh ? this.tagHigh.children : this.tags

      if (this.effectFilter.length === 2) {
        return tagList.slice(0, 3)
      } else if (this.effectFilter.length === 1 && this.effectFilter[0] === 1) {
        let newArray = tagList.filter((a) => {
          return a.pos_count >= a.neg_count * 2
        })
        return newArray.sort((a, b) => {
          return b.pos_count - a.pos_count
        }).slice(0, 3)
      } else if (this.effectFilter.length === 1 && this.effectFilter[0] === 0) {
        let newArray = tagList.filter((a) => {
          return a.pos_count * 2 <= a.neg_count
        })
        return newArray.sort((a, b) => {
          return b.neg_count - a.neg_count
        }).slice(0, 3)
      }
    }
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
    // }
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
    onUpdateSelectedTagHighByLink: function (tagTxt) {
      const tag = this.tags.find((t) => {
        return t.tag === tagTxt
      })
      this.onUpdateSelectedTagHigh(tag)
    },
    onUpdateSelectedTagHigh: async function (tag) {
      this.onLoading = true
      this.onTagLoading = true
      console.log('aaa')
      await this.$store.dispatch('setTagHigh', {tag: tag, effectFilter: this.effectFilter})
      this.onLoading = false
      this.onTagLoading = false
    },
    onTagHighReset: async function () {
      this.onLoading = true
      // this.onTagLoading = true
      await this.$store.dispatch('setTagHigh', {tag: null, effectFilter: this.effectFilter})
      this.onLoading = false
      // this.onTagLoading = false
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
    onEffectFilterChanged: async function (effectFilter, tab) {
      this.onLoading = true
      this.tab = Number(tab) - 1
      this.effectFilter = effectFilter
      const tags = this.tagHigh ? (this.tagLow ? [this.tagHigh.tag, this.tagLow.tag] : [this.tagHigh.tag]) : null
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'EffectFilterChanged',
        eventLabel: this.effectFilter,
        eventValue: 0
      })
      const effects = await this.$axios.$get('/api/effects/', {
        params: {
          policy: this.policy.id,
          tag: tags,
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


