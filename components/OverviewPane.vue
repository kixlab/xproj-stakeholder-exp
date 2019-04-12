<template>
  <v-card color="grey lighten-4">
    <!-- Header here -->
    <v-card-title>
      <template v-if="tagHigh">
        <a @click="onTagHighReset"><span class="title">모든 이해 관계자 </span></a>
        <v-icon>chevron_right</v-icon>
        <a v-if="tagLow" @click="onUpdateSelectedTagLow(null, false, -1)"><span class="title"> #{{tagHigh.tag}}</span></a>
        <v-icon v-if="tagLow">chevron_right</v-icon>
        <span v-if="tagLow">
          <span class="title">#{{tagLow.tag}}</span>
        </span>
        <span v-else>
          <span class="title">#{{tagHigh.tag}}</span>
        </span>
        <v-spacer/>
        <template v-if="tagLow">
          <span class="blue--text">
            <strong>긍정 {{tagLow.pos_count}} </strong>
          </span>
          <span> vs </span>
          <span class="red--text">
            <strong>{{tagLow.neg_count}} 부정</strong>
          </span>
        </template>
        <template v-else-if="tagHigh">
          <span class="blue--text">
            <strong>긍정 {{tagHigh.pos_count}} </strong>
          </span>
          <span> vs </span>
          <span class="red--text">
            <strong>{{tagHigh.neg_count}} 부정</strong>
          </span>
        </template>
        <template v-else>
        </template>
        <v-spacer/>
        <!-- <v-btn @click="onShowRelevantTagsClick">
          {{showRelevantTags ? '접어두기' : '관련 집단 보기'}}
        </v-btn> -->
        <v-btn @click="onShowKeywordsClick">
          {{showKeywords ? '접어두기' : '키워드 보기'}}
        </v-btn>
        <!-- <v-btn style="float: right;" @click="onTagHighReset">모든 집단 보기</v-btn> -->
      </template>
      <template v-else>
        <span class="title">모든 이해관계자</span>
        <!-- <v-spacer/>
        <span class="blue--text">
          <strong>긍정 {{totalPosCount}} </strong>
        </span>
        vs
        <span class="red--text">
          <strong> 부정 {{totalNegCount}}</strong>
        </span> -->
        <v-spacer/>
        <!-- <v-btn @click="onShowRelevantTagsClick">
          {{showRelevantTags ? '접어두기' : '관련 집단 보기'}}
        </v-btn> -->
        <v-btn @click="onShowKeywordsClick">
          {{showKeywords ? '접어두기' : '키워드 보기'}}
        </v-btn>
      </template>
    </v-card-title>
    <!-- content here -->
    <v-expand-transition>
      <v-card-text v-if="showKeywords">
        <v-layout row wrap>
          <v-flex xs4 style="text-align: left;"> <!-- related groups-->
            <template v-if="tagLow"> <!-- when tagLow exists -->
            
            </template>
            <template v-else-if="tagHigh"> <!-- when tagHigh exists -->
              아래 이해 관계자 목록을 이용해 #{{tagHigh.tag}} 집단에 대해 자세히 알아보세요!
              <br>
              #{{tagHigh.tag}} 중 이 정책에 가장 긍정적인
              <span v-for="tag in closePositiveTags" :key="tag.tag" class="blue--text">
                <a class="blue--text" @click="onUpdateSelectedTagLow(tag, true)">#{{tag.tag}} </a>
              </span>
              <br>
              이 정책에 가장 부정적인
              <span v-for="tag in closeNegativeTags" :key="tag.tag" class="red--text">
                <a class="red--text" @click="onUpdateSelectedTagLow(tag, true)">#{{tag.tag}} </a>
              </span>
              <br>집단부터 시작해보세요.
            </template>
            <template v-else-if="!tagHigh"> <!-- when no tag exists -->
              아래 이해 관계자 목록을 이용해 영향을 자세히 알아보세요!
              <br>
              이 정책에 가장 긍정적인
              <span v-for="tag in closePositiveTags" :key="tag.tag" class="blue--text">
                <a class="blue--text" @click="onUpdateSelectedTagHigh(tag)">#{{tag.tag}} </a>
              </span>

              <br>이 정책에 가장 부정적인
              <span v-for="tag in closeNegativeTags" :key="tag.tag" class="red--text">
                <a class="red--text" @click="onUpdateSelectedTagHigh(tag)">#{{tag.tag}} </a>
              </span>

              <br>집단부터 시작해보세요.
            </template>
          </v-flex>
          <v-flex xs8> <!-- keywords -->
            <v-layout row wrap>
              <v-flex xs12>  <!-- keywords_all -->
                이 집단이 특히 많이 사용한 단어들입니다.
                <br>
                <v-chip 
                  v-for="keyword in distinctKeywords"
                  :key="keyword[0] + keyword[1] + 'main'"
                  :color="getKeywordColor(keyword[2])"
                  text-color="white"
                  >{{keyword[0]}}</v-chip>
              </v-flex>
              <v-flex xs6> <!-- keywords-pos -->
                긍정적 영향에서 자주 등장한 단어
                <br>
                <v-chip
                  v-for="keyword in positiveKeywords"
                  :key="keyword[0] + keyword[1] + 'pos'"
                  :color="getKeywordColor(keyword[2])"
                  text-color="white"
                >{{keyword[0]}}</v-chip>
              </v-flex>
              <v-flex xs6> <!-- keywords-neg-->
                부정적 영향에서 자주 등장한 단어
                <br>
                <v-chip
                  v-for="keyword in negativeKeywords"
                  :key="keyword[0] + keyword[1] + 'neg'"
                  :color="getKeywordColor(keyword[2])"
                  text-color="white"
                >{{keyword[0]}}</v-chip>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    effectFilter: Array,
    closePositiveTags: Array,
    closeNegativeTags: Array
  },
  computed: {
    totalPosCount: function () {
      return this.$store.state.totalPosCount
    },
    totalNegCount: function () {
      return this.$store.state.totalNegCount
    },
    tagHigh: function () {
      return this.$store.state.tagHigh
    },
    tagLow: function () {
      return this.$store.state.tagLow
    },
    keywords: function () {
      return this.$store.state.keywords[0]
    },
    bothKeywords: function () {
      return this.keywords.filter(k => {
        return k[2] === 'both' || k[2] === 'none'
      })
    },
    positiveKeywords: function () {
      return this.keywords.filter(k => {
        return k[2] === 'pos'
      })
    },
    distinctKeywords: function () {
      const keywordsUpper = this.keywordsUpper.map(x => {
        return x[0]
      })
      return this.keywords.filter(k => {
        return !keywordsUpper.includes(k[0])
      })
    },
    negativeKeywords: function () {
      return this.keywords.filter(k => {
        return k[2] === 'neg'
      })
    },
    bothKeywordsUpper: function () {
      return this.keywordsUpper[0].filter(k => {
        return k[2] === 'both' || k[2] === 'none'
      })
    },
    positiveKeywordsUpper: function () {
      return this.keywordsUpper[0].filter(k => {
        return k[2] === 'pos'
      })
    },
    negativeKeywordsUpper: function () {
      return this.keywordsUpper[0].filter(k => {
        return k[2] === 'neg'
      })
    },
    // positiveKeywords: function () {
    //   return this.$store.state.keywords[1]
    // },
    // negativeKeywords: function () {
    //   return this.$store.state.keywords[2]
    // },
    keywordsHigh: function () {
      return this.$store.state.keywordsHigh[0]
    },
    keywordsAll: function () {
      return this.$store.state.keywordsAll[0]
    },
    keywordsUpper: function () {
      if (this.tagLow) {
        return this.keywordsHigh
      } else if (this.tagHigh) {
        return this.keywordsAll
      } else if (!this.tagHigh) {
        return []
      }
    }
  },
  data: function () {
    return {
      showKeywords: false,
      showRelevantTags: false
    }
  },
  methods: {
    onUpdateSelectedTagLow: function (tag, show, idx) {
      this.$emit('tag-low-click', tag, show, idx)
    },
    onUpdateSelectedTagHigh: function (tag) {
      this.$emit('tag-high-click', tag)
    },
    onTagHighReset: function () {
      this.$emit('tag-high-reset')
    },
    onShowKeywordsClick: function () {
      this.showKeywords = !this.showKeywords
      this.showRelevantTags = false
    },
    onShowRelevantTagsClick: function () {
      this.showRelevantTags = !this.showRelevantTags
      this.showKeywords = false
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
    }
  }
}
</script>
<style scoped>
.v-card__title {
  padding-bottom:0 !important;
  padding-top: 0 !important;
}
/* 
.v-card__title .title {
  font-family: 'Roboto, Nanum Gothic, 나눔 고딕, sans-serif'
} */
</style>
