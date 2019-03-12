<template>
  <v-layout row justify-center>
    Pass
    <v-btn @click="onClickNextButton">Pass</v-btn>
  </v-layout>
</template>

<script>
export default {
  methods: {
    onClickNextButton: function () {
      this.$router.push('/TagOverview')
    }
  }
}
</script>

<style>

</style>
