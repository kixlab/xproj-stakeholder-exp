<template>
  <v-card>
    <v-expand-transition>
      <div
        v-if="showHelp"
        class="d-flex transition-fast-in-fast-out grey darken-2 v-card--reveal white--text"
        style="height: 100%;"
        @click="showHelp = !showHelp"
        >
        <div v-if="tagHigh">
          #{{tagHigh.tag}} 집단과 같이 등장한 태그의 목록입니다.
          <br>
          사용자님과 유사한 집단부터 선택하고 의견을 알아보세요!
        </div>
        <div v-else>
          사용자님과 유사한 집단, 또는 사용자님 주변에 없는 집단부터 선택해보시고 의견을 알아보세요!
        </div>
      </div>
    </v-expand-transition>
    <v-card-title>
      <template v-if="onTagLoading">
        태그 목록을 불러오고 있습니다. 조금만 기다려주세요...
      </template>
      <template v-else-if="!tagHigh">
        <span class="subheading">선택하신 정책과 관련해 수집된 모든 이해 관계자 집단입니다.</span>
      </template>
      <template v-else>
        <span class="title">#{{tagHigh.tag}}</span>
        <v-spacer/>
        <span class="blue--text">긍정 {{tagHigh.pos_count}} </span>
          vs
        <span class="red--text">{{tagHigh.neg_count}} 부정</span>
      </template>
      <v-spacer/>
      <v-btn small icon class="tagpane--button" @click="showHelp = !showHelp">
        <v-icon>help</v-icon>
      </v-btn>
      <v-menu>
        <div slot="activator">
          <v-btn icon>
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
    </v-card-title>
    <!-- <v-card-title class="mysearchbox">
      <v-text-field append-icon="search">
      </v-text-field>
    </v-card-title> -->
    <v-card-text>
      <v-layout column justify-center align-center class="tree">
        <v-flex style="overflow: auto; width: 100%;">
          <template v-if="onTagLoading">
            <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
          </template>
          <!-- <loader v-if="onTagLoading">
          </loader> -->
          <template v-if="!tagHigh && !onTagLoading">
            <tag-overview-item 
              v-for="tag in sortedTagHigh" 
              :key="tag.tag" 
              :tag="tag" 
              :important="policy.key_stakeholders.includes(tag.tag)"
              @tag-click="onTagHighClick(tag)" 
              :cls="expansionPanelColor(tag)">
            </tag-overview-item>
          </template>
          <template v-if="tagHigh && !onTagLoading">
            <!-- <v-expansion-panel 
              @input.capture="onTagLowClickDebounced($event)"
              :value="expansionPanelValue">
              <v-expansion-panel-content 
                lazy 
                v-for="tag in tagLows" 
                :key="tag.tag" :class="expansionPanelColor(tag)">
                <div slot="header">
                  {{tag.tag}}
                  <v-spacer/>
                  <span class="blue--text">긍정 {{tag.pos_count}}</span> vs <span class="red--text">{{tag.neg_count}} 부정</span>
                </div>
                <v-card :class="expansionPanelColor(tag)">
                  <v-card-text v-if="onTagLowLoading" >
                    <v-layout align-center justify-center>
                      <v-progress-circular indeterminate :size="30" :width="5" color="purple"></v-progress-circular>
                    </v-layout>
                  </v-card-text>
                  <template v-else-if="tagLow !== null">
                  </template>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel> -->
            <v-list two-line>
              <tag-overview-list-item 
                v-for="(tag, idx) in sortedTagLow"
                :key="tag.tag"
                :tag="tag"
                :index="idx"
                :selected="idx === expansionPanelValue"
                @tag-low-click="onTagLowClickDebounced"
              >
              </tag-overview-list-item>
            </v-list>
          </template>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import TagOverviewItem from '~/components/TagOverviewItem.vue'
