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
    <v-btn block color="primary" @click="onClickComplete">완료</v-btn>
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
    }
  },
  methods: {
    gohome () {
      this.$router.push('/')
    },
    onClickComplete: function () {
      this.$router.push('MiniSurvey')
    }
  }
}
</script>