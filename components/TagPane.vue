<template>
  <v-card>
    <v-card-title>
      <template v-if="onTagLoading">
        태그 목록을 불러오고 있습니다. 조금만 기다려주세요...
      </template>
      <template v-else-if="!tagHigh">
        <span class="subheading">선택하신 정책과 관련된 모든 이해 관계자의 목록입니다.</span>
      </template>
      <template v-else>
        <v-layout row wrap>
          <span class="subheading">
            <span class="blue--text">#{{tagHigh.tag}}</span>의 세부 집단입니다.
            <span v-if="tagLow">
              <br>
              <span class="blue--text">#{{tagHigh.tag}}</span> > <span class="blue--text">#{{tagLow.tag}}</span> 집단을 보고 계십니다.
            </span>
          </span>
          <!-- <v-flex xs12>
            <span class="blue--text">긍정적 영향 {{tagHigh.pos_count}} </span>
            <v-chip label>#{{tagHigh.tag}}</v-chip>
            <span class="red--text">{{tagHigh.neg_count}} 부정적 영향 </span>
            <v-btn icon @click="onTagHighResetClick"><v-icon>close</v-icon></v-btn>
          </v-flex> -->
          <!-- <v-flex xs12>
            <v-card>
              <v-card-title>
                <span class="title">#{{tagHigh.tag}}</span>
                <v-spacer/>
                <span class="blue--text">
                  <strong>긍정 {{tagHigh.pos_count}} </strong>
                </span>
                vs
                <span class="red--text">
                  <strong> 부정 {{tagHigh.neg_count}}</strong>
                </span>
                <v-spacer />
                <v-btn icon style="float: right;" @click="onTagHighResetClick"><v-icon>close</v-icon></v-btn>
              </v-card-title>
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
              </v-slide-y-transition>
            </v-card>
          </v-flex> -->
          <!-- <v-flex xs3>
            <v-btn block @click="onTagHighResetClick" class="clearBtn">다른 집단 보기</v-btn>
          </v-flex> -->
          <!-- <v-flex xs12>
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
          </v-flex> -->
        </v-layout>
      </template>
    </v-card-title>
    <v-card-text>
      <v-layout column justify-center align-center class="tree">
        <v-flex style="overflow: auto; width: 100%;">
          <template v-if="onTagLoading">
            <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
          </template>
          <!-- <loader v-if="onTagLoading">
          </loader> -->
          <template v-else-if="!tagHigh">
            <tag-overview-item v-for="tag in tags" :key="tag.tag" :tag="tag" @tag-click="onTagHighClick(tag)" :cls="expansionPanelColor(tag)">
            </tag-overview-item>
            <!-- <v-list two-line>
              <tag-overview-list-item v-for="tag in tags" :key="tag.tag" :tag="tag" @tag-click="onTagHighClick(tag)">
              </tag-overview-list-item>
            </v-list> -->
          </template>
          <template v-else>
            <v-expansion-panel 
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
                    <v-card-text>
                      <!-- <span class="blue--text">#{{tagHigh.tag}} #{{tagLow.tag}}</span> 집단과  -->
                      의견이 다른
                      <span class="blue--text">#{{tagLowInfo.farthest_subgroup[0]}} #{{tagLowInfo.farthest_subgroup[1]}} </span>집단의 의견을 확인해보세요
                      <br>
                      <a @click="onTagHighLinkClick(tagLow.tag)"><span class="blue--text">#{{tagLow.tag}}</span> 집단 전체의 의견을 확인해보세요!</a>
                    </v-card-text>
                  </template>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
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
      show: false
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
        const tag = this.tagHigh.children[$event]
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
      if (tag.pos_count >= 2 * tag.neg_count) {
        return 'blue lighten-5'
      } else if (tag.pos_count * 2 <= tag.neg_count) {
        return 'red lighten-5'
      } else {
        return 'blue-grey lighten-5'
      }
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

.clearBtn {
  height: 80%;
}
</style>
