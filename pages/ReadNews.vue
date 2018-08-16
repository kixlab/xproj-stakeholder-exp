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
    <v-flex xs12> <br> </v-flex>

    <v-flex xs12>
      <span style="text-align:left;"><strong> 첫 번째 기사 </strong></span>
      <v-divider/>
      <v-btn 
        color="success"
        :dark="read1==true"
        :flat="read1==false"
        :outline="read1==false"
        @click="openFirstArticle"
        block ripple>{{policy.article1_title.slice(0,30)}}</v-btn>
      <br>
    </v-flex>
    <v-flex xs12>
      <span style="text-align:left;"><strong> 두 번째 기사 </strong></span>
      <v-divider/>
      <v-btn 
        color="success"
        :dark="read2==true"
        :flat="read2==false"
        :outline="read2==false"
        @click="openSecondArticle"
        block ripple>{{policy.article2_title.slice(0,30)}}</v-btn>
      <br>
    </v-flex>

    <template v-if="!(read1&&read2)">
      <strong style="color:red;">기사를 모두 읽으셔야 다음으로 넘어가실 수 있습니다.</strong>
    </template>
    <v-btn block :disabled="!(read1 && read2)" color="primary" @click="onClickComplete">다음</v-btn>
  </v-layout>
</template>
<style scoped>
#gohome {
    float: left;
    position: absolute;
}
#header {
    flex: 1;
    display: flex;
    position: relative;
}
</style>
<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  data: function () {
    return {
      read1: false,
      read2: false
    }
  },
  computed: {
    userGroup: function () {
      if (!this.$store.state.user.isParticipant) {
        return -1
      } else {
        return this.$store.getters.experimentCondition
      }
    },
    nextRoute: function () {
      switch (this.userGroup) {
        case 1:
        case 2:
          this.$store.commit('setNextstep')
          return 'MiniSurvey'
        case 3:
        case 4:
          return 'SelectStakeholder'
        case 5:
        case 0:
        case -1:
          return 'Identify'
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
    gohome () {
      this.$router.push('/')
    },
    onClickComplete: function () {
      this.$router.push(this.nextRoute)
    },
    openFirstArticle () {
      window.open(this.policy.article1_link, '_blank')
      this.read1 = true
    },
    openSecondArticle () {
      window.open(this.policy.article2_link, '_blank')
      this.read2 = true
    }
  }
}
</script>