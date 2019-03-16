<template>
  <v-flex xs8 sm8>
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

    <v-btn @click="changeSorting('len')">
      post 길이순
    </v-btn>
    <v-btn @click="changeSorting('desc-len')">
      stakeholder detail 길이순
    </v-btn>
    <v-btn @click="changeSorting('tag')">
      tag 갯수 순
    </v-btn>
    <v-select
      :value="sort"
      :items="sortTexts"
      @change="onSortChangedDebounced"
      >
    </v-select>
    <v-tabs grow style="width: 100%;">
      <v-tab href="#tab-1" @click="onTabClick(1)">
        모든 영향
      </v-tab>
      <v-tab href="#tab-2" @click="onTabClick(2)">
        긍정적 영향
      </v-tab>
      <v-tab href="#tab-3" @click="onTabClick(3)">
        부정적 영향
      </v-tab>
      <v-tab-item v-for="i in 3" :key="i" :value="'tab-'+i">
        <v-card color="grey lighten-4" style="width: 100%;">
          <v-card-text>
            <template v-if="onLoading">
            <v-layout align-center justify-center column>
                <v-progress-circular
                  style="margin-top: 2em; margin-bottom: 2em;"
                  color="purple"
                  indeterminate
                ></v-progress-circular>
              <br>
            </v-layout>
          </template>
          <template v-else>
            <span v-for="keyword in keywords" :key="keyword[0]">
              {{keyword[0]}}
            </span>
          </template>
          </v-card-text>
        </v-card>
        <v-flex width="100%">
          <template v-if="onLoading">
            <v-layout class="cards__list" align-center justify-center column>
              <div style="width: 100%">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="purple"
                  indeterminate
                ></v-progress-circular>
              </div>
              <br>
            </v-layout>
          </template>
          <template v-else>
            <v-layout class="cards__list" column align-center justify-center>
              <v-flex style="overflow: auto">
                <effect-card
                  v-for="effect in sortedEffects"
                  :key="effect.id"
                  :effect="effect"/>
              </v-flex>
            </v-layout>
          </template>

        </v-flex>
      </v-tab-item>
    </v-tabs>
  </v-flex>
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
.cards__list {
  height: 60vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
  width: 100%;
}
</style>
<script>
import EffectCard from '~/components/EffectCard.vue'
import PromisePane from '~/components/PromisePane.vue'
import setTokenMixin from '~/mixins/setToken.js'
import hangulSearchMixin from '~/mixins/hangulSearch.js'
import _ from 'lodash'
export default {
  created: function () {
    this.onInputDebounced = _.debounce(this.onInput, 1000)
    this.onEffectFilterChangeDebounced = _.debounce(this.onEffectFilterChange, 500)
    this.onSortChangedDebounced = _.debounce(this.onSortChanged, 500)
    // this.onGuessFilterChangeDebounced = _.debounce(this.onGuessFilterChange, 500)
    // if(this.$store.state.selectedTag){
    //   this.onInput([this.$store.state.selectedTag])
    // }
    if (this.$store.state.selectedTag) {
      this.selectedTags.push(this.$store.state.selectedTag)
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SearchTags',
        eventLabel: this.selectedTags,
        eventValue: 0
      })
      this.$store.dispatch('addBrowsedTags', [this.$store.state.selectedTag])
    }
  },
  mixins: [setTokenMixin, hangulSearchMixin],
  components: {
    EffectCard,
    PromisePane
  },
  props: {
    effects: {
      validator: function (effects) {
        const f = function (prev, value) {
          return prev && ('tags' in value) && ('description' in value)
        }
        return effects.reduce(f)
      }
    },
    keywords: Array
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
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
      } else if (this.filteredTags.length < 9) {
        return this.filteredTags.length - this.$store.state.userPolicy.effects_seen
      }
      return 9 - this.$store.state.userPolicy.effects_seen
    },
    filteredTags: function () {
      const ft = this.tags.filter((tag) => { return tag.total_count >= 3 })
      return ft.length > 0 ? ft : this.tags
    },
    sorter: function () {
      return [
        (a, b) => {
          return a.description.length > b.description.length ? -1 : 1
        },
        (a, b) => {
          return a.description.length > b.description.length ? 1 : -1
        },
        (a, b) => {
          return a.stakeholder_detail.length > b.stakeholder_detail.length ? -1 : 1
        },
        (a, b) => {
          return a.stakeholder_detail.length > b.stakeholder_detail.length ? 1 : -1
        },
        (a, b) => {
          return a.tags.length > b.tags.length ? -1 : 1
        },
        (a, b) => {
          return a.tags.length > b.tags.length ? 1 : -1
        },
        (a, b) => {
          return a.id > b.id ? 1 : -1
        },
        (a, b) => {
          return a.id > b.id ? -1 : 1
        }
      ][this.sort]
    },
    sortedEffects: function () {
      return this.effects.slice().sort(this.sorter)
    },
    explorationRequired: function () {
      return this.filteredTags.length >= 9 ? 9 : this.filteredTags.length
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
      return Math.ceil(this.count / 50)
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
      show: false,
      guessFilter: [0, 1],
      sortTexts: [{
        text: 'Post len++',
        value: 0
      },
      {
        text: 'Post len --',
        value: 1
      },
      {
        text: 'Detail len++',
        value: 2
      },
      {
        text: 'Detail len--',
        value: 3
      },
      {
        text: 'Tag count++',
        value: 4
      },
      {
        text: 'Tag count--',
        value: 5
      },
      {
        text: 'older',
        value: 6
      },
      {
        text: 'newer',
        value: 7
      }],
      sort: 0
    }
  },
  methods: {
    onSortChanged: function (ev) {
      this.sort = ev
    },
    onTabClick: function (i) {
      if (i === 1 && this.effectFilter.length < 2) {
        this.onEffectFilterChangeDebounced([0, 1])
      } else if (i === 2 && !(this.effectFilter.length === 1 && this.effectFilter[0] === 1)) {
        this.onEffectFilterChangeDebounced([1])
      } else if (i === 3 && !(this.effectFilter.length === 1 && this.effectFilter[0] === 0)) {
        this.onEffectFilterChangeDebounced([0])
      }
    },
    toTagOverview: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'ToTagOverview',
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
    onSeeOtherPolicyButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SeeOtherPolicy',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.seeOtherPolicyDialog = true
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
          is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
          include_guess: this.guessFilter.length === 1 ? this.guessFilter[0] : null
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
          is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
          include_guess: this.guessFilter.length === 1 ? this.guessFilter[0] : null
        }
      })
      this.$store.commit('setEffects', effects.results)
      this.$store.commit('setKeywords', effects.keywords)
      // this.effects = effects.results
      // this.count = effects.count
      this.page = 1
      this.onLoading = false
    },
    onGuessFilterChange: async function (ev) {
      this.onLoading = true
      this.guessFilter = ev
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'GuessFilterChanged',
        eventLabel: this.guessFilter,
        eventValue: 0
      })
      const effects = await this.$axios.$get('/api/effects/', {
        params: {
          policy: this.policy.id,
          tag: this.selectedTags,
          is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
          include_guess: this.guessFilter.length === 1 ? this.guessFilter[0] : null
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
        eventLabel: `${newPage} / ${this.pagenum}`,
        eventValue: 0
      })
      const effects = await this.$axios.$get('/api/effects/', {
        params: {
          policy: this.policy.id,
          tag: this.selectedTags,
          is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
          include_guess: this.guessFilter.length === 1 ? this.guessFilter[0] : null,
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

