<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="promise" />
    <v-flex xs12>
      <v-form>   
        <p class="body-1 prompt">이 공약의 긍정적인 효과를 누릴 사회적 집단은 누구인가요?</p>
        <v-text-field v-model="benefit.identity"> <!-- TODO: 명사+형용사 -->
        </v-text-field>
        <p class="body-1 prompt">{{benefit.identity || '위 집단'}}의 입장에서 한마디 남겨주세요.</p>
        <v-text-field v-model="benefit.oneliner"></v-text-field>
        <p class="body-1 prompt">이 공약의 긍정적인 효과는 무엇일까요? 관련 경험이 있다면 함께 적어주세요.</p>
        <v-text-field multi-line v-model="benefit.detail">
        </v-text-field>
        <!-- <v-flex class="prompt">그 사람들은 어떤 혜택을 받을까요?</v-flex> -->
        <!-- <textarea></textarea> -->
        <v-btn block color="primary" to="EstimateDemerits">다음</v-btn>
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
    promise: function () {
      return this.$store.state.promise
    }
  },
  data: function () {
    return {
      benefit: {
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
