<template>
  <v-layout row wrap justify-center>
    <general-toolbar :pagename="'중간 설문'"/>
    <v-flex xs12>
      <h2>{{step}}번째 정책은 잘 보셨나요?</h2>
      아래 설문을 완료한 뒤 다음으로 넘어가주세요.<br>
      (1 : 매우 부정 ~ 7 : 매우 긍정)
    </v-flex>
    <v-flex xs12>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책의 내용을 잘 이해하고 있다.
          <!-- <v-radio-group
            :value="first_answer"
            row
            >
            <v-radio v-for="n in 7" :key="n" :value="n" :label="n"></v-radio>
          </v-radio-group> -->
          <v-slider
            v-model="first_answer"
            :tick-labels="numericScales"
            thumb-label
            always-dirty
            :max="6"
            step="1"
            tick-size="2">
            <template slot="thumb-label" slot-scope="props">
              <span>{{props.value + 1}}</span>
            </template>
          </v-slider>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책이 나에게 미치는 영향을 잘 이해하고 있다.
          <v-slider
            v-model="second_answer"
            :tick-labels="numericScales"
            thumb-label
            always-dirty
            :max="6"
            step="1"
            tick-size="2">
            <template slot="thumb-label" slot-scope="props">
              <span>{{props.value + 1}}</span>
            </template>
          </v-slider>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책이 다른 사회 구성원에게 미치는 영향을 잘 이해하고 있다.
          <v-slider
            v-model="third_answer"
            :tick-labels="numericScales"
            thumb-label
            always-dirty
            :max="6"
            step="1"
            tick-size="2">
            <template slot="thumb-label" slot-scope="props">
              <span>{{props.value + 1}}</span>
            </template>
          </v-slider>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 이 정책을 시행하는데 {{myStance ? `${myStance}` : '_____'}}한다.
          <br>
          <v-btn 
          :outline="fourth_answer !== 0" 
          :dark="fourth_answer == 0"
          color="primary"
          class="binarybtn"
          @click="fourth_answer=0">
          찬성 </v-btn>
          <v-btn 
          :outline="fourth_answer !== 1" 
          :dark="fourth_answer == 1"
          color="error" 
          class="binarybtn" 
          @click="fourth_answer=1"> 
          반대 </v-btn>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          이 정책에 대한 내 입장{{myStance ? `(${myStance})` : ''}}은 확고하다.<br>
          <v-slider
            v-model="fifth_answer"
            :tick-labels="numericScales"
            thumb-label
            always-dirty
            :max="6"
            step="1"
            tick-size="2">
            <template slot="thumb-label" slot-scope="props">
              <span>{{props.value + 1}}</span>
            </template>
          </v-slider>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12>
      다음 세 질문은 이 정책과 관련해 제공된 첫번째 기사에 대한 질문입니다.
      <v-btn 
        color="success"
        @click="openFirstArticle"
        block ripple large>{{policy.article1_title}}</v-btn>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 첫번째 기사를 이해했다<br>
          <v-slider
            v-model="article1_q1"
            :tick-labels="numericScales"
            thumb-label
            always-dirty
            :max="6"
            step="1"
            tick-size="2">
            <template slot="thumb-label" slot-scope="props">
              <span>{{props.value + 1}}</span>
            </template>
          </v-slider>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          첫번째 기사는 균형잡힌 정보를 제공한다.<br>
          <v-slider
            v-model="article1_q2"
            :tick-labels="numericScales"
            thumb-label
            always-dirty
            :max="6"
            step="1"
            tick-size="2">
            <template slot="thumb-label" slot-scope="props">
              <span>{{props.value + 1}}</span>
            </template>
          </v-slider>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          첫번째 기사의 내용은 내가 정책의 다양한 영향을 이해하는데 도움이 되었다.<br>
          <v-slider
            v-model="article1_q3"
            :tick-labels="numericScales"
            thumb-label
            always-dirty
            :max="6"
            step="1"
            tick-size="2">
            <template slot="thumb-label" slot-scope="props">
              <span>{{props.value + 1}}</span>
            </template>
          </v-slider>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      다음 세 질문은 이 정책과 관련해 제공된 두번째 기사에 대한 질문입니다.
      <v-btn 
        color="success"
        @click="openSecondArticle"
        block ripple large v-html="policy.article2_title"></v-btn>
      <v-card flat colot="transparent">
        <v-card-text>
          나는 두번째 기사를 이해했다<br>
          <v-slider
            v-model="article2_q1"
            :tick-labels="numericScales"
            thumb-label
            always-dirty
            :max="6"
            step="1"
            tick-size="2">
            <template slot="thumb-label" slot-scope="props">
              <span>{{props.value + 1}}</span>
            </template>
          </v-slider>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          두번째 기사는 균형잡힌 정보를 제공한다.<br>
          <v-slider
            v-model="article2_q2"
            :tick-labels="numericScales"
            thumb-label
            always-dirty
            :max="6"
            step="1"
            tick-size="2">
            <template slot="thumb-label" slot-scope="props">
              <span>{{props.value + 1}}</span>
            </template>
          </v-slider>
        </v-card-text>
      </v-card>
      <v-card flat colot="transparent">
        <v-card-text>
          두번째 기사의 내용은 내가 정책의 다양한 영향을 이해하는데 도움이 되었다.<br>
          <v-slider
            v-model="article2_q3"
            :tick-labels="numericScales"
            thumb-label
            always-dirty
            :max="6"
            step="1"
            tick-size="2">
            <template slot="thumb-label" slot-scope="props">
              <span>{{props.value + 1}}</span>
            </template>
          </v-slider>
        </v-card-text>
      </v-card>
      <loader :value="onLoading"></loader>
    </v-flex>
    <v-flex xs12 v-if="user.step === 2">
      중간 설문을 마치신 후, 실험 후 설문에도 응답해주세요!
    </v-flex>
    <v-btn block color="primary" @click="nextPolicy">다음</v-btn>
  </v-layout>
