<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
        이 정책으로 인해 {{effectSize}} 영향을 받으시는군요!<br>
        어떻게 영향을 받으시는지 자세히 알려주세요.
        </v-card-text>
      </v-card>
      
      <v-form>

        <p class="question">
          먼저, 본인에 대해 조금만 더 자세히 설명해주시겠어요? 예를 들면, <strong>'선생님'</strong>보다는 <strong>'초등학교 5학년 담임선생님'</strong>처럼 
          장소, 직장, 연령 등을 고려하여 구체적으로 적어주세요.
        </p>
        <v-text-field
          v-validate="'required'"
          v-model="myEffect.stakeholder_detail"
          :error-messages="errors.collect('asx')"       
          name="stakeholder_detail" />

        <div>
          <p class="question">
            쓰신 설명 중, 이 정책과 관련있는 사용자님의 특징을 태그로 달아주세요.<br>
            예를 들면, "건강보험 보장성 강화" 정책의 영향을 받는 "임플란트 전문 치과의사"이시라면, "의료인", "치과의사", "임플란트 전문 치과의사" 처럼 적어주시면 됩니다. <br>
            최소 <strong style="color:red;">2개</strong>의 태그를 사용해주세요.<br>
          </p>
          <!-- <p class="body-1 prompt">
            <v-flex xs12>
              <v-card color="grey lighten-4">
                <v-card-text>나는 _______(으)로서 이 정책의 영향을 받는다.</v-card-text>
              </v-card>
            </v-flex>
          </p> -->
        </div>

      <v-combobox
        :value="selectedTags"
        :items="tags"
        item-text="name"
        item-value="name"
        label="태그를 적어주세요"
        :search-input.sync="search"
        :filter="filter"
        multiple
        hide-selected
        chips
        :rules="[validateInput]"
        textarea
        validate-on-blur
        @input="onInput">

        <template slot="no-data">
          <v-list-tile>
            <v-list-tile-content>
              <v-chip color="blue lighten-3" label small>{{hangulSearch}}</v-chip> 엔터키를 누르면 추가됩니다.
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template slot="item" slot-scope="{ index, item, parent }">
          <v-chip color="blue lighten-3" label small>{{item.name}}</v-chip>
          <v-spacer></v-spacer>
          {{item.refs}}개
        </template>
        <template slot="selection" slot-scope="{ item, parent, selected }">
          <v-chip :selected="selected" label small>
            <span class="pr-2"> {{item}} </span>
            <v-icon small @click="parent.selectItem(item)">close</v-icon>
          </v-chip>
        </template>
      </v-combobox>

        <template v-if="selectedTags.length >= 2">

        <p class="body-1 prompt question">
          <!-- <v-chip v-for="tag in selectedTags" :key="tag">
            {{tag}}
          </v-chip> -->
          {{myEffect.stakeholder_detail}}
          (으)로서 이 정책이 실현된다면 어떤 영향을 받으시나요?
        </p>
        
        <v-textarea box auto-grow v-model="myEffect.description"/>

        <div>
          <p class="body-1 prompt question">이 영향은 나에게 긍정적인가요? 부정적인가요? </p>
            <v-btn 
              :outline="myEffect.isBenefit !== 1" 
              :dark="myEffect.isBenefit === 1" 
              color="primary" 
              class="binarybtn"
              @click="myEffect.isBenefit=1"> 긍정적 </v-btn>
            <v-btn 
              :outline="myEffect.isBenefit !== 0" 
              :dark="myEffect.isBenefit === 0" 
              color="error" 
              class="binarybtn" 
              @click="myEffect.isBenefit=0"> 부정적 </v-btn>

        </div>
        </template>
        
        <br>
        
      <p v-if="!allFilled" style="color:red;">모든 빈칸을 채워넣어야 다음으로 넘어갈 수 있습니다.</p>
      <v-btn v-if="!allFilled" disabled block> 다음 </v-btn>
      <v-btn v-else dark block color="primary" @click="addEffect">다음</v-btn>    
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
// import _ from 'lodash'
import PromisePane from '~/components/PromisePane.vue'
import setTokenMixin from '~/mixins/setToken.js'
import hangulSearchMixin from '~/mixins/hangulSearch.js'
export default {
  // asyncData: async function ({app, store}) {
  //   let stakeholderGroups = await app.$axios.$get('/api/stakeholdergroups/', {
  //     params: {
  //       policy: store.state.policyId
  //     }
  //   })
  //   return {stakeholderGroups: stakeholderGroups.results}
  // },
  components: {
    PromisePane
  },
  mixins: [setTokenMixin, hangulSearchMixin],
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    allFilled: function () {
      return (this.myEffect.description.length >= 10 && this.myEffect.isBenefit !== -1 && this.selectedTags.length >= 2)
    },
    tags: function () {
      return this.$store.state.tags
    },
    effectSize: function () {
      switch (this.$store.state.userPolicy.effect_size) {
        case 2: {
          return '조금의'
        }
        case 3: {
          return '적당히'
        }
        case 4: {
          return '많은'
        }
      }
      console.log('ERROR')
    }
  },
  data: function () {
    return {
      // TODO: Adjust effect according to the data model
      myEffect: {
        isBenefit: -1,
        stakeholder_detail: '',
        stakeholder_group: 1, // TODO: remove
        tags: [],
        description: '',
        empathy: 0,
        novelty: 0,
        source: 'stakeholder'
      },
      etc: '',
      selectedTags: [],
      activator: null,
      attach: null,
      editing: null,
      index: -1,
      menu: false,
      x: 0,
      search: null,
      y: 0
      // hangulSearch: ''
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },
  methods: {
    numToHangul: function (search) {
      if (search.name) {
        return search.name
      }
      const arrNumberWord = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
      // 10,  100,  100 자리수 한글 표시
      const arrDigitWord = ['', '십', '백', '천']
      // 만단위 한글 표시
      const arrManWord = ['', '만', '억', '조']
      // Copyright 취생몽사(http://bemeal2.tistory.com)

      // 소스는 자유롭게 사용가능합니다. Copyright 는 삭제하지 마세요.
      const numStrs = search.match(/\d+/g)
      console.log(numStrs)
      let newSearchString = search.repeat(1)
      if (!numStrs) {
        return search
      }
      numStrs.forEach((numStr) => {
        console.log(numStr)
        let hanValue = ''
        let manCount = 0 // 만단위 0이 아닌 금액 카운트.
        const numLength = numStr.length
        for (let i = 0; i < numLength; i++) {
          // 1단위의 문자로 표시.. (0은 제외)
          let strTextWord = arrNumberWord[numStr.charAt(i)]
          console.log(strTextWord)
          // 0이 아닌경우만,  십/백/천 표시
          if (strTextWord !== '') {
            manCount++
            strTextWord += arrDigitWord[(numLength - (i + 1)) % 4]
          }
          // 만단위마다 표시 (0인경우에도 만단위는 표시한다)
          if (manCount !== 0 && (numLength - (i + 1)) % 4 === 0) {
            manCount = 0
            strTextWord = strTextWord + arrManWord[(numLength - (i + 1)) / 4]
          }
          hanValue += strTextWord
        }

        newSearchString = newSearchString.replace(numStr, hanValue)
      })
      // 출처: http://bemeal2.tistory.com/67 [취생몽사]
      return newSearchString
    },
    onInput (ev) {
      console.log(ev)
      this.selectedTags = ev.map(this.numToHangul)
    },
    addEffect: async function () {
      const result = await this.$validator.validateAll()
      this.myEffect.tags = this.selectedTags
      if (result) {
        // await this.addNewStakeholder()
        this.myEffect.policy = this.$store.state.policyId
        this.$axios.$post('/api/effects/', this.myEffect)
        this.$ga.event({
          eventCategory: '/StateAsStakeholder',
          eventAction: 'AddEffect',
          eventLabel: this.myEffect.stakeholder_detail,
          eventValue: 0
        })
        this.$store.dispatch('incrementUserPolicyStakeholdersAnswered')
        this.$router.push('/GuessEffectRandom')
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
