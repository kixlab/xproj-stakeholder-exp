<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <v-form>
        <p class="body-1 prompt">이 공약의 부정적인 효과를 받을 사회적 집단은 누구인가요?</p>
        <v-text-field v-model="demerit.identity">
        </v-text-field>
        <p class="body-1 prompt">{{demerit.identity || '위 집단'}}의 입장에서 한마디 남겨주세요.</p>
        <v-text-field v-model="demerit.oneliner"></v-text-field>
        <p class="body-1 prompt">이 공약의 부정적인 효과는 무엇일까요? 관련 경험이 있다면 함께 적어주세요.</p>
        <v-text-field multi-line v-model="demerit.detail">
        </v-text-field>
        <!-- <v-flex class="prompt">그 사람들은 어떤 혜택을 받을까요?</v-flex> -->
        <!-- <textarea></textarea> -->
        <v-btn block color="primary" to="EvaluatePromise">다음</v-btn>
      </v-form>
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
    }
  },
  data: function () {
    return {
      demerit: {
        identity: '',
        detail: '',
        oneliner: ''
      }
    }
  }
}
</script>
<style scoped>

</style>
