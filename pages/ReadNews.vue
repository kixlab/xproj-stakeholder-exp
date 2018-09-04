<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"/>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          기사를 읽고, 정책을 이해해보세요!
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <strong>아래 버튼을 눌러</strong> 기사를 읽은 뒤, 여기로 돌아와주세요.<br><br>
      각 기사를 <strong style="color:red;">1분 이상</strong> 읽어야 다음으로 넘어갈 수 있습니다.<br>
      1분이 지나면 버튼이 <strong style="color:green;">초록색</strong>으로 바뀝니다.<br><br>
    </v-flex>

    <v-flex xs12>
      <span style="text-align:left;"><strong> 첫 번째 기사 </strong></span>
      <v-divider/>
      <v-btn 
        :color="read1 ? 'success' : 'black'"
        :outline="read1==false"
        @click="openFirstArticle"
        block ripple large v-html="article_title_cut(policy.article1_title)"></v-btn>
      <br>
    </v-flex>
    <v-flex xs12>
      <span style="text-align:left;"><strong> 두 번째 기사 </strong></span>
      <v-divider/>
      <v-btn 
        :color="read2 ? 'success' : 'black'"
        :outline="read2==false"
        @click="openSecondArticle"
        block ripple large v-html="article_title_cut(policy.article2_title)"></v-btn>
      <br>
    </v-flex>

    <v-flex xs12 row wrap>
    <template v-if="!(read1&&read2)">
      <strong style="color:red;">두 기사를 각각 1분 이상 읽으셔야<br>다음으로 넘어가실 수 있습니다.</strong>
    </template>
    <br>
    <v-btn block :disabled="!(read1 && read2)" color="primary" @click="onClickComplete">다음</v-btn>
    </v-flex>
  </v-layout>
</template>
<style scoped>
#header {
    flex: 1;
    display: flex;
    position: relative;
}
.v-btn {
  word-break: keep-all;
}
</style>
<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  fetch: function ({app, store, redirect}) {
    if (store.state.userPolicy.identify_done) {
      redirect('/Identify')
    }
  },
  data: function () {
    return {
      read1: false,
      read2: false
    }
  },
  computed: {
    // read1: function () {
    //   return this.$store.state.userPolicy.articles_seen >= 1
    // },
    // read2: function () {
    //   return this.$store.state.userPolicy.articles_seen >= 2
    // },
    userGroup: function () {
      // if (!this.$store.state.user.is_participant) {
      //   return -1
      // } else {
      //   return this.$store.getters.experimentCondition
      // }
      return this.$store.getters.userGroup
    },
    nextRoute: function () {
      switch (this.userGroup) {
        case 1:
        case 2:
          // this.$store.commit('setNextstep')
          return '/MiniSurvey'
        case 3:
        case 4:
          return '/TagOverview'
        case 5:
        case 0:
        case -1:
        case 6:
        case 7:
          return '/Identify'
      }
    },
    policy: function () {
      return this.$store.state.policy
    }
  },
  components: {
    PromisePane
  },
  methods: {
    onClickComplete: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'FinishReadArticle',
        eventLabel: `${this.policy.title}`,
        eventValue: 0
      })
      this.dialog = false
      this.$router.push(this.nextRoute)
    },
    openFirstArticle () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenFirstArticle',
        eventLabel: `${this.policy.title}`,
        eventValue: 0
      })
      window.open(this.policy.article1_link, '_blank')
      if (!this.read1) {
        setTimeout(() => {
          this.$store.dispatch('incrementUserPolicyArticlesSeen')
          this.read1 = true
        }, 60000)
      }
      // this.read1 = true
    },
    openSecondArticle () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenSecondArticle',
        eventLabel: `${this.policy.title}`,
        eventValue: 0
      })
      window.open(this.policy.article2_link, '_blank')
      if (!this.read2) {
        setTimeout(() => {
          this.$store.dispatch('incrementUserPolicyArticlesSeen')
          this.read2 = true
        }, 60000)
      }
      // this.read2 = true
    },
    article_title_cut: function (str) {
      // if (str.length <= 20) {
      //   return str
      // } else {
      //   return str.slice(0, 20) + `
      //   ` + str.slice(20)
      // }
      return str
    }
  }
}
</script>