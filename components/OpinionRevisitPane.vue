<template>
  <v-card color="grey lighten-4">
    <!-- <v-card-title>
      aaaa
    </v-card-title> -->
    <!-- content here -->
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          혹시 정책에 대한 의견이 변하셨나요? 의견이 어떻게 바뀌셨는지 알려주세요!
          <v-slider
            v-model="currentStance"
            @change="onUpdateStance"
            @start="previousStance = currentStance"
            :tick-labels="opinions"
            min="1"
            max="7"
            >
          </v-slider>
          <!-- <br>
          <div v-if="updateStance">
            이 정책에 대해서 왜 그렇게 생각하시나요? 이유를 알려주세요!
            <v-textarea
              v-model="changedOpinion">
            </v-textarea>
            <br>
            <div v-if="error">
              의견 업데이트가 실패했습니다. 다시 한 번 시도해주세요!
            </div>
            <v-btn class="error"
              @click="onCancelUpdateStance">
              취소
            </v-btn>
            <v-btn class="success"
              @click="onCommitUpdateStance">
              저장
            </v-btn>
          </div> -->
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    initialStance: function () {
      return this.$store.state.initialStance
    },
    initialOpinion: function () {
      return this.$store.state.initialOpinion
    },
    userPolicy: function () {
      return this.$store.state.userPolicy
    }
  },
  data: function () {
    return {
      changedOpinion: this.$store.state.userPolicy.final_opinion,
      currentStance: this.$store.state.userPolicy.final_stance,
      previousStance: this.$store.state.userPolicy.final_stance,
      updateStance: false,
      showMyOpinion: false,
      opinions: ['매우 부정적', '', '', '', '', '', '매우 긍정적'],
      error: false
    }
  },
  methods: {
    onUpdateStance: function () {
      this.updateStance = true
    },
    onCancelUpdateStance: function () {
      this.updateStance = false
      this.currentStance = this.previousStance
    },
    onCommitUpdateStance: async function () {
      // TODO: Apply in database
      this.error = false
      try {
        const result = await this.$axios.$patch(`/api/userpolicy/${this.userPolicy.id}/`, {
          final_stance: this.currentStance,
          final_opinion: this.changedOpinion
        })
        this.$store.state.commit('setUserPolicy', result)
        this.updateStance = false
      } catch (e) {
        this.error = true
      }
    }
  }
}
</script>
<style scoped>
.v-card__text {
  padding-bottom:0 !important;
  padding-top: 0 !important;
  margin-bottom: 1em;
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
