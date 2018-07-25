<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <ul>
        <li v-for="promise in promises" :key="promise.id">
          <a @click="onPromiseClick(promise.id, $event)">
            {{promise.title}}
          </a>
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  asyncData: async function ({app, store}) { // fetch the list of policies from the server
    let promises = await app.$axios.$get('/api/policies/')
    return {promises: promises.results}
  },
  methods: {
    onPromiseClick: function (idx, $ev) { // update the promise index in store
      this.$store.commit('setPromiseIdx', {promiseIdx: idx})
      // TODO: Log to database
      this.$router.push('EvaluatePromise')
    }
  }
}
</script>
<style scoped>
a {
  cursor: pointer;
}
</style>
