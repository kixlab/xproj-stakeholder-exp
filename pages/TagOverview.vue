<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
        이 정책이 우리 사회의<br>
        다양한 사람들에게 끼칠 영향을 확인해보세요.
        </v-card-text>
      </v-card>
      &nbsp;
      <p class="body-1 prompt"> 
        <strong>3개 이상 영향이 입력된 이해당사자 태그를<br>언급 횟수가 적은 것 부터 보여드립니다.<br></strong>
        <v-divider/>
        <small>* 아래 태그를 눌러 각 이해당사자들이 받는 영향을 확인해보세요.</small>
      </p>


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
      
      <tag-overview-item v-for="tag in filteredTags" :key="tag.name" :tag="tag" :maxValue="maxValue" @tag-click="onTagClick">
      </tag-overview-item>
      <v-btn color="success" :disabled="!$store.state.userToken" ripple block @click="onNewStakeholderClick">
        새로운 영향 남기기
      </v-btn>
      <v-btn v-if="!$store.state.userToken || userGroup === -1" color="primary" dark ripple block @click="onShowPolicyListClick">
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
  </v-layout>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
import TagOverviewItem from '~/components/TagOverviewItem.vue'
import _ from 'lodash'
export default {
  fetch: async function ({app, store, params}) {
    store.dispatch('setTags')
  },
  components: {
    PromisePane,
    TagOverviewItem
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    tags: function () {
      return this.$store.state.tags
    },
    filteredTags: function () {
      const ft = this.tags.filter((tag) => { return tag.refs >= 3 }).sort((a, b) => { return a.refs > b.refs })
      return ft.length > 0 ? ft : [...this.tags].reverse()
    },
    effects_left: function () {
      if (this.$store.state.userPolicy.effects_seen > 9) {
        return 0
      } else if (this.filteredTags.length < 9) {
        return this.filteredTags.length - this.$store.state.userPolicy.effects_seen
      }
      return 9 - this.$store.state.userPolicy.effects_seen
    },
    maxValue: function () {
      const t = this.tags.map((tag) => { return tag.refs })
      return Math.max(...t)
    },
    userGroup: function () {
      return this.$store.getters.userGroup
    },
    answer_left: function () {
      // console.log(this.$store.state.userPolicy)
      if (this.userGroup === 6 || this.userGroup === 7) {
        return 3 - this.$store.state.userPolicy.stakeholders_answered
      } else {
        return 0
      }
    },
    guessedTag: function () {
      return _.uniq(_.concat(...this.$store.state.guessedTags))
      // return [].concat.apply([], this.$store.state.guesssedTags)
    },
    explorationRequired: function () {
      return this.filteredTags.length >= 9 ? 9 : this.filteredTags.length
    }
  },
  data: function () {
    return {
      opinionTexts: false,
      dialog: false,
      tag: null,
      show: false
    }
  },
  methods: {
    onNewStakeholderClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'NewStakeholder',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      this.$router.push('/NewStakeholder')
    },
    onSeePredictedTagsClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: this.show ? 'HidePredictedTags' : 'ShowPredictedTags',
        eventLabel: `${this.policy.title} / ${this.guessedTags}`,
        eventValue: 0
      })
      this.show = !this.show
    },
    onTagClick: async function (tag) {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'ShowStakeholderGroupEffects',
        eventLabel: `${this.policy.title} / ${tag}`,
        eventValue: 0
      })
      this.$store.commit('setSelectedTag', tag)
      this.$router.push('/ExploreOpinions')
    },
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
    },
    onShowDialogButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SeeOtherPolicy',
        eventLabel: `${this.policy.title} / effects_left: ${this.effects_left}`,
        eventValue: 0
      })
      this.dialog = true
    },
    onDialogGoBackButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'GoBackToStakeholderList',
        eventLabel: `${this.policy.title} / effects_left: ${this.effects_left}`,
        eventValue: 0
      })
      this.dialog = false
    }
  }
}
</script>
<style scoped>
.link {
  cursor: pointer;
  word-break: keep-all;
}
.v-card__title {
  padding-bottom:0 !important;
}

</style>


