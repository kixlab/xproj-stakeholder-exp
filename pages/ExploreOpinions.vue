<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <p class="body-1">
        이 정책이 
        <!-- <strong class="red--text">{{selectedTags}}</strong> -->
        <v-chip v-for="tag in selectedTags" :key="tag">{{tag}}</v-chip>
        에게<br>
        끼칠 수 있는 영향을 보여드릴게요!
        <!--TODO: Disclaimer -->
      </p>
      <v-autocomplete
        :value="selectedTags"
        :items="tags"
        item-text="name"
        item-value="name"
        label="선택해주세요"
        :search-input.sync="search"
        :filter="filter"
        multiple
        hide-selected
        chips
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

      <v-divider/>
      <v-flex xs12 sm6 offset-sm3>
        <!-- <v-flex v-for="i in cardnum(page)" :key="i"> -->
          <effect-card
            v-for="effect in effects"
            :key="effect.id"
            :effect="effect"
            @empathy-button-click="onEmpathyButtonClick(effect)"
            @novelty-button-click="onNoveltyButtonClick(effect)"/>
        <!-- </v-flex> -->
        <v-pagination
          :value="page"
          @input="onPageChange"
          :length="pagenum"/>
      </v-flex>
      
      <!-- <v-btn 
        v-if = "active_button"
        color = "success"
        @click="onNextButtonClick"
        block ripple>
        다른 이해당사자의 목소리도 살펴보세요!
      </v-btn> -->
      <v-btn
        :disabled="!$store.state.userToken"
        color="success"
        ripple block
        @click.native="onPostNewEffectButtonClick">
        여러분의 생각도 들려주세요!
      </v-btn>
      <v-divider/>

    <v-btn v-if="!$store.state.userToken" color="primary" dark ripple block @click="onEndButtonClick">
      다른 정책 보기
    </v-btn>
    <v-dialog
      v-else
      v-model="dialog"
      width="500"
      full-width
    >
      <v-btn
        slot="activator"
        color="primary"
        dark ripple block
        @click.native="dialog=true">
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
          <strong>3개 그룹</strong>의 영향을 둘러보셔야 보상을 받을 수 있습니다. <br><br>
          <template v-if="stakeholder_left!=0">
          귀하는 <strong><font size="4">{{stakeholder_left}}개 그룹을</font></strong> 더 살펴보셔야 합니다.<br>
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
            @click="dialog=false"
          > 돌아가기 </v-btn>
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
        page_size: 5
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
  mounted: function () {
    this.onInputDebounced = _.debounce(this.onInput, 1000)
    this.onInput([this.$store.state.selectedTag])
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
    pagenum: function () {
      return Math.ceil(this.count / 5)
    },
    tags: function () {
      return this.$store.state.tags
    }
  },
  data: function () {
    return {
      opinionTexts: false,
      active_button: true,
      dialog: false,
      page: 1,
      selectedTags: [],
      search: ''
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
    onNoveltyButtonClick: function (effect) {

    },
    onEmpathyButtonClick: function (effect) {

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
    onInput: async function (ev) {
      this.selectedTags = ev
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SearchTags',
        eventLabel: this.selectedTags,
        eventValue: 0
      })
      const effects = await this.$axios.$get('/api/effects/', {
        params: {
          policy: this.policy.id,
          tag: this.selectedTags
        }
      })
      this.effects = effects.results
      this.count = effects.count
      this.page = 1
    },
    onPageChange: async function (newPage) {
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
          page: newPage
        }
      })
      this.effects = effects.results
      this.page = newPage
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

