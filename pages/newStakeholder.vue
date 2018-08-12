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
      v-model="predictedEffect.stakeholder_detail"
      :error-messages="errors.collect('email')"       
      name="stakeholder_detail"
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
        <template v-if="predictedEffect.isBenefit==0">
          <v-btn dark color="primary" class="binarybtn"> 긍정적 </v-btn>
          <v-btn outline color="error" class="binarybtn" @click="predictedEffect.isBenefit=!predictedEffect.isBenefit"> 부정적 </v-btn>
        </template>
        <template v-else>
          <v-btn outline color="primary" class="binarybtn" @click="predictedEffect.isBenefit=!predictedEffect.isBenefit"> 긍정적 </v-btn>
          <v-btn dark color="error" class="binarybtn"> 부정적 </v-btn>
        </template>
      </div>

      <p class="question"> 왜 그렇게 생각하셨는지 간단히 써 주세요.</p>
      <v-text-field
      v-validate="'required'"
      v-model="predictedEffect.source"
      :error-messages="errors.collect('email')"       
      name="stakeholder_detail"/>
      <br>
      <p class="body-1 prompt" style="color:red;"> (주의) 입력한 내용이 곧바로 반영되지 않습니다! </p>
      <v-btn block dark color="primary" @click="goBack">돌아가기</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  // Guess effect to the stakeholder given by the system
  // fetch: function ({app, store}) {
  //   // let effectsLength = store.state.effects.length
  //   // let randomNumber = Math.floor(Math.random() * effectsLength)
  //   // let randomEffect = store.state.effects[randomNumber]
  //   // store.commit('setRandomEffect', randomEffect)
  //   // return {randomEffect: randomEffect}
  //   let stakeholderLength = store.state.stakeholderGroups.lehgth
  //   let randomNumber = Math.floor(Math.random() * stakeholderLength)
  //   let randomStakeholderGroup = store.state.stakeholderGroups[randomNumber]
  //   store.commit('setRandomStakeholderGroup')
  // },
  mounted: function () {
    this.$store.commit('setRandomStakeholderGroup')
  },
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          // this.myEffect.policy = this.$store.state.policyIdx
          // this.$store.commit('setMyEffect', this.myEffect)
          // this.$axios.$post('/api/effects/', this.myEffect)
          // TODO: record user activity
          this.$router.push('SelectStakeholder')
        }
      }
      )
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
        stakeholder_group: '0',
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
