<template>
  <v-card>
    <v-card-title>
      정책에 관한 이해관계자의 의견을 살펴보세요!
    </v-card-title>
    <v-expand-transition>
      <div
        v-if="showHelp"
        class="d-flex transition-fast-in-fast-out grey darken-2 v-card--reveal display-1 white--text"
        style="height: 100%;"
        @click="showHelp = !showHelp"
        >
        선택하신 집단에 속한 사람들이 직접 적은 정책의 영향을 알아보세요!
      </div>
    </v-expand-transition>
    <div>
      <v-tabs grow centered :value="tab">
        <v-tab v-for="n in 3" :key="n" @click="onTabClick(n)">
          <span :class="['purple--text', 'blue--text', 'red--text'][n-1]">{{['모든 영향', '긍정적 영향', '부정적 영향'][n-1]}}</span>
        </v-tab>
        <v-btn icon @click="showHelp = !showHelp">
          <v-icon>help</v-icon>
        </v-btn>
        <v-menu>
          <div slot="activator">
            <v-btn icon @click="showFilter = !showFilter">
              <v-icon>sort</v-icon>
            </v-btn>
          </div>
          <v-list>
            <v-list-tile
              v-for="item in sortTexts"
              :key="item.value"
              @click="sort = item.value"
              >
              <v-list-tile-title>
                {{item.text}}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-tabs>
      <v-tabs-items :value="tab">
        <v-tab-item>
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
            <div ref="myCloudContainer" :style="`width: 100%; height: ${sortedEffects.length >= 10 ? 30 : 0}vh;`">
              선택하신 집단이 많이 사용한 단어입니다. 단어를 클릭해보면서 이 집단이 어떤 의견을 갖고 있는지 알아보세요!
              <svg ref="myCloud" style="width: 100%; height: 100%;">
                <g :transform="`translate(${svgWidth/2}, ${svgHeight/2})`">
                  <text v-for="word in words"
                    :key="word.text"
                    :fill-opacity="word.ratio"
                    text-anchor="middle"
                    :transform="`translate(${word.x}, ${word.y})rotate(${word.rotate})`"
                    :style="`font-size: ${word.size}px; font-family: 'sans-serif'; fill: ${fill(word.type)}; cursor: pointer; ${selectedKeyword === word.text ? 'stroke: #000000; stroke-width: 2px; ' : ''}`"
                    @click="onKeywordSelected(word.text)"
                    >
                  {{word.text}}
                  </text>
                </g>
              </svg>
            </div>
            <v-layout :class="sortedEffects.length >= 10 ? 'cards__list__cloud' : 'cards__list'" column align-center justify-center>
              <v-flex style="overflow: auto; width: 100%;">
                <template v-if="onKeywordLoading">
                  <div style="width: 100%">
                    <v-progress-circular
                      :size="70"
                      :width="7"
                      color="purple"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
                <template v-else>
                  <effect-card
                    v-for="effect in filteredEffects"
                    :key="effect.id"
                    :effect="effect"
                    :showTag="false"
                    :selectedKeyword="selectedKeyword"/>
                </template>
              </v-flex>
            </v-layout>
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-flex xs12>
      <v-btn block color="primary" @click="onShowPolicyListClick">
        다음 정책 보기
      </v-btn>
    </v-flex>
  </v-card>
</template>

<style scoped>
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
  height: 85vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
  width: 100%;
}

.cards__list__cloud {
  height: 55vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
  width: 100%;
}

.effect__list__all {
  height: 76.6vh;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
  z-index: 63;
}
</style>

<script>
import EffectCard from '~/components/EffectCard.vue'
import PromisePane from '~/components/PromisePane.vue'
import setTokenMixin from '~/mixins/setToken.js'
import hangulSearchMixin from '~/mixins/hangulSearch.js'
import _ from 'lodash'
// import * as d3 from 'd3'
import cloud from 'd3-cloud'

