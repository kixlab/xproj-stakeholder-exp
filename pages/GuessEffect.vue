<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          다른 사람의 입장에서<br>정책을 이해해보세요!
        </v-card-text>
      </v-card>
      
      <v-dialog
        v-model="dialog"
        width="500"
      >
      <v-btn slot="activator" color="blue-grey" dark block>이해당사자 고르기</v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          어떤 사람의 입장이 되어보시겠어요?
        </v-card-title>

        <v-card-text>
          <v-radio-group hide-details v-model="predictedEffect.stakeholder_group">
            <template v-for="sg in stakeholderGroups" v-if="sg.id != userPolicy.stakeholder">
              <v-radio :key="sg.name" :label="sg.name" :value="sg.id"></v-radio> 
              <!--@click="onStakeholderGroupClick(sg)-->
            </template>
          </v-radio-group>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            선택!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


      <template v-if="predictedEffect.stakeholder_group != 0">
      <v-divider/>
      <p class="body-1 prompt head">좋습니다! <strong>{{findStakeholderName(predictedEffect.stakeholder_group)}}</strong>의 입장에서 생각해주세요!</p>
      <br>
      <p class="question">
      우선 소설 속 주인공처럼 한 사람을 자세히 머릿 속에 그려보세요!
      예를 들면, <strong>'선생님'</strong>보다는 <strong>'초등학교 5학년 담임선생님'</strong>처럼 
      장소, 직장, 연령 등을 고려하여 더 구체적으로요.<br>
      그럼 여러분만의 주인공을 간단히 설명해주시겠어요?
      </p>
      <v-text-field
      v-validate="'required'"
      v-model="predictedEffect.stakeholder_detail"
      :error-messages="errors.collect('email')"       
      name="stakeholder_detail"
      placeholder="여기에 설명해주세요!" />
      
      <p class="question">그럼 그 인물은 이 정책으로 어떤 영향을 받게 될까요?</p>
      <v-textarea box auto-grow v-model="predictedEffect.description"/>

      <div>
        <p class="body-1 prompt question">이 영향은 그 인물에게 긍정적인가요? 부정적인가요? </p>
        <v-btn 
        :outline="predictedEffect.isBenefit !== 0" 
        :dark="predictedEffect.isBenefit == 0"
        color="primary"
        class="binarybtn"
        @click="predictedEffect.isBenefit=0">
        긍정적 </v-btn>
        <v-btn 
        :outline="predictedEffect.isBenefit !== 1" 
        :dark="predictedEffect.isBenefit == 1"
        color="error" 
        class="binarybtn" 
        @click="predictedEffect.isBenefit=1"> 
        부정적 </v-btn>
      </div>

      <p class="question"> 왜 그렇게 생각하셨는지 간단히 써 주세요.</p>
      <v-text-field
      v-validate="'required'"
      v-model="predictedEffect.source"
      :error-messages="errors.collect('email')"       
      name="stakeholder_detail"/>
      <v-btn block dark color="primary" @click="onNextClick">다음</v-btn>

      </template>
      

    </v-flex>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
import setTokenMixin from '~/mixins/setToken.js'

export default {
  components: {
    PromisePane
  },
  mixins: [setTokenMixin],
  computed: {
    policy: function () {
      return this.$store.state.policies[this.$store.state.policyIdx - 1]
    },
    randomStakeholderGroup: function () {
      return this.$store.getters.randomStakeholderGroup
    },
    stakeholderGroups: function () {
      return this.$store.state.stakeholderGroups
    },
    userPolicy: function () {
      return this.$store.state.userPolicy
    }
  },
  methods: {
    onStakeholderGroupClick: function (sg) {
      this.$ga.event({
        eventCategory: '/GuessEffect',
        eventAction: 'SelectStakeholderGroup',
        eventLabel: sg.name,
        eventValue: 0
      })
    },
    onNextClick: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('setStakeholderGroupIdx', this.predictedEffect.stakeholder_group)
          this.predictedEffect.policy = this.$store.state.policyIdx
          this.$axios.$post('/api/effects/', this.predictedEffect)
          // TODO: record user activity
          this.$ga.event({
            eventCategory: '/GuessEffect',
            eventAction: 'SubmitGuess',
            eventLabel: this.randomStakeholderGroup.name,
            eventValue: 0
          })
          this.$store.dispatch('incrementUserPolicyStakeholdersAnswered')
          this.$router.push('VerifyEffect')
        }
      })
    },
    findStakeholderName: function (id) {
      if (id === 0) {
        return ''
      }
      for (let sg of this.stakeholderGroups) {
        if (sg.id === id) {
          return sg.name
        }
      }
    }
  },
  data: function () {
    return {
      predictedEffect: {
        isBenefit: 0,
        stakeholder_detail: '',
        stakeholder_group: 0,
        description: '',
        source: ''
      },
      dialog: false
    }
  }
}
</script>

<style scoped>
.v-card__text {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
}

.question {
  margin-top: 5px;
  margin-bottom: 0;
  text-align: left;
}
.head {
  margin-top: 10px;
  margin-bottom: 0;
}
</style>
