<template>
  <v-layout row wrap>
    <promise-pane :promise="promise"></promise-pane>
    <v-flex xs12>
      <div class="prompt">다음과 같은 사람들이 이 공약에 영향을 받습니다.</div>

    </v-flex>
    <v-flex xs12>
      <v-btn block color="primary" to="EstimateBenefits">새 효과 추가하기</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  computed: {
    promise: function () {
      return this.$store.state.promise
    }
  },
  components: {
    PromisePane
  }
}
</script>
<style scoped>

</style>
