<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title id="header">
        <v-icon dark id="goback" @click="goback">arrow_back</v-icon>
        <div style="flex: 1;">
          <!-- The line must be ended with a single space -->
          <small> 중간 설문 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
        
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      <h2>첫 번째 정책은 잘 보셨나요?</h2>
      아래 설문을 완료한 뒤 다음으로 넘어가주세요.<br>
      (1 : 매우 부정 ~ 5 : 매우 긍정)
    </v-flex>
    <v-flex xs12>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책의 내용을 잘 이해하고 있다.
          <v-slider
            v-model="first_answer"
            :tick-labels="numericScales"
            :max="4"
            step="1"
            tick-size="2"/>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책이 나를 포함한 사회 구성원에게 미치는 영향을 잘 이해하고 있다.
          <v-slider
            v-model="second_answer"
            :tick-labels="numericScales"
            :max="4"
            step="1"
            tick-size="2"/>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책을 시행하는데 ______한다.
          <v-btn 
          :outline="third_answer !== 0" 
          :dark="third_answer == 0"
          color="primary"
          class="binarybtn"
          @click="third_answer=0">
          찬성 </v-btn>
          <v-btn 
          :outline="third_answer !== 1" 
          :dark="third_answer == 1"
          color="error" 
          class="binarybtn" 
          @click="third_answer=1"> 
          반대 </v-btn>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          이 정책에 대한 내 입장{{myStance}}은 확고하다.<br>
          <v-slider
            v-model="fourth_answer"
            :tick-labels="numericScales"
            :max="4"
            step="1"
            tick-size="2"/>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-btn block color="primary" @click="nextPolicy">다음</v-btn>
  </v-layout>
</template>
<style scoped>
#goback {
    float: left;
    position: absolute;
}
#header {
    flex: 1;
    display: flex;
    position: relative;
}
</style>
<script>
export default {
  methods: {
    goback () {
      this.$router.push('showPolicies')
    },
    nextPolicy () {
      console.log(this.third_answer)
      if (this.third_answer !== '-1') {
        this.$store.commit('setNextstep')
        switch (this.experimentCondition) {
          case 1:
          case 2:
            this.$router.push('readNews')
            break
          case 3:
            this.$store.commit('setPolicy', this.$store.state.policies[0])
            this.$router.push('SelectStakeholder')
            break
          case 4:
            this.$store.commit('setPolicy', this.$store.state.policies[1])
            this.$router.push('SelectStakeholder')
            break
          case 5:
            this.$store.commit('setPolicy', this.$store.state.policies[0])
            this.$router.push('Identify')
            break
          case 0:
            this.$store.commit('setPolicy', this.$store.state.policies[1])
            this.$router.push('Identify')
            break
        }
      }
    },
    computed: {
      myStance: function () {
        if (this.third_answer === 0) {
          return '(찬성)'
        } else if (this.third_answer === 1) {
          return '(반대)'
        } else {
          return ''
        }
      },
      experimentCondition: function () {
        return this.$store.getters.experimentCondition
      }
    }
  },
  data: function () {
    return {
      numericScales: ['1', '2', '3', '4', '5'],
      confidenceScales: ['매우 적음', '', '보통', '', '매우 확신'],
      first_answer: '',
      second_answer: '',
      third_answer: '-1',
      fourth_answer: ''
    }
  }
}
</script>