<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          새로운 이해당사자를 알려주세요!
        </v-card-text>
      </v-card>
      
      <p class="body-1 prompt question">
        정책의 영향을 받지만, 어디에도 속하지 않는 사람이 있었다구요?
        저희에게만 살짝 두 단계로 알려주세요!
        예를 들어, 그 사람이 '선생님'이라면 [대분류: '공무원', 소분류: '선생님']처럼 두 단계로 나누어 써주세요.
      </p>
      <v-text-field
      v-validate="'required'"
      v-model="stakeholder_custom"
      :error-messages="errors.collect('email')"       
      name="stakeholder_custom"
      placeholder="대분류"/>

      <v-text-field
      v-validate="'required'"
      v-model="predictedEffect.stakeholder_detail"
      :error-messages="errors.collect('email')"       
      name="stakeholder_detail"
      placeholder="소분류" />
      <!-- Check if it really is not included in any group -->

      <p class="question">그럼 그 사람은 이 정책으로 어떤 영향을 받게 될까요?</p>
      <v-textarea box auto-grow v-model="predictedEffect.description"/>

      <div>
        <p class="body-1 prompt question">이 영향은 그 사람에게 긍정적인가요? 부정적인가요? </p>
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

      <p class="question"> 위 빈칸에 '영향'을 쓰실 때 가장 큰 영향을 끼친 사람/상황 등이 있다면 간단히 적어주세요.<br>(예. 언론기사, 지인 등)</p>
      <v-text-field
      v-validate="'required'"
      v-model="predictedEffect.source"
      :error-messages="errors.collect('email')"       
      name="stakeholder_detail"/>
      <br>
      <p class="body-1 prompt" style="color:red;"> (주의) 입력한 내용이 곧바로 반영되지 않습니다! </p>
      
      <p v-if="!allFilled" style="color:red;">모든 빈칸을 채워넣어야 다음으로 넘어갈 수 있습니다.</p>
      <v-btn v-if="!allFilled" disabled> 추가하기 </v-btn>
      <v-btn v-else dark color="primary" @click="onAddNewStakeholderButtonClick">추가하기</v-btn>   
      <v-btn dark color="secondary" @click="goBack">돌아가기</v-btn>
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
      return this.$store.state.policy
    },
    randomStakeholderGroup: function () {
      return this.$store.getters.randomStakeholderGroup
    },
    stakeholderGroups: function () {
      return this.$store.state.stakeholderGroups
    },
    userPolicy: function () {
      return this.$store.state.userPolicy
    },
    allFilled: function () {
      return (this.stakeholder_custom !== '' && this.predictedEffect.description !== '' &&
      this.predictedEffect.stakeholder_detail !== '' && this.predictedEffect.isBenefit !== -1 &&
      this.predictedEffect.source !== '')
    }
  },
  methods: {
    goBack: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'GoBackToStakeholderList',
        eventLabel: `${this.policy.title}`,
        eventValue: 0
      })
      this.$router.push('/SelectStakeholder')
    },
    onAddNewStakeholderButtonClick: async function () {
      const result = await this.$validator.validateAll()
      if (!result) {
        return
      }
      const newStakeholder = await this.$axios.$post('/api/stakeholdergroups/', {
        policy: this.$store.state.policyIdx,
        is_visible: false,
        name: this.stakeholder_custom
      })
      this.predictedEffect.policy = this.$store.state.policyIdx
      this.predictedEffect.stakeholder_group = newStakeholder.id
      await this.$axios.$post('/api/effects/', this.predictedEffect)
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'AddNewStakeholder',
        eventLabel: ``,
        eventValue: 0
      })
      this.$router.push('/SelectStakeholder')
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
      stakeholder_custom: '',
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