import TagOverviewListItem from '~/components/TagOverviewListItem.vue'
import Loader from '~/components/Loader.vue'
import _ from 'lodash'
export default {
  props: {
    tags: {
      type: Array
    },
    tagLows: {
      type: Array
    },
    maxValue: {
      type: Number
    },
    category: {
      type: String
    },
    onTagLoading: Boolean,
    onTagLowLoading: Boolean,
    expansionPanelValue: Number
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    sortedTagHigh: function () {
      return this.tags.slice().sort(this.sorter)
    },
    sortedTagLow: function () {
      if (!this.tagLows) {
        return []
      } else {
        return this.tagLows.slice().sort(this.sorter)
      }
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
    sorter: function () {
      return [
        (a, b) => {
          return a.total_count > b.total_count ? -1 : 1
        },
        (a, b) => {
          return a.total_count > b.total_count ? 1 : -1
        },
        (a, b) => {
          return (a.pos_count / a.total_count) > (b.pos_count / b.total_count) ? -1 : 1
        },
        (a, b) => {
          return (a.neg_count / a.total_count) > (b.neg_count / b.total_count) ? -1 : 1
        }
      ][this.sort]
    }
  },
  components: {
    TagOverviewItem,
    TagOverviewListItem,
    Loader
  },
  mounted: function () {
    this.onTagLowClickDebounced = _.debounce(this.onTagLowClick, 500)
  },
  data: function () {
    return {
      show: false,
      showHelp: false,
      sortTexts: [{
        text: '많이 등장한 집단부터 보기',
        value: 0
      },
      {
        text: '적게 등장한 집단부터 보기',
        value: 1
      },
      {
        text: '가장 긍정적인 집단부터 보기',
        value: 2
      },
      {
        text: '가장 부정적인 집단부터 보기',
        value: 3
      }],
      sort: 0
    }
  },
  methods: {
    onTagHighClick: function (tag) {
      this.$emit('tag-high-click', tag)
    },
    onTagHighLinkClick: function (tagTxt) {
      const tag = this.tags.find((t) => {
        return t.tag === tagTxt
      })
      this.onTagHighClick(tag)
    },
    onTagHighResetClick: function () {
      this.$emit('tag-high-reset')
    },
    onTagLowClick: function ($event) {
      if ($event === null) {
        this.$emit('tag-low-click', null, false, -1)
        // this.$emit('update-expansion-panel-value', $event)
      } else {
        const tag = this.sortedTagLow[$event]
        this.$emit('tag-low-click', tag, true, $event)
        // this.$emit('update-expansion-panel-value', $event)
      }
    },
    onTagLowLinkClick: function (tagTxt) {
      const tag = this.tagHigh.children.find((t) => {
        return t.tag === tagTxt
      })
      this.onTagLowClick(tag, true)
    },
    expansionPanelColor: function (tag) {
      // if (!this.policy.key_stakeholders.includes(tag.tag)) {
      if (tag.pos_count >= 2 * tag.neg_count) {
        return 'light-blue lighten-4'
      } else if (tag.pos_count * 2 <= tag.neg_count) {
        return 'red lighten-4'
      } else {
        return 'blue-grey lighten-4'
      }
      // } else {
      //   if (tag.pos_count >= 2 * tag.neg_count) {
      //     return 'light-blue accent-1'
      //   } else if (tag.pos_count * 2 <= tag.neg_count) {
      //     return 'red accent-1'
      //   } else {
      //     return 'deep-purple accent-1'
      //   }
      // }
      // const tagTxt = tag.tag
      // return tagTxt === this.tagHighInfo.most_pos ? 'blue lighten-5' : (tagTxt === this.tagHighInfo.most_neg ? 'red lighten-5' : '')
    },
    tagColor: function (tag) {
      if (tag.pos_count >= 2 * tag.neg_count) {
        return 'blue'
      } else if (tag.pos_count * 2 <= tag.neg_count) {
        return 'red'
      } else {
        return 'blue-grey'
      }
      // const tagTxt = tag.tag
      // return tagTxt === this.tagHighInfo.most_pos ? 'blue lighten-5' : (tagTxt === this.tagHighInfo.most_neg ? 'red lighten-5' : '')
    }
  }
}
</script>

<style scoped>

.v-card__title {
  padding-bottom: 0;
}
.mysearchbox {
  padding-top: 0;
}
.tree {
  height: 70vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
  width: 100%;
}
/* 
.header {
  text-align: left;

} */
.tagPane--button {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}
.clearBtn {
  height: 80%;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
  z-index: 63;
}

</style>
