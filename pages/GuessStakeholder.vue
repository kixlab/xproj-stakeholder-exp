<template>
  <v-layout row justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12 sm12>
    </v-flex>
    <v-btn @click="onClickNextButton">이해관계자 확인하기</v-btn>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  components: {
    PromisePane
  },
  methods: {
    onClickNextButton: function () {
      this.$router.push('/TagOverview')
    }
  }
}
</script>

<style>

</style>
