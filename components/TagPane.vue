<template>
  <v-layout row>
    <v-flex xs12>
      <div class="header">
        <template v-if="onTagLoading">
          태그 목록을 불러오고 있습니다. 조금만 기다려주세요...
        </template>
        <template v-else-if="!tagHigh">
          선택하신 정책과 관련된 모든 이해 관계자의 목록입니다.
        </template>
        <template v-else>
          <div>
            <span class="blue--text">#{{tagHigh.tag}}</span>을 선택하셨습니다.
            <br>
            가장 유사한 태그는 <a @click="onTagHighLinkClick(tagHighInfo.closest)"><span class="blue--text">#{{tagHighInfo.closest}}</span></a>
            <br>
            의견 비율이 다른 태그는 <a @click="onTagHighLinkClick(tagHighInfo.closest)"><span class="blue--text">#{{tagHighInfo.different}}</span></a>
          </div>
          <v-btn @click="onTagHighResetClick">Clear</v-btn>
        </template>
      </div>
      <template v-if="onTagLoading">
        <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
      </template>
      <!-- <loader v-if="onTagLoading">
      </loader> -->
      <template v-else-if="!tagHigh">
        <tag-overview-item v-for="tag in tags" :key="tag.tag" :tag="tag" @tag-click="onTagHighClick(tag)">
        </tag-overview-item>
      </template>
      <template v-else>
        <v-expansion-panel>
          <!-- <v-expansion-panel-content>

          </v-expansion-panel-content> -->
          <v-expansion-panel-content 
            lazy 
            v-for="tag in tagHigh.children" 
            :key="tag.tag" 
            @input.capture="onTagLowClickDebounced(tag, $event)"
            :class="expansionPanelColor(tag.tag)">
            <div slot="header">
              {{tag.tag}}
            </div>
            <v-card>
              <v-card-text v-if="onTagLowLoading" :class="expansionPanelColor(tag.tag)">
                <v-progress-circular indeterminate :size="30" :width="5" color="purple"></v-progress-circular>
              </v-card-text>
              <v-card-text v-else-if="tagLow !== null" :class="expansionPanelColor(tag.tag)">
                찬 {{tagLowInfo.pos_count}} vs {{tagLowInfo.neg_count}} 반
                #{{tagHigh.tag}} #{{tagLow.tag}} 태그와 의견 비율이 다른 태그는
                <!-- <a @click="onTagLowLinkClick(tagLowInfo.farthest_subgroup[1])"><span class="blue--text"> -->
                  #{{tagLowInfo.farthest_subgroup[0]}} #{{tagLowInfo.farthest_subgroup[1]}}
                <!-- </span></a> -->
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import TagOverviewItem from '~/components/TagOverviewItem.vue'
import Loader from '~/components/Loader.vue'
import _ from 'lodash'
export default {
  props: {
    tags: {
      type: Array
    },
    maxValue: {
      type: Number
    },
    category: {
      type: String
    },
    onTagLoading: Boolean,
    onTagLowLoading: Boolean
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
    Loader
  },
  mounted: function () {
    this.onTagLowClickDebounced = _.debounce(this.onTagLowClick, 500)
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
    onTagLowClick: function (tag, $event) {
      this.$emit('tag-low-click', tag, $event)
    },
    onTagLowLinkClick: function (tagTxt) {
      const tag = this.tagHigh.children.find((t) => {
        return t.tag === tagTxt
      })
      this.onTagLowClick(tag, true)
    },
    expansionPanelColor: function (tagTxt) {
      return tagTxt === this.tagHighInfo.most_pos ? 'blue lighten-5' : (tagTxt === this.tagHighInfo.most_neg ? 'red lighten-5' : '')
    }
  }
}
</script>

<style scoped>

.tree {
  height: 80vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
  width: 100%;
}
</style>