</template>
<style scoped>
#goback {
    float: left;
    position: absolute;
}
</style>
<script>
import setTokenMixin from '~/mixins/setToken.js'
import GeneralToolbar from '~/components/GeneralToolbar.vue'
import Loader from '~/components/Loader.vue'

export default {
  components: {
    GeneralToolbar,
    Loader
  },
  methods: {
    goback () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'GoBackFromMiniSurvey',
        eventLabel: `${this.policy.title}`,
        eventValue: 0
      })
      this.$router.go(-1)
    },
    async nextPolicy () {
      // console.log(this.fourth_answer)
      if (this.fourth_answer !== -1) {
        this.onLoading = true
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'FinishMiniSurvey',
          eventLabel: `${this.policy.title}`,
          eventValue: 0
        })
        await this.$axios.$post('/api/minisurvey/', {
          user: this.user.id,
          policy: this.policy.id,
          first_answer: this.first_answer,
          second_answer: this.second_answer,
          third_answer: this.third_answer,
          fourth_answer: this.fourth_answer,
          fifth_answer: this.fifth_answer,
          article1_q1: this.article1_q1,
          article1_q2: this.article1_q2,
          article1_q3: this.article1_q3,
          article2_q1: this.article2_q1,
          article2_q2: this.article2_q2,
          article2_q3: this.article2_q3
        })
        this.$router.push('/ShowPolicies')
        this.onLoading = false
      }
    },
    openFirstArticle () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenFirstArticle',
        eventLabel: `${this.policy.title}`,
        eventValue: 0
      })
      window.open(this.policy.article1_link, '_blank')
      // this.read1 = true
    },
    openSecondArticle () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenSecondArticle',
        eventLabel: `${this.policy.title}`,
        eventValue: 0
      })
      window.open(this.policy.article2_link, '_blank')
      // this.read2 = true
    }
  },
  mixins: [setTokenMixin],
  data: function () {
    return {
      numericScales: ['1', '2', '3', '4', '5', '6', '7'],
      confidenceScales: ['매우 적음', '', '보통', '', '매우 확신'],
      first_answer: 0,
      second_answer: 0,
      third_answer: 0,
      fourth_answer: 0,
      fifth_answer: 0,
      article1_q1: 0,
      article1_q2: 0,
      article1_q3: 0,
      article2_q1: 0,
      article2_q2: 0,
      article2_q3: 0,
      onLoading: false
    }
  },
  computed: {
    myStance: function () {
      if (this.fourth_answer === 0) {
        return '찬성'
      } else if (this.fourth_answer === 1) {
        return '반대'
      } else {
        return ''
      }
    },
    user: function () {
      return this.$store.state.user
    },
    policy: function () {
      return this.$store.state.policy
    },
    step: function () {
      if (this.user.step === 1) {
        return '첫'
      } else if (this.user.step === 2) {
        return '두'
      }
    }
  }
}
</script>