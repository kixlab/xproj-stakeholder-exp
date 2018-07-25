<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <ul>
        <li v-for="policy in policies" :key="policy.id">{{policy.title}}</li>
      </ul>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  asyncData: async function ({app, store}) {
    let policies = await app.$axios.$get(app.apiAddress + 'policies/')
    return {policies: policies.results}
  }
}
</script>
<style scoped>

</style>
