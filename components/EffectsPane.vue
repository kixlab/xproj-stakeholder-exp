<template>
  <v-card>
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
            <!-- #{{tagHigh.tag}} {{tagLow ? '#' + tagLow.tag : ''}} 집단은 이 단어들을 어떻게 사용했을까요? -->
            <v-layout>
              <v-flex md12 lg9 ref="myCloudContainer" :style="`height: ${sortedEffects.length >= 10 ? 30 : 0}em;`">
                <svg ref="myCloud" style="width: 100%; height: 100%;">
                  <g :transform="`translate(${svgWidth/2}, ${svgHeight/2})`">
                    <text v-for="word in words"
                      :key="word.text"
                      :fill-opacity="word.ratio"
                      text-anchor="middle"
                      :transform="`translate(${word.x}, ${word.y})rotate(${word.rotate})`"
                      :style="`font-size: ${word.size}px; font-family: 'sans-serif'; fill: ${fill(word.type)}; cursor: pointer; ${selectedKeyword === word.text ? 'stroke: #000000; stroke-width: 2px; ' : ''}`"
                      @click="onKeywordSelected(word.text)"
                      @mouseover="hover = word"
                      @mouseleave="hover = null"
                      >
                    {{word.text}}
                    </text>
                    <!-- <rect v-if="hover"
                      :x="hover.x - (hover.width / 4)"
                      :y="hover.y - (hover.height / 4)"
                      width="200"
                      height="90"
                      style="fill: white;"
                      fill-opacity="0.8"
                      >
                    </rect>
                    <template v-if="hover">
                      <text
                        v-for="(t,i) in getHoverContext(hover.text)"
                        :key="t[0]"
                        style="font-size: 1em; font-family: 'Roboto'; fill: black;"
                        :x="hover.x - (hover.width / 4)"
                        :y="hover.y - (hover.height / 4) + i * 15"
                        >...{{t[0]}}...
                      </text>
                    </template> -->
                  </g>
                </svg>
              </v-flex>
              <v-flex md12 lg3 v-if="hover">
                <div class="triangle-obtuse" v-for="t in getHoverContext(hover.text)"
                  :key="t"
                  v-html="t">
                  
                </div>
              </v-flex>
            </v-layout>
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
                    :selectedKeyword="selectedKeyword"
                    :show-tag="showTags"/>
                </template>
              </v-flex>
            </v-layout>
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
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
  height: 72.7vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
  width: 100%;
}

.cards__list__cloud {
  height: 40vh;
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

.triangle-obtuse {
  position:relative;
  padding:1em;
  margin:1em 0 2em;
  width: 98%;
  /* color:#fff; */
  background:#3f51b540;
  /* css3 */
  /* background:-webkit-gradient(linear, 0 0, 0 100%, from(#f04349), to(#c81e2b));
  background:-moz-linear-gradient(#f04349, #c81e2b);
  background:-o-linear-gradient(#f04349, #c81e2b);
  background:linear-gradient(#f04349, #c81e2b); */
  /* -webkit-border-radius:10px;
  -moz-border-radius:10px; */
  border-radius:0.6em;
}


/* creates the wider right-angled triangle */
.triangle-obtuse:before {
  content:"";
  position:absolute;
  bottom:-2em; /* value = - border-top-width - border-bottom-width */
  left:25%; /* controls horizontal position */
  border:0;
  border-left-width:2em; /* vary this value to change the angle of the vertex */
  border-bottom-width:2em; /* vary this value to change the height of the triangle. must be equal to the corresponding value in :after */
  border-style:solid;
  border-color:transparent #3f51b540;
  /* reduce the damage in FF3.0 */
  display:block;
  width:0;
}

/* creates the narrower right-angled triangle */
.triangle-obtuse:after {
  content:"";
  position:absolute;
  bottom:-2em; /* value = - border-top-width - border-bottom-width */
  left:25%; /* value = (:before's left) + (:before's border-right/left-width)  - (:after's border-right/left-width) */
  border:0;
  border-left-width:0.625em; /* vary this value to change the angle of the vertex */
  border-bottom-width:2em; /* vary this value to change the height of the triangle. must be equal to the corresponding value in :before */
  border-style:solid;
  border-color:transparent #fafafa;
  /* reduce the damage in FF3.0 */
  display:block;
  width:0;
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
  created: function () {
    this.onEffectFilterChangeDebounced = _.debounce(this.onEffectFilterChange, 500)
    this.onSortChangedDebounced = _.debounce(this.onSortChanged, 500)
    // if (this.$store.state.selectedTag) {
    //   this.selectedTags.push(this.$store.state.selectedTag)
    //   this.$ga.event({
    //     eventCategory: this.$router.currentRoute.path,
    //     eventAction: 'SearchTags',
    //     eventLabel: this.selectedTags,
    //     eventValue: 0
    //   })
    //   this.$store.dispatch('addBrowsedTags', [this.$store.state.selectedTag])
    // }
  },
  mounted: function () {
    this.$nextTick(async function () {
      this.words = this.keywords[this.tab].map(w => {
        return {
          text: w[0],
          size: w[1] * 6,
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
    closeTags: Array,
    showTags: {
      default: true
    }
  },
  watch: {
    tab: function (newTab) {
      this.words = this.keywords[newTab].map(w => {
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
      cloud().size([newWidth, this.svgHeight]).words(this.words)
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
      sort: 0,
      layout: [],
      words: [],
      svgWidth: 0,
      svgHeight: 0,
      selectedKeyword: '',
      onKeywordLoading: false,
      effectFilter: [0, 1],
      tab: 0,
      hover: null
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
      // this.$emit('effect-filter-change', ev, i, this.guessFilter)
      this.onKeywordLoading = true
      setTimeout(() => {
        this.onKeywordLoading = false
      }, 500)
      this.tab = i - 1
      this.effectFilter = ev
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
    },
    getHoverContext: function (text) {
      const regex = new RegExp(`[^ ]* [^ ]+ [^ ]*${text}[^ ]* [^ ]+ [^ ]*`)
      const res = this.effects.map((e) => {
        return e.description.match(regex)
      }).filter(e => {
        return e
      }).slice(0, 5).map(d => {
        return '...' + d[0].replace(new RegExp(text, 'gi'), `<span style="font-weight: bold">${text}</span>`) + '...'
      })
      // console.log(res)
      return res
    }
  }
}
</script>

