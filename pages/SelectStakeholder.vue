<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <p class="body-1">
        이 정책은 우리 사회에 어떤 영향을 끼칠까요?<br>
        이 정책의 이해당사자들은 어뗜 영향을 받을까요?
      </p>

      <v-layout row wrap>
        <template v-for="stakeholder in summaries">
          <v-flex d-flex xs6 :key="stakeholder">
            <v-card color="purple" dark ripple @click="1==1">
            <v-card-title primary class="title">{{stakeholder.stakeholder_name}}</v-card-title>
            <v-card-text><small>{{stakeholder.text}}</small></v-card-text>
            </v-card>          
          </v-flex>
        </template>       
          <v-flex d-flex xs6>
            <v-card color="dark blue" dark ripple @click="1==1">
            <v-card-text><small>혹시 영향을 받을<br>다른 사람들도 있을까요?</small></v-card-text>
            </v-card>          
          </v-flex>          
      </v-layout>
    
    </v-flex>
  </v-layout>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    effect: function () {
      return this.$store.state.effect
    },
    summaries: function () {
      return this.$store.state.summaries
    }
  },
  data: function () {
    return {
      opinionTexts: false
    }
  },
  methods: {
    next () {
      this.items.push({message: 'Baz'})
    }

  }
}
</script>

