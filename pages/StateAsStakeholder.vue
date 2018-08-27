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

      <v-combobox
        :value="selectedTags"
        :items="tags"
        item-text="name"
        item-value="name"
        label="선택해주세요"
        :search-input.sync="search"
        :filter="filter"
        multiple
        chips
        @input="onInput">

        <template slot="no-data">
          <v-list-tile>
            <v-list-tile-content>
              <v-chip color="blue lighten-3" label small>{{hangulSearch}}</v-chip> 새로 만드시려면 엔터 키를 눌러주세요.
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template slot="item" slot-scope="{index, item, parent}">
          <v-chip color="blue lighten-3" label small>{{item.name}}</v-chip>
          <v-spacer></v-spacer>
          {{item.refs}}개
        </template>
      </v-combobox>
      <!-- <v-combobox
        v-model="model"
        :filter="filter"
        :hide-no-data="!search"
        :items="tags"
        item-text="name"
        item-value="name"
        :search-input.sync="search"
        hide-selected
        label="태그를 검색하세요"
        multiple
        small-chips
        solo
      >
        <template slot="no-data">
          <v-list-tile>
            <span class="subheading">새로 만들기</span>
            <v-chip
              color="blue lighten-3"
              label
              small
            >
              {{ search }}
            </v-chip>
          </v-list-tile>
        </template>
        <template
          v-if="item === Object(item)"
          slot="selection"
          slot-scope="{ item, parent, selected }"
        >
          <v-chip
            color="blue lighten-3"
            :selected="selected"
            label
            small
          >
            <span class="pr-2">
              {{ item.text }}
            </span>
            <v-icon
              small
              @click="parent.selectItem(item)"
            >close</v-icon>
          </v-chip>
        </template>
        <template
          slot="item"
          slot-scope="{ index, item, parent }"
        >
          <v-list-tile-content>
            <v-text-field
              v-if="editing === item"
              v-model="editing.text"
              autofocus
              flat
              background-color="transparent"
              hide-details
              solo
              @keyup.enter="edit(index, item)"
            ></v-text-field>
            <v-chip
              v-else
              :color="`blue lighten-3`"
              dark
              label
              small
            >
              {{ item.text }}
            </v-chip>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-list-tile-action @click.stop>
            <v-btn
              icon
              @click.stop.prevent="edit(index, item)"
            >
              <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
            </v-btn>
          </v-list-tile-action>
        </template>
      </v-combobox> -->















        <!-- <template v-if="myEffect.stakeholder_group == -1">
          <v-text-field
            v-validate="'required'"
            v-model="myEffect.stakeholder_custom"            
            :error-messages="errors.collect('asx')"
            name="stakeholder_custom"            
            placeholder="그럼 직접 적어주세요!">
          </v-text-field>
        </template> -->

        <template v-if="myEffect.stakeholder_group > 0 || myEffect.stakeholder_custom != ''">
          <!-- <p class="body-1 prompt">
          <strong>{{findStakeholderName(myEffect.stakeholder_group)}}</strong>(이)셨군요!<br>
          </p> -->
          <p class="question">
          혹시 본인에 대해 조금만 더 자세히 설명해주시겠어요? 예를 들면, <strong>'선생님'</strong>보다는 <strong>'초등학교 5학년 담임선생님'</strong>처럼 
          장소, 직장, 연령 등을 고려하여 더 구체적으로 적어주세요.
          </p>
          <v-text-field
          v-validate="'required'"
          v-model="myEffect.stakeholder_detail"
          :error-messages="errors.collect('asx')"       
          name="stakeholder_detail" />

        <p class="body-1 prompt question">
          <strong>{{myEffect.stakeholder_detail}}</strong>(으)로서 이 정책이 실현된다면 어떤 영향을 받으시나요?
        </p>
        
        <v-textarea box auto-grow v-model="myEffect.description"/>

        <div>
          <p class="body-1 prompt question">이 영향은 나에게 긍정적인가요? 부정적인가요? </p>
            <v-btn :outline="myEffect.isBenefit !== 1" :dark="myEffect.isBenefit === 1" color="primary" class="binarybtn" @click="myEffect.isBenefit=1"> 긍정적 </v-btn>
            <v-btn :outline="myEffect.isBenefit !== 0" :dark="myEffect.isBenefit === 0" color="error" class="binarybtn" @click="myEffect.isBenefit=0"> 부정적 </v-btn>

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
import _ from 'lodash'
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
      if (this.myEffect.stakeholder_group === -1) {
        return (this.myEffect.description !== '' && this.myEffect.isBenefit !== -1 &&
        this.myEffect.stakeholder_detail !== '')
      }
      return (this.myEffect.description !== '' && this.myEffect.isBenefit !== -1 &&
      this.myEffect.stakeholder_detail !== '' && this.selectedTags.length >= 2)
    },
    tags: function () {
      return this.$store.state.tags
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
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      index: -1,
      items: [
        { header: '태그를 선택하거나 새로 만들어주세요' },
        { text: 'Foo' },
        { text: 'Bar' }
      ],
      menu: false,
      x: 0,
      search: null,
      y: 0
      // hangulSearch: ''
    }
  },
  // watch: {
  //   search (val, prev) {
  //     this.hangulSearch = this.numToHangul(this.search)
  //   }
  // },
  // watch: {
  //   select (val, prev) {
  //     if (val.length === prev.length) return

  //     this.select = val.map(v => {
  //       if (typeof v === 'string') {
  //         v = {
  //           text: v
  //         }
  //         this.items.push(v)
  //       }

  //       return v
  //     })
  //   }
  // },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
    this.debouncedNumToHangul = _.debounce(this.numToHangul, 500)
  },
  methods: {
    // addNewStakeholder: async function () {
    //   if (this.stakeholder_custom && this.stakeholder_custom.length > 0) {
    //     const newStakeholder = await this.$axios.$post('/api/stakeholdergroups/', {
    //       policy: this.$store.state.policyId,
    //       is_visible: false,
    //       name: this.myEffect.stakeholder_custom
    //     })
    //     this.myEffect.stakeholder_group = newStakeholder.id
    //   }
    // },
    numToHangul: function (search) {
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
      this.myEffect.tags = this.selectedTags.map((x) => { return x.name })
      if (result) {
        // await this.addNewStakeholder()
        this.myEffect.policy = this.$store.state.policyId
        this.$store.commit('setMyEffect', this.myEffect)
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
    // edit (index, item) {
    //   if (!this.editing) {
    //     this.editing = item
    //     this.index = index
    //   } else {
    //     this.editing = null
    //     this.index = -1
    //   }
    // },
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