export default {
  fetch: async function ({app, store, params}) {
    const effects = await app.$axios.$get('/api/effects/', {
      params: {
        policy: store.state.policyId,
        include_guess: 0
      }
    })
    store.commit('setEffects', effects.results)
    store.commit('setKeywords', effects.keywords)
    store.commit('setKeywordsAll', effects.keywords)
    await store.dispatch('setTags')
  },
  created: function () {
    this.onEffectFilterChangeDebounced = _.debounce(this.onEffectFilterChange, 500)
    this.onSortChangedDebounced = _.debounce(this.onSortChanged, 500)
  },
  mounted: function () {
    this.$nextTick(async function () {
      this.words = this.keywords[this.tab].map(w => {
        return {
          text: w[0],
          size: w[1] * 8,
          type: w[2],
          ratio: w[3]
        }
      })
      this.svgWidth = this.$refs.myCloudContainer.clientWidth
      this.svgHeight = this.$refs.myCloudContainer.clientHeight
    })
  },
  mixins: [setTokenMixin, hangulSearchMixin],
  components: {
    EffectCard,
    PromisePane
  },
  watch: {
    effects: function (newEffects) {
      this.words = this.keywords[this.tab].map(w => {
        return {
          text: w[0],
          size: w[1] * 8,
          type: w[2],
          ratio: w[3]
        }
      })
      const width = this.svgWidth
      const height = this.svgHeight
      cloud().size([width, height]).words(this.words)
        .rotate(0)
        .font('sans-serif')
        .fontSize(d => d.size)
        .start()
    },
    svgWidth: function (newWidth) {
      cloud().size([this.svgWidth, this.svgHeight]).words(this.words)
        .rotate(0)
        .font('sans-serif')
        .fontSize(d => d.size)
        .start()
    }
  },
  computed: {
    filteredEffects: function () {
      if (this.selectedKeyword) {
        return this.sortedEffects.filter(e => {
          return e.description.includes(this.selectedKeyword)
        })
      } else {
        return this.sortedEffects
      }
    },
    effects: function () {
      return this.$store.state.effects
    },
    policy: function () {
      return this.$store.state.policy
    },
    userGroup: function () {
      return this.$store.getters.userGroup
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
    filteredEffectsByTab: function () {
      return this.effects.filter(e => {
        return this.effectFilter.includes(e.isBenefit)
      })
    },
    sortedEffects: function () {
      return this.filteredEffectsByTab.sort(this.sorter)
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
    },
    keywords: function () {
      return this.$store.state.keywords
    },
    tagHigh: function () {
      return this.$store.state.tagHigh
    }
  },
  data: function () {
    return {
      show: false,
      showFilter: false,
      guessFilter: [0, 1],
      showHelp: false,
      sortTexts: [
        {
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
        }
      ],
      sort: 0,
      layout: [],
      words: [],
      svgWidth: 0,
      svgHeight: 0,
      selectedKeyword: '',
      onKeywordLoading: false,
      onLoading: false,
      effectFilter: [0, 1],
      tab: 0
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
    fill: function (type) {
      if (type === 'pos') {
        return '#03A9F4'
      } else if (type === 'neg') {
        return '#F44336'
      } else if (type === 'both') {
        return '#673AB7'
      } else {
        return '#607D88'
      }
    },
    onTabClick: function (i) {
      if (i === 1 && this.effectFilter.length < 2) {
        this.onEffectFilterChangeDebounced([0, 1], i)
      } else if (i === 2 && !(this.effectFilter.length === 1 && this.effectFilter[0] === 1)) {
        this.onEffectFilterChangeDebounced([1], i)
      } else if (i === 3 && !(this.effectFilter.length === 1 && this.effectFilter[0] === 0)) {
        this.onEffectFilterChangeDebounced([0], i)
      }
    },
    onEffectFilterChange: async function (ev, i) {
      this.onKeywordLoading = true
      this.effectFilter = ev
      this.tab = i - 1
      setTimeout(() => {
        this.onKeywordLoading = false
      }, 500)
    },
    onKeywordSelected: function (text) {
      this.onKeywordLoading = true
      if (this.selectedKeyword === text) {
        this.selectedKeyword = ''
      } else {
        this.selectedKeyword = text
      }
      setTimeout(() => {
        this.onKeywordLoading = false
      }, 500)
    }
  }
}
</script>

