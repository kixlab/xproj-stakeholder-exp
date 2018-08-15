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
      <v-btn block color="success" href="policy.article1_link">{{policy.article1_title}}</v-btn>
      <br>
    </v-flex>
    <v-flex xs12>
      <span style="text-align:left;"><strong> 두 번째 기사 </strong></span>
      <v-divider/>
      <v-btn block color="success" href="policy.article2_link">{{policy.article2_title}}</v-btn>
      <br>
    </v-flex>

    <v-btn block color="primary" @click="onClickComplete">다음</v-btn>
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
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policies[this.$store.state.policyIdx - 1]
    },
    userGroup: function () {
      if (!this.$store.state.user.isParticipant) {
        console.log('fire')
        return -1
      } else {
        console.log(this.$store.getters.experimentCondition)
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
    }
  },
  methods: {
    gohome () {
      this.$router.push('/')
    },
    onClickComplete: function () {
      this.$router.push(this.nextRoute)
    }
  }
}
</script>