<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
        이 정책이 우리 사회의<br>
        다양한 사람들에게 끼칠 영향을 확인해보세요.
        </v-card-text>
      </v-card>

      <div id="filterinfo">
        <template v-if="selectedTags.length === 0"> 
          지금은 
        </template>
        <template v-else>
          지금은 <strong color='blue'>{{selectedTags.join(', ')}}</strong>들이<br>받을 수 있는 
        </template>
        <strong :style="{color: effectColor}">{{effectDirection}}</strong> 영향을 보고 계십니다.
      </div>
      &nbsp;
      <v-divider/>
      <span>
        <font size="2">* <strong class="red--text">거짓 정보</strong>를 담고 있으면 신고해주세요!</font><br><br>
      </span>
      <v-flex xs12 sm6 offset-sm3>
        <v-card style="outline:auto;">
          <v-card-actions>
            <v-flex xs10 style="text-align:center;">
              원하는 영향만 모아보실래요?
            </v-flex>
            <v-btn icon @click="showFilter">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="show" style="text-align:left;">
              * 선택한 이해당사자들의 영향을 보여드립니다.
              <v-autocomplete
                :value="selectedTags"
                :items="tags"
                item-text="name"
                item-value="name"
                placeholder="입력해주세요"
                :search-input.sync="search"
                :filter="filter"
                multiple
                hide-selected
                chips
                clearable
                @input="onInputDebounced">

                <template slot="no-data">
                  <v-list-tile>
                    <v-list-tile-content>
                      입력하신 태그가 없습니다.
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
                <template slot="item" slot-scope="{ index, item, parent }">
                  <v-chip color="blue lighten-3" label small>{{item.name}}</v-chip>
                  <v-spacer></v-spacer>
                  {{item.refs}}개
                </template>
                <template slot="selection" slot-scope="{ item, parent, selected }">
                  <v-chip :selected="selected" label small>
                    <span class="pr-2"> {{item.name}} </span>
                    <v-icon small @click="parent.selectItem(item)">close</v-icon>
                  </v-chip>
                </template>
              </v-autocomplete>
              <!-- <v-layout row wrap> -->
              * 원하는 영향만 골라보실 수도 있어요.
              <v-layout row wrap>
                <v-flex xs6>
                  <v-checkbox :input-value="effectFilter" @change="onEffectFilterChangeDebounced" label="긍정적 영향" :value="1" ></v-checkbox>
                </v-flex>
                <v-flex xs6>
                  <v-checkbox :input-value="effectFilter" @change="onEffectFilterChangeDebounced" label="부정적 영향" :value="0"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>

      <v-flex xs12 sm6 offset-sm3>

        <template v-if="onLoading">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
          <br>
        </template>
        <template v-else>
          <effect-card
            v-for="effect in effects"
            :key="effect.id"
            :effect="effect"
            @empathy-button-click="onEmpathyButtonClick(effect)"
            @novelty-button-click="onNoveltyButtonClick(effect)"
            @fishy-button-click="onFishyButtonClick(effect)"/>
        </template>
        <!-- </v-flex> -->
        <v-pagination
          :value="page"
          @input="onPageChange"
          :length="pagenum"/>
      </v-flex>
      
      <v-btn
        :disabled="!$store.state.userToken"
        color="success"
        ripple block
        @click.native="onPostNewEffectButtonClick">
        여러분의 생각도 들려주세요!
      </v-btn>
      <v-divider/>

      <v-btn v-if="!$store.state.userToken || userGroup === -1" color="primary" dark ripple block @click="onEndButtonClick">
        다른 정책 보기
      </v-btn>
      <v-dialog
        v-else-if="$store.state.userToken && userGroup >= 0 && userGroup < 6 "
        v-model="seeOtherPolicyDialog"
        width="500"
        full-width
        >
        <v-btn
          slot="activator"
          color="primary"
          dark ripple block
          @click.native="seeOtherPolicyDialog">
          다른 정책 보기
        </v-btn>

        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
            style="background-color:pink !important;
            color:red;"
            > 
            <strong>주의</strong>
          </v-card-title>

          <v-card-text>
            현재 '정책의 다양한 영향 이해' 단계에서는 실험자가 
            <strong>9개 태그</strong>의 영향을 둘러보셔야 보상을 받을 수 있습니다. <br><br>
            <template v-if="effect_left!=0">
              귀하는 <strong><font size="4">{{effect_left}}개 태그를</font></strong> 더 살펴보셔야 합니다.<br>
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
              @click="seeOtherPolicyDialog=false"
              > 
              돌아가기 
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat outline ripple
              @click="onEndButtonClick"
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
            <template v-if="answer_left>=0">
              귀하는 <strong><font size="4">{{answer_left}}개 영향을</font></strong> 더 살펴보셔야 합니다.<br>
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
              @click="seeOtherPolicyDialog=false"
              > 
              돌아가기 
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat outline ripple
              @click="onEndButtonClick"
              >
              다음으로
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>
<style>
.v-expansion-panel__body {
  padding: 10px !important;
}
.v-progress-circular.v-progress-circular--indeterminate.purple--text {
  margin-top: 50px;
  margin-bottom: 80px;
}
#filterinfo {
  margin-top: 20px;
}
</style>
<script>
import EffectCard from '~/components/EffectCard.vue'
import PromisePane from '~/components/PromisePane.vue'
import setTokenMixin from '~/mixins/setToken.js'
import hangulSearchMixin from '~/mixins/hangulSearch.js'
import _ from 'lodash'
export default {
  asyncData: async function ({app, store}) {
    // if (store.state.userToken) {
    //   app.$axios.setToken(store.state.userToken, 'Token')
    // }
    // store.dispatch('incrementUserPolicyStakeholdersSeen')
    const effects = await app.$axios.$get('/api/effects/', {
      params: {
        policy: store.state.policyId,
        page_size: 5,
        'tag[]': store.state.selectedTag
      }
    })
    // store.commit('setEffects', effects.results)
    return {
      prevPage: effects.prev,
      nextPage: effects.next,
      count: effects.count,
      effects: effects.results
    }
  },
  created: function () {
    this.onInputDebounced = _.debounce(this.onInput, 1000)
    this.onEffectFilterChangeDebounced = _.debounce(this.onEffectFilterChange, 500)
    // if(this.$store.state.selectedTag){
    //   this.onInput([this.$store.state.selectedTag])
    // }
    if (this.$store.state.selectedTag) {
      this.selectedTags.push(this.$store.state.selectedTag)
    }
  },
  mixins: [setTokenMixin, hangulSearchMixin],
  components: {
    EffectCard,
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    // effects: function () {
    //   return this.$store.state.effects
    // },
    userGroup: function () {
      return this.$store.getters.userGroup
    },
    stakeholder_left: function () {
      if (this.$store.state.userPolicy.stakeholders_seen > 3) {
        return 0
      }
      return 3 - this.$store.state.userPolicy.stakeholders_seen
    },
    effect_left: function () {
      if (this.$store.state.userPolicy.effects_seen > 9) {
        return 0
      }
      return 9 - this.$store.state.userPolicy.effects_seen
    },
    answer_left: function () {
      // console.log(this.$store.state.userPolicy)
      if (this.userGroup === 6 || this.userGroup === 7) {
        return 3 - this.$store.state.userPolicy.stakeholders_answered
      } else {
        return 0
      }
    },
    pagenum: function () {
      return Math.ceil(this.count / 5)
    },
    tags: function () {
      return this.$store.state.tags
    },
    effectDirection: function () {
      if (this.effectFilter.length === 1) {
        if (this.effectFilter[0] === 0) {
          return '부정적'
        } else {
          return '긍정적'
        }
      } else {
        return '모든'
      }
    },
    effectColor: function () {
      if (this.effectFilter.length === 1) {
        if (this.effectFilter[0] === 0) {
          return 'red'
        } else {
          return 'blue'
        }
      } else {
        return 'black'
      }
    }
  },
  data: function () {
    return {
      opinionTexts: false,
      active_button: true,
      seeOtherPolicyDialog: false,
      page: 1,
      selectedTags: [],
      search: '',
      effectFilter: [0, 1],
      onLoading: false,
      show: false
      // count: 0,
      // prevPage: '',
      // nextPage: ''
    }
  },
  methods: {
    onNextButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SeeMoreEffects',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.$router.push('/TagOverview')
    },
    onEndButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'ClickEndButton',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      if (!this.$store.state.userToken || !this.$store.state.user.is_participant) {
        this.$router.push('/ShowPolicies')
      } else {
        this.$router.push('/MiniSurvey')
      }
    },
    onPostNewEffectButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'AddNewStakeholder',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.$router.push('/NewStakeholder')
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
            tag: this.selectedTags,
            is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
            page: this.page
          }
        })
        this.effects = result.results
      }
    },
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
            tag: this.selectedTags,
            is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
            page: this.page
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
            tag: this.selectedTags,
            is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
            page: this.page
          }
        })
        this.effects = result.results
      }
    },
    onSeeOtherPolicyButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SeeOtherPolicy',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.dialog = true
    },
    onDialogGoBackButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'GoBackToEffects',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.dialog = true
    },
    cardnum: function (page) {
      if (page === this.pagenum) {
        var rest = this.effects.length % 5
        if (rest === 0) {
          return 5
        }
        return rest
      } else {
        return 5
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    onInput: async function (ev) {
      this.onLoading = true
      this.selectedTags = ev
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SearchTags',
        eventLabel: this.selectedTags,
        eventValue: 0
      })
      this.$store.dispatch('addBrowsedTags', this.selectedTags)
      const effects = await this.$axios.$get('/api/effects/', {
        params: {
          policy: this.policy.id,
          tag: this.selectedTags,
          is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null
        }
      })
      // this.$store.dispatch('incrementUserPolicyEffectsSeen')
      this.effects = effects.results
      this.count = effects.count
      this.page = 1
      this.onLoading = false
    },
    onEffectFilterChange: async function (ev) {
      this.onLoading = true
      this.effectFilter = ev
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
          is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null
        }
      })
      this.effects = effects.results
      this.count = effects.count
      this.page = 1
      this.onLoading = false
    },
    onPageChange: async function (newPage) {
      this.onLoading = true
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'PageChange',
        eventLabel: `${this.newPage} / ${this.pagenum}`,
        eventValue: 0
      })
      const effects = await this.$axios.$get('/api/effects/', {
        params: {
          policy: this.policy.id,
          tag: this.selectedTags,
          is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
          page: newPage
        }
      })
      this.effects = effects.results
      this.page = newPage
      this.onLoading = false
    },
    showFilter: async function () {
      if (this.show) {
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'HideFilter',
          eventLabel: ``,
          eventValue: 0
        })
      } else {
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'ShowFilter',
          eventLabel: ``,
          eventValue: 0
        })
      }
      this.show = !this.show
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  }
}
</script>

