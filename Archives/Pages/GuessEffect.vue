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
            @click="chooseStakeholderGroup"
          >
            선택!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


      <template v-if="predictedEffect.stakeholder_group != 0">
      <v-divider/>
      <p class="body-1 prompt head"><strong>{{findStakeholderName(predictedEffect.stakeholder_group)}}</strong>의 입장에서 생각해주세요!</p>
      <br>
      <p class="question">
      여러분이 <strong>{{findStakeholderName(predictedEffect.stakeholder_group)}}</strong>(이)가 주인공인 소설을 쓰고 있다고 상상해보세요
      여러분이 정한 주인공을 머릿 속에서 <strong>더욱 자세히</strong> 그려보세요.
      예를 들면, <strong>'선생님'</strong>보다는 <strong>'초등학교 5학년 담임선생님'</strong>처럼 
      장소, 직장, 연령 등을 고려해서 더 구체적으로요.<br>
      이제 여러분만의 주인공을 간단히 설명해주시겠어요?
      </p>
      <v-text-field v-model="predictedEffect.stakeholder_detail" placeholder="여기에 설명해주세요!" />

      <p class="question">그럼 그 사람은 이 정책으로 어떤 영향을 받게 될까요?</p>
      <v-textarea box auto-grow v-model="predictedEffect.description"/>

      <div>
        <p class="body-1 prompt question">방금 쓰신 내용은 그 사람에게 긍정적인가요? 부정적인가요? </p>
        <v-btn 
        :outline="predictedEffect.isBenefit !== 1" 
        :dark="predictedEffect.isBenefit == 1"
        color="primary"
        class="binarybtn"
        @click="predictedEffect.isBenefit=1">
        긍정적 </v-btn>
        <v-btn 
        :outline="predictedEffect.isBenefit !== 0" 
        :dark="predictedEffect.isBenefit == 0"
        color="error" 
        class="binarybtn" 
        @click="predictedEffect.isBenefit=0"> 
        부정적 </v-btn>
      </div>

      <p class="question"> 위 빈칸에 '영향'을 쓰실 때 가장 큰 영향을 끼친 사람/상황 등이 있다면 간단히 적어주세요.<br>(예. 언론기사, 지인 등)</p>
      <v-text-field placeholder="여기에 설명해주세요!" v-model="predictedEffect.source"/>
      
      <p v-if="!allFilled" style="color:red;">모든 빈칸을 채워넣어야 다음으로 넘어갈 수 있습니다.</p>
      <v-btn v-if="!allFilled" disabled block> 다음 </v-btn>
      <v-btn v-else dark block color="primary" @click="onNextClick">다음</v-btn>

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
      return this.$store.state.policies[this.$store.state.policyId - 1]
    },
    userPolicy: function () {
      return this.$store.state.userPolicy
    },
    allFilled: function () {
      return (this.predictedEffect.source !== '' && this.predictedEffect.description !== '' &&
      this.predictedEffect.stakeholder_detail !== '' && this.predictedEffect.isBenefit !== -1 &&
      this.predictedEffect.stakeholder_group !== 0)
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
    chooseStakeholderGroup: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'ChooseStakeholderGroupForGuessing',
        eventLabel: `${this.policy.title} / ${this.findStakeholderName(this.predictedEffect.stakeholder_group)}`,
        eventValue: 0
      })
      this.dialog = false
    },
    onNextClick: function () {
      /* this.$validator.validateAll().then((result) => {
        if (result) { */
      this.$store.commit('setStakeholderGroupIdx', this.predictedEffect.stakeholder_group)
      this.predictedEffect.policy = this.$store.state.policyId
      this.$axios.$post('/api/effects/', this.predictedEffect)
      // TODO: record user activity
      this.$ga.event({
        eventCategory: '/GuessEffect',
        eventAction: 'SubmitGuess',
        eventLabel: this.randomStakeholderGroup.name,
        eventValue: 0
      })
      this.$store.dispatch('incrementUserPolicyStakeholdersAnswered')
      this.$router.push('/VerifyEffect')
      //   }
      // })
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
        isBenefit: -1,
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
