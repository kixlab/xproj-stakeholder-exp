<template>
  <v-flex xs12>
    <span v-if="tagLow">#{{tagHigh.tag}} > #{{tagLow.tag}}</span>
    <span v-else-if="tagHigh">#{{tagHigh.tag}}</span>
    <span v-else-if="!tagHigh"></span>
    에 속한 사람들이 직접 적은 영향입니다.
    <v-toolbar
      color="white">
      <template>
        <v-tabs centered grow :value="tab">
          <v-tab v-for="n in 3" :key="n" @click="onTabClick(n)">
            <span :class="['purple--text', 'blue--text', 'red--text'][n-1]">{{['모든 영향', '긍정적 영향', '부정적 영향'][n-1]}}</span>
          </v-tab>
        </v-tabs>
      </template>
      <v-toolbar-items>
        <v-btn icon @click="showFilter = !showFilter">
          <v-icon>sort</v-icon>
        </v-btn>
        <!-- <v-btn icon @click="showKeywords = !showKeywords">
          <v-icon>{{showKeywords ? 'keyboard_arrow_up':'keyboard_arrow_down'}}</v-icon>
        </v-btn> -->
      </v-toolbar-items>
      <template slot="extension" v-if="showFilter">
        <v-select
          :value="sort"
          :items="sortTexts"
          color="indigo"
          @change="onSortChangedDebounced"
          >
        </v-select>
      </template>
    </v-toolbar>
    <v-tabs-items :value="tab">
      <v-tab-item v-for="i in 3" :key="i">
        <v-card v-if="false"
          style="width: 100%;">
          <v-card-text>
            <!-- <template v-if="onLoading">
              <v-layout align-center justify-center column>
                  <v-progress-circular
                    style="margin-top: 2em; margin-bottom: 2em;"
                    color="purple"
                    indeterminate
                  ></v-progress-circular>
                <br>
              </v-layout>
            </template> -->
            <!-- <template v-else-if="showKeywords">
              <template v-if="keywords.length === 0">
                <span v-if="tagLow" class="blue--text">#{{tagHigh.tag}} #{{tagLow.tag}}</span>
                <span v-else-if="tagHigh" class="blue--text">#{{tagHigh.tag}}</span>
                <span v-else> 전체 이해 관계자</span> 집단의 키워드 분석을 위한 영향의 갯수가 부족합니다. 영향을 직접 읽어주세요.
              </template>
              <template v-else>
                <span v-if="effectFilter.length === 1 && effectFilter[0] === 0"> <span class="red--text">부정적</span> 영향을 적은 </span>
                <span v-else-if="effectFilter.length === 1 && effectFilter[0] === 1"> <span class="blue--text">긍정적</span> 영향을 적은 </span>

                <span v-if="tagLow" class="blue--text">#{{tagHigh.tag}} #{{tagLow.tag}}</span>
                <span v-else-if="tagHigh" class="blue--text">#{{tagHigh.tag}}</span>
                <span v-else> 전체 이해 관계자</span>
                집단이 많이 사용한 단어의 목록입니다. <br>
                <template>
                  <v-chip v-for="keyword in keywords" :key="keyword[0] + keyword[1] + 'main'" :color="getKeywordColor(keyword[2])" text-color="white">{{keyword[0]}}</v-chip>
                </template>
              </template>
              <br>
              <template v-if="tagLow">
                <template v-if="keywordsHigh.length === 0">
                  <span class="blue--text">#{{tagHigh.tag}}</span> 키워드 분석을 위한 영향의 갯수가 부족합니다. 아래 영향을 직접 읽어보세요!
                </template>
                <template v-else>
                  <span v-if="effectFilter.length === 2" class="purple--text">모든</span>
                  <span v-else-if="effectFilter.length === 1 && effectFilter[0] === 0" class="red--text">부정적</span>
                  <span v-else-if="effectFilter.length === 1 && effectFilter[0] === 1" class="blue--text">긍정적</span>
                  영향을 적은
                  <span class="blue--text">#{{tagHigh.tag}}</span>
                  집단이 많이 사용한 단어와 비교해보세요. <br>
                  <template>
                    <v-chip v-for="keyword in keywordsHigh" :key="keyword[0] + keyword[1] + 'high'" :color="getKeywordColor(keyword[2])" text-color="white">{{keyword[0]}}</v-chip>
                  </template>
                </template>
                <br>
                <span v-if="effectFilter.length === 2" class="purple--text">모든</span>
                <span v-else-if="effectFilter.length === 1 && effectFilter[0] === 0" class="red--text">부정적</span>
                <span v-else-if="effectFilter.length === 1 && effectFilter[0] === 1" class="blue--text">긍정적</span>
                 영향을 적은
                <span class="blue--text">전체 이해 관계자</span>
                집단이 많이 사용한 단어와도 비교해보세요. <br>
                <template>
                  <v-chip v-for="keyword in keywordsAll" :key="keyword[0] + keyword[1] + 'all'" :color="getKeywordColor(keyword[2])" text-color="white">{{keyword[0]}}</v-chip>
                </template>
              </template>
              <template v-else-if="tagHigh">
                <span v-if="effectFilter.length === 2" class="purple--text">모든</span>
                <span v-else-if="effectFilter.length === 1 && effectFilter[0] === 0" class="red--text">부정적</span>
                <span v-else-if="effectFilter.length === 1 && effectFilter[0] === 1" class="blue--text">긍정적</span>
                 영향을 적은
                <span class="blue--text">전체 이해 관계자</span>
                집단이 많이 사용한 단어와 비교해보세요. <br>
                <template>
                  <v-chip v-for="keyword in keywordsAll" :key="keyword[0] + keyword[1] + 'all'" :color="getKeywordColor(keyword[2])" text-color="white">{{keyword[0]}}</v-chip>
                </template>
              </template>
            </template> -->
          </v-card-text>
        </v-card>
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
            <v-flex style="overflow: auto; width: 100%;">
              <effect-card
                v-for="effect in sortedEffects"
                :key="effect.id"
                :effect="effect"/>
            </v-flex>
          </v-layout>
        </template>
      </v-tab-item>
    </v-tabs-items>
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
    // this.onInputDebounced = _.debounce(this.onInput, 1000)
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
        return effects.length === 0 || effects.reduce(f)
      }
    },
    onLoading: Boolean,
    effectFilter: Array,
    closeTags: Array,
    tab: Number
  },
  computed: {
    selectedTag: function () {
      return this.$store.state.selectedTag
    },
    policy: function () {
      return this.$store.state.policy
    },
    userGroup: function () {
      return this.$store.getters.userGroup
    },
    keywordsHigh: function () {
      return this.$store.state.keywordsHigh[this.tab]
    },
    keywordsAll: function () {
      return this.$store.state.keywordsAll[this.tab]
    },
    allKeywords: function () {
      return this.$store.state.keywords[0]
    },
    // stakeholder_left: function () {
    //   if (this.$store.state.userPolicy.stakeholders_seen > 3) {
    //     return 0
    //   }
    //   return 3 - this.$store.state.userPolicy.stakeholders_seen
    // },
    // effect_left: function () {
    //   if (this.$store.state.userPolicy.effects_seen > 9) {
    //     return 0
    //   } else if (this.filteredTags.length < 9) {
    //     return this.filteredTags.length - this.$store.state.userPolicy.effects_seen
    //   }
    //   return 9 - this.$store.state.userPolicy.effects_seen
    // },
    // filteredTags: function () {
    //   const ft = this.tags.filter((tag) => { return tag.total_count >= 3 })
    //   return ft.length > 0 ? ft : this.tags
    // },
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
    // explorationRequired: function () {
    //   return this.filteredTags.length >= 9 ? 9 : this.filteredTags.length
    // },
    // answer_left: function () {
    //   // console.log(this.$store.state.userPolicy)
    //   if (this.userGroup === 6 || this.userGroup === 7) {
    //     return 3 - this.$store.state.userPolicy.stakeholders_answered
    //   } else {
    //     return 0
    //   }
    // },
    // pagenum: function () {
    //   return Math.ceil(this.count / 50)
    // },
    keywords: function () {
      return this.$store.state.keywords[this.tab]
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
      // onLoading: false,
      show: false,
      showFilter: false,
      showKeywords: true,
      guessFilter: [0, 1],
      // tab: 0,
      sortTexts: [{
        text: '긴 영향부터 보기',
        value: 0
      },
      {
        text: '짧은 영향부터 보기',
        value: 1
      },
      {
        text: '긴 설명부터 보기',
        value: 2
      },
      {
        text: '짧은 설명부터 보기',
        value: 3
      },
      {
        text: '태그 많은 영향부터 보기',
        value: 4
      },
      {
        text: '태그 적은 영향부터 보기',
        value: 5
      },
      {
        text: '오래된 영향부터 보기',
        value: 6
      },
      {
        text: '새로 올라온 영향부터 보기',
        value: 7
      }],
      sort: 0
    }
  },
  methods: {
    onSortChanged: function (ev) {
      this.sort = ev
    },
    getKeywordColor: function (k) {
      if (k === 'both') {
        return 'blue-grey'
      } else if (k === 'pos') {
        return 'blue'
      } else if (k === 'neg') {
        return 'red'
      } else {
        return 'grey'
      }
    },
    onTagHighClick: function (tag) {
      this.$emit('tag-high-click', tag)
    },
    onTagHighLinkClick: function (tagTxt) {
      const tag = this.tags.find((t) => {
        return t.tag === tagTxt
      })
      this.onTagHighClick(tag)
    },
    onTagLinkClick: function (tagTxt) {
      if (this.tagHigh) {
        this.onTagLowLinkClick(tagTxt)
      } else {
        this.onTagHighLinkClick(tagTxt)
      }
    },
    onTagLowClick: function ($event) {
      if ($event === null) {
        this.$emit('tag-low-click', null, false)
      } else {
        const tag = this.tagHigh.children[$event]
        this.$emit('tag-low-click', tag, true)
      }
    },
    onTagLowLinkClick: function (tagTxt) {
      const tag = this.tagHigh.children.find((t) => {
        return t.tag === tagTxt
      })
      this.$emit('tag-low-click', tag, true)
    },
    onTabClick: function (i) {
      // this.tab = i
      if (i === 1 && this.effectFilter.length < 2) {
        // this.tab = i
        this.onEffectFilterChangeDebounced([0, 1], i)
      } else if (i === 2 && !(this.effectFilter.length === 1 && this.effectFilter[0] === 1)) {
        // this.tab = i
        this.onEffectFilterChangeDebounced([1], i)
      } else if (i === 3 && !(this.effectFilter.length === 1 && this.effectFilter[0] === 0)) {
        // this.tab = i
        this.onEffectFilterChangeDebounced([0], i)
      }
    },
    // onInput: async function (ev) {
    //   this.onLoading = true
    //   this.selectedTags = ev
    //   this.$ga.event({
    //     eventCategory: this.$router.currentRoute.path,
    //     eventAction: 'SearchTags',
    //     eventLabel: this.selectedTags,
    //     eventValue: 0
    //   })
    //   this.$store.dispatch('addBrowsedTags', this.selectedTags)
    //   const effects = await this.$axios.$get('/api/effects/', {
    //     params: {
    //       policy: this.policy.id,
    //       tag: this.selectedTags,
    //       is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
    //       include_guess: this.guessFilter.length === 1 ? this.guessFilter[0] : null
    //     }
    //   })
    //   // this.$store.dispatch('incrementUserPolicyEffectsSeen')
    //   this.effects = effects.results
    //   this.count = effects.count
    //   this.page = 1
    //   this.onLoading = false
    // },
    onEffectFilterChange: async function (ev, i) {
      this.$emit('effect-filter-change', ev, i, this.guessFilter)
    },
    // onGuessFilterChange: async function (ev) {
    //   this.onLoading = true
    //   this.guessFilter = ev
    //   this.$ga.event({
    //     eventCategory: this.$router.currentRoute.path,
    //     eventAction: 'GuessFilterChanged',
    //     eventLabel: this.guessFilter,
    //     eventValue: 0
    //   })
    //   const effects = await this.$axios.$get('/api/effects/', {
    //     params: {
    //       policy: this.policy.id,
    //       tag: this.selectedTags,
    //       is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
    //       include_guess: this.guessFilter.length === 1 ? this.guessFilter[0] : null
    //     }
    //   })
    //   this.effects = effects.results
    //   this.count = effects.count
    //   this.page = 1
    //   this.onLoading = false
    // },
    // onPageChange: async function (newPage) {
    //   this.onLoading = true
    //   this.$ga.event({
    //     eventCategory: this.$router.currentRoute.path,
    //     eventAction: 'PageChange',
    //     eventLabel: `${newPage} / ${this.pagenum}`,
    //     eventValue: 0
    //   })
    //   const effects = await this.$axios.$get('/api/effects/', {
    //     params: {
    //       policy: this.policy.id,
    //       tag: this.selectedTags,
    //       is_benefit: this.effectFilter.length === 1 ? this.effectFilter[0] : null,
    //       include_guess: this.guessFilter.length === 1 ? this.guessFilter[0] : null,
    //       page: newPage
    //     }
    //   })
    //   this.effects = effects.results
    //   this.page = newPage
    //   this.onLoading = false
    // },
    onShowFilterChanged: async function () {
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
  }
}
</script>

