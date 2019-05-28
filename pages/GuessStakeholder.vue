<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12 sm12 class="question__box">
      <span class="question">
        이 정책에 영향을 받는 사람은 누구일까요?
        <br>
        생각나시는 대로 아래에 적어보시고, 수집된 데이터와 비교해보세요!
      </span>
      <!-- <v-text-field clearable v-model="tag" append-outer-icon="add" @click:append-outer="onAddTagGuess" @keyup.enter="onAddTagGuess" /> -->
      <!-- <v-flex>
        <v-card>
          <v-card-text>
            <template v-if="tags.length === 0">
              이해관계자를 적어주세요!
            </template>
            <v-chip v-for="tag in tags" close :key="tag">
              {{tag}}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-flex> -->
    </v-flex>
    <v-flex xl6 lg10>
      <v-layout row wrap justify-space-between>
        <v-flex xs3 v-for="i in 3" :key="i">
          <guess-stakeholder-item
            :seeAnswer="seeAnswer"
            @tag-see-more="onTagSeeMore"
            ></guess-stakeholder-item>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-btn @click="seeAnswer = true">이해관계자 확인하기</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
import GuessStakeholderItem from '~/components/GuessStakeholderItem.vue'
export default {
  components: {
    PromisePane,
    GuessStakeholderItem
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
    }
  },
  data: function () {
    return {
      // tags: [],
      tag: '',
      seeAnswer: false
    }
  },
  methods: {
    onClickNextButton: function () {
      this.$store.dispatch()
      this.$router.push('/TagOverview')
    },
    onAddTagGuess: function () {
      if (this.tag.length > 0) {
        this.selectedTags.push(this.tag)
        this.tag = ''
      }
    },
    onTagSeeMore: async function (selectedTag) {
      const tag = this.tags.find((t) => {
        return t.tag === selectedTag
      })
      await this.$store.dispatch('setTagHigh', {tag: tag})
      this.$router.push('/GuessEffects')
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
</style>
