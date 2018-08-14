<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <v-form>
        <div>
        빈칸에 들어갈 가장 알맞은 단어를 선택해주세요.<br>
        <p class="body-1 prompt">
          <v-flex xs12>
            <v-card color="grey lighten-4">
              <v-card-text>나는 _______(으)로서 이 정책의 영향을 받는다.</v-card-text>
            </v-card>
          </v-flex>
        </p>
        </div>

        <v-radio-group hide-details v-model="myEffect.stakeholder_group">
          <v-radio v-for="sg in stakeholderGroups" :key="sg.name" :label="sg.name" :value="sg.id"></v-radio>
          <v-radio label='기타' :value='-1'></v-radio>
        </v-radio-group>

        <template v-if="myEffect.stakeholder_group == -1">
          <v-text-field
            v-validate="'required'"
            v-model="myEffect.stakeholder_custom"            
            :error-messages="errors.collect('asx')"
            name="stakeholder_custom"            
            placeholder="그럼 직접 적어주세요!">
          </v-text-field>
        </template>

        <template v-if="myEffect.stakeholder_group > 0 || myEffect.stakeholder_custom != ''">
          <p class="body-1 prompt">
          <strong>{{findStakeholderName(myEffect.stakeholder_group)}}</strong>이셨군요!<br>
          </p>
          <p class="question">
          혹시 조금만 더 자세히 설명해주시겠어요? 예를 들면, <strong>'선생님'</strong>보다는 <strong>'초등학교 5학년 담임선생님'</strong>처럼 
          장소, 직장, 연령 등을 고려하여 더 구체적으로 적어주세요.
          </p>
          <v-text-field
          v-validate="'required'"
          v-model="myEffect.stakeholder_detail"
          :error-messages="errors.collect('asx')"       
          name="stakeholder_detail" />

        <p class="body-1 prompt question">
          <strong>{{findStakeholderName(myEffect.stakeholder_group)}}</strong>으로서 이 정책이 실현된다면 어떤 영향을 받으시나요?
        </p>
        
        <v-textarea box auto-grow v-model="myEffect.description"/>

        <div>
          <p class="body-1 prompt question">이 영향은 나에게 긍정적인가요? 부정적인가요? </p>
          <template v-if="myEffect.isBenefit==0">
            <v-btn dark color="primary" class="binarybtn"> 긍정적 </v-btn>
            <v-btn outline color="error" class="binarybtn" @click="myEffect.isBenefit=!myEffect.isBenefit"> 부정적 </v-btn>
          </template>
          <template v-else>
            <v-btn outline color="primary" class="binarybtn" @click="myEffect.isBenefit=!myEffect.isBenefit"> 긍정적 </v-btn>
            <v-btn dark color="error" class="binarybtn"> 부정적 </v-btn>
          </template>
        </div>
        </template>
        
        <br>
        
        <v-btn block color="primary" @click="addEffect">다음</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  // asyncData: async function ({app, store}) {
  //   let stakeholderGroups = await app.$axios.$get('/api/stakeholdergroups/', {
  //     params: {
  //       policy: store.state.policyIdx
  //     }
  //   })
  //   return {stakeholderGroups: stakeholderGroups.results}
  // },
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policies[0]
    },
    stakeholderGroups: function () {
      return this.$store.state.stakeholderGroups
    }
  },
  data: function () {
    return {
      // TODO: Adjust effect according to the data model
      myEffect: {
        isBenefit: 0,
        stakeholder_detail: '',
        stakeholder_group: '0',
        stakeholder_custom: '',
        description: '',
        empathy: 0,
        novelty: 0,
        source: 'stakeholder'
      },
      etc: '',
      dictionary: {
        attributes: {
          asx: '이 '
          // custom attributes
        }
      }
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },
  methods: {
    submit: function () {
      this.$validator.validateAll()
    },
    addEffect: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.myEffect.policy = this.$store.state.policyIdx
          this.$store.commit('setMyEffect', this.myEffect)
          this.$axios.$post('/api/effects/', this.myEffect)
          this.$ga.event({
            eventCategory: 'StateAsStakeholder',
            eventAction: 'AddEffect',
            eventLabel: this.myEffect.stakeholder_detail,
            eventValue: 0
          })
          this.$router.push('GuessEffectRandom')
        }
      }
      )
    },
    findStakeholderName: function (id) {
      if (id === 0) {
        return ''
      } else if (id === -1) {
        return this.myEffect.stakeholder_custom
      }
      for (let sg of this.stakeholderGroups) {
        if (sg.id === id) {
          return sg.name
        }
      }
    }
  }
}
</script>
<style scoped>
.score__btn {
  display: inline-block;
  min-width: 0;
}

.binary__btn{
    width:50%;
    left:25%;
}

.input-group.input-group--dirty.radio-group.radio-group--column {
  padding: 0;
}

.input-group.input-group--text-field.input-group--single-line.primary--text {
  padding: 0;
}

.question {
  margin-top: 5px;
  margin-bottom: 0;
  text-align: left;
}
</style>
