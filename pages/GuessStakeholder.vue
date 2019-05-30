<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12 sm12 class="question__box">
      <span class="question">
        <span style="font-weight: bold">{{policy.title}} </span>정책에 영향을 받는 사람은 어떤 사람일까요?
        <br>
        생각나시는 대로 아래에 적어보시고, 수집된 데이터와 비교해보세요!
      </span>
    </v-flex>
    <v-flex xl8 lg10>
      <v-text-field 
        v-if="!alreadyGuessed"
        clearable 
        v-model="tag" 
        append-outer-icon="add" 
        @click:append-outer="onAddTagGuess" 
        @keyup.enter="onAddTagGuess"
        :label="`${policy.title} 정책에 영향을 받을 것 같은 사람을 편하게 적어주세요!`" />
      <span v-else>처음에 생각하셨던 정책에 영향을 받는 사람들입니다!</span>
    </v-flex>
    <v-flex xl8 lg10>
      <v-card>
        <v-card-text>
          <!-- <template v-if="guessedItems.length === 0">
            <span style="font-weight: bold">{{policy.title}} </span>정책에 영향을 받는 사람을 적어주세요!
          </template> -->
          <template v-if="!alreadyGuessed">
            <v-chip 
              v-for="(tag, idx) in guessedItems" 
              close 
              :key="tag"
              style="cursor: pointer;"
              @input="onGuessedTagClick($event, idx)">
              #{{tag}}
            </v-chip>
          </template>
          <template v-else>
            <v-chip 
              v-for="tag in alreadyGuessedItems"
              :key="tag"
              >
              #{{tag}}
            </v-chip>
          </template>
        </v-card-text>
      </v-card>
    </v-flex>
    <!-- <v-flex xl6 lg10>
      <v-layout row wrap justify-space-between align-center>
        <v-flex xs3 v-for="(item, idx) in guessedItems" :key="`guess${idx}`">
          <guess-stakeholder-item
            :guessedItem="item"
            :seeAnswer="seeAnswer"
            @tag-see-more="onTagSeeMore"
            ></guess-stakeholder-item>
        </v-flex>
        <v-flex xs3 v-if="guessedItems.length < 3">
          <v-btn icon @click="addNewGuessedItem">
            <v-icon>
              add
            </v-icon>
          </v-btn>
          <br>
          <span @click="addNewGuessedItem" style="cursor: pointer;">
            또 누가 있을까요?
          </span>
        </v-flex>
      </v-layout>
    </v-flex> -->
    <template v-if="alreadyGuessed">
      <v-flex xs12>
        <v-divider/>
      </v-flex>
      <v-flex xl8 lg10>
        이 정책과 관련해 기사에서 자주 등장한 사람들입니다.
      </v-flex>
      <v-flex xl8 lg10>
        <span v-for="tag in importantTags"
          :key="tag"
          class="important--tags"
          @click="onTagSeeMore(tag)"
          >
          #{{tag}}
        </span>
        <!-- <v-layout row wrap justify-space-between align-center>
          <v-flex xs3 v-for="tag in importantTags" :key="tag.tag">
            <stakeholder-item
              :tag="tag"
              @tag-see-more="onTagSeeMore"
              >
            </stakeholder-item>
          </v-flex>
        </v-layout> -->
      </v-flex>
      <br>
      <v-flex xs12>
        <v-divider/>
      </v-flex>
      <v-flex xl8 lg10>
        사람들이 이 정책과 관련 있다고 적어준 집단들입니다. 
        <br>
        가장 찬성할 것 같은 집단을 선택해보세요!
      </v-flex>
      <v-flex xl8 lg10>
        <tag-cloud
          :tags="tags"
          @keyword-selected="onTagSeeMore">
        </tag-cloud>
      </v-flex>
    </template>
    <v-flex xs12 v-if="!alreadyGuessed">
      <v-btn color="primary" @click="onVerifyClick">영향을 받는 사람들 확인하기</v-btn>
    </v-flex>
    <v-flex xs12 v-if="error">
      <span class="red--text">집단 하나는 적어주세요!</span>
    </v-flex>
    
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
import TagPane from '~/components/TagPane.vue'
import StakeholderItem from '~/components/StakeholderItem.vue'
import TagCloud from '~/components/TagCloud.vue'
export default {
  components: {
    PromisePane,
    TagPane,
    StakeholderItem,
    TagCloud
  },
  fetch: async function ({app, store, params}) {
    await store.dispatch('setTags')
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    tags: function () {
      return this.$store.state.tags
    },
    tagTxts: function () {
      return this.tags.map(function (t) {
        return t.tag
      })
    },
    isGuessedItemsValid: function () {
      return this.guessedItems.reduce((prevValue, curItem) => {
        return prevValue && (!!curItem.tag) && (curItem.isBenefit !== -1)
      }, true)
    },
    importantTags: function () {
      return this.policy.key_stakeholders
      // return this.tags.filter(t => {
      //   return this.policy.key_stakeholders.includes(t.tag)
      // })
    },
    alreadyGuessed: function () {
      return this.$store.state.guessedItems.length > 0
    },
    alreadyGuessedItems: function () {
      return this.$store.state.guessedItems
    }
  },
  data: function () {
    return {
      // tags: [],
      tag: '',
      seeAnswer: false,
      guessedItems: [
      ],
      error: false
    }
  },
  methods: {
    onClickNextButton: function () {
      this.$store.dispatch()
      this.$router.push('/TagOverview')
    },
    onAddTagGuess: function () {
      if (this.tag.length > 0) {
        this.guessedItems.push(this.tag)
        this.tag = ''
      }
    },
    onVerifyClick: function () {
      if (this.guessedItems.length > 0) {
        this.error = false
        this.$store.commit('setGuessedItems', this.guessedItems)
        this.seeAnswer = true
      } else {
        this.error = true
      }
    },
    onTagSeeMore: async function (selectedTag) {
      const tag = this.tags.find((t) => {
        return t.tag === selectedTag
      })
      this.$store.dispatch('setTagHigh', {tag: tag}).then(() => {
        this.$router.push('/GuessEffects')
      })
    },
    addNewGuessedItem: function () {
      this.guessedItems.push({
        tag: '',
        isBenefit: -1
      })
    },
    // onUpdateSelectedTagHigh: async function (t) {
    //   const tag = this.tags.find(tt => {
    //     return tt.tag === t.tag
    //   })
    //   await this.$store.dispatch('setTagHigh', {tag: tag})
    //   this.$router.push('/GuessEffects')
    // },
    onGuessedTagClick: function ($event, idx) {
      if ($event === false) {
        this.guessedItems.splice(idx, 1)
      }
    }
  }
}
</script>

<style scoped>
.question {
  font-size: 1.1em;
}

.question__box {
  margin-top: 1em;
  margin-bottom: 1em;
}

.important--tags {
  font-size: 3em;
  font-family: 'sans-serif';
  cursor: pointer;
}
</style>
