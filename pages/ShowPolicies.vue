<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <ul>
        <li v-for="policy in policies" :key="policy.id">
          <a @click="onPolicyClick(policy)">
            {{policy.title}}
          </a>
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  // List of policies fetched from here
  asyncData: async function ({app, store}) { // fetch the list of policies from the server
    let policies = await app.$axios.$get('/api/policies/')
    return {policies: policies.results}
  },
  methods: {
    onPolicyClick: function (policy) { // update the policy index in store
      this.$ga.event({
        eventCategory: 'ShowPolicies',
        eventAction: 'SelectPolicy',
        eventLabel: policy.title,
        eventValue: 0
      })
      this.$store.commit('setPolicyIdx', {policyIdx: policy.id})
      this.$store.commit('setPolicy', policy)
      // TODO: Log to database
      this.$router.push('Identify')
    }
  }
}
</script>
<style scoped>
a {
  cursor: pointer;
}
</style>
