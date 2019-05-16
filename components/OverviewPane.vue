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
        <v-btn @click="onShowMyOpinionClick">
          {{showMyOpinion ? '접어두기' : '내 의견 다시보기'}}
        </v-btn>
      </template>
      <template v-else>
        <span class="title">모든 이해관계자</span>
        <v-spacer/>
        <v-btn @click="onShowMyOpinionClick">
          {{showMyOpinion ? '접어두기' : '내 의견 다시보기'}}
        </v-btn>
      </template>
    </v-card-title>
    <!-- content here -->
    <v-expand-transition>
      <v-card-text v-if="showMyOpinion">
        <v-layout row wrap>
          <v-flex xs12>
            혹시 정책에 대한 의견이 변하셨나요? 의견이 어떻게 바뀌셨는지 알려주세요!
            <v-slider
              v-model="currentStance"
              @change="onUpdateStance"
              @start="previousStance = currentStance"
              :tick-labels="opinions"
              min="1"
              max="5"
              >
            </v-slider>
            <br>
            <div v-if="updateStance">
              이 정책에 대해서 왜 그렇게 생각하시나요? 이유를 알려주세요!
              <v-textarea
                v-model="changedOpinion">
              </v-textarea>
              <br>
              <v-btn class="error"
                @click="onCancelUpdateStance">
                취소
              </v-btn>
              <v-btn class="success"
                @click="onCommitUpdateStance">
                저장
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
  },
  computed: {
    initialStance: function () {
      return this.$store.state.initialStance
    },
    initialOpinion: function () {
      return this.$store.state.initialOpinion
    },
    tagHigh: function () {
      return this.$store.state.tagHigh
    },
    tagLow: function () {
      return this.$store.state.tagLow
    }
  },
  data: function () {
    return {
      changedOpinion: this.$store.state.initialOpinion,
      currentStance: this.$store.state.initialStance,
      previousStance: this.$store.state.initialStance,
      updateStance: false,
      showMyOpinion: false,
      opinions: ['매우 부정적', '부정적', '중립', '긍정적', '매우 긍정적']
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
    onShowMyOpinionClick: function () {
      this.showMyOpinion = !this.showMyOpinion
    },
    onUpdateStance: function () {
      this.updateStance = true
    },
    onCancelUpdateStance: function () {
      this.updateStance = false
      this.currentStance = this.previousStance
    },
    onCommitUpdateStance: function () {
      // TODO: Apply in database
      this.updateStance = false
    }
  }
}
</script>
<style scoped>
.v-card__title {
  padding-bottom:0 !important;
  padding-top: 0 !important;
}
.subheader {
  padding-bottom: 0.5em;
}
.tags {
  padding-right: 0.5em;
  padding-left: 0.5em;
}
/* 
.v-card__title .title {
  font-family: 'Roboto, Nanum Gothic, 나눔 고딕, sans-serif'
} */
</style>
