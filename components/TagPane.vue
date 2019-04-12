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
        <tag-overview-item
          :tag="tagHigh"
          :cls="expansionPanelColor(tagHigh)"
        >
        </tag-overview-item>
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
          <template v-if="!tagHigh && !onTagLoading">
            <tag-overview-item 
              v-for="tag in tags" 
              :key="tag.tag" 
              :tag="tag" 
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
                v-for="(tag, idx) in tagLows"
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
