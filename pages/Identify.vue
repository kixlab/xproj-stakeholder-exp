<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <v-form>
        <div>
        <v-icon>arrow_drop_up</v-icon>
        <strong>Click above</strong> for short description of the policy.
        <br><br>
        <!--TODO: Prompt to make users think they should talk about themselves-->
        Please choose the option<br>that <strong style="color:red">best</strong> describes your current perspective.<br>
        </div>
        <v-spacer></v-spacer>
        <p class="body-1 prompt">
          <v-flex xs12>
            <v-card color="grey lighten-4">
              <v-card-text>I may be ___________ affected by the policy.</v-card-text>  
            </v-card>
          </v-flex>
        </p>       
        <v-radio-group v-model="userPolicy.effect_size">
          <v-radio label="not" :value="1"></v-radio>
          <v-radio label="a little" :value="2"></v-radio> 
          <v-radio label="somewhat" :value="3"></v-radio>
          <v-radio label="strongly" :value="4"></v-radio> 
          <v-radio label="don't know the answer" :value="0"></v-radio>         
        </v-radio-group>

        <v-btn v-if="userPolicy.effect_size != 5" block color="primary" @click="onNextButtonClick">NEXT</v-btn>
        <template v-else>
          <span style="color:red;">You can go next after choosing the answer.</span>
          <v-btn block disabled>NEXT</v-btn>
        </template>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
import setTokenMixin from '~/mixins/setToken.js'
export default {
  // Stakeholders will be fetched from here.
  fetch: async function ({app, store, params, redirect}) {
    // let stakeholderGroups = await app.$axios.$get('/api/stakeholdergroups/', {
    //   params: {
    //     policy: store.state.policyId
    //   }
    // })
    // store.commit('setStakeholderGroups', stakeholderGroups.results)
    store.dispatch('setTags')
    if (store.state.userPolicy.identify_done) {
      redirect('/GuessEffectRandom/0')
    }
  },
  mixins: [setTokenMixin],
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    nextRoute: function () {
      // switch (this.userGroup) {
      //   case 1:
      //   case 2:
      //     // this.$store.commit('setNextstep')
      //     return '/MiniSurvey'
      //   case 3:
      //   case 4:
      //     return '/TagOverview'
      //   case 5:
      //   case 0:
      //   case -1:
      //   case 6:
      //   case 7:
      //     return '/GuessEffectRandom/0'
      // }
      return '/GuessEffectRandom/0'
    },
    userGroup: function () {
      // if (!this.$store.state.user.is_participant) {
      //   return -1
      // } else {
      //   return this.$store.getters.experimentCondition
      // }
      return this.$store.getters.userGroup
    }
  },
  methods: {
    onNextButtonClick: function () {
      // this.userPolicy.effect_size = parseInt(this.userPolicy.effect_size)
      const to = this.userPolicy.effect_size >= 2 ? '/StateAsStakeholder' : this.nextRoute
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SubmitIdentity',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      this.$store.dispatch('setUserPolicyEffectSize', this.userPolicy.effect_size)
      if (this.userPolicy.effect_size < 2) {
        this.$store.dispatch('setUserPolicyIdentifyDone')
      }
      this.$router.push(to)
    }
  },
  data: function () {
    return {
      userPolicy: {
        effect_size: '5',
        identity: '',
        detail: ''
      }
    }
  }
}
</script>
<style>
.theme--light .input-group:not(.input-group--error) label, .application .theme--light.input-group:not(.input-group--error) label {
  color:black !important;
};
.input-group.input-group--dirty.radio-group.radio-group--column {
  padding: 0;
}
.container.grid-list-md.text-xs-center {
  padding: 8px;
}
</style>
