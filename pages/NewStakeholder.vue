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
        예를 들어, 그 사람이 '선생님'이라면 소분류에는 '선생님'을, 대분류에는 '공무원'을 쓰시면 됩니다.
      </p>
      <v-text-field
      v-validate="'required'"
      v-model="predictedEffect.stakeholder_custom"
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

      <p class="question"> 왜 그렇게 생각하셨는지 간단히 써 주세요.</p>
      <v-text-field
      v-validate="'required'"
      v-model="predictedEffect.source"
      :error-messages="errors.collect('email')"       
      name="stakeholder_detail"/>
      <br>
      <p class="body-1 prompt" style="color:red;"> (주의) 입력한 내용이 곧바로 반영되지 않습니다! </p>
      <v-btn block dark color="primary" @click="onAddNewStakeholderButtonClick">추가하기</v-btn>
      <v-btn block dark color="secondary" @click="goBack">돌아가기</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  components: {
    PromisePane
  },
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
    }
  },
  methods: {
    goBack: function () {
      this.$router.push('SelectStakeholder')
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
      this.predictedEffect.stakeholder_group = newStakeholder.id
      await this.$axios.$post('/api/effects/', this.predictedEffect)
      this.$router.push('SelectStakeholder')
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
        isBenefit: '',
        stakeholder_detail: '',
        stakeholder_group: 0,
        description: '',
        empathy: 0,
        novelty: 0,
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
