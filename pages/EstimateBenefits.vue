<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="promise" />
    <v-flex xs12>
      <v-form>   
        <p class="body-1 prompt">이 정책으로 어떤 사람들이 영향을 받나요?</p>
        <v-text-field v-model="effect.identity"> <!-- TODO: 명사+형용사 -->
        </v-text-field>
        <p class="body-1 prompt">이 정책은 {{effect.identity || '위 집단'}}에게 어떤 영향을 주나요?</p>
        <v-radio-group row v-model="isBenefit">
          <v-radio label="혜택" value="benefit">혜택</v-radio>
          <v-radio label="손해" value="demerit">손해</v-radio> 
        </v-radio-group>
        <p class="body-1 prompt">{{effect.identity || '위 집단'}}의 입장에서, 이 정책에 어떻게 반응할 지 한 마디로 적어주세요.</p>
        <v-text-field v-model="effect.oneliner"></v-text-field>
        <p class="body-1 prompt">{{effect.identity || '위 집단'}}의 입장에서, 이 정책으로 받는 영향을 적어주세요.</p>
        <v-text-field multi-line v-model="effect.detail">
        </v-text-field>
        <!-- <v-flex class="prompt">그 사람들은 어떤 혜택을 받을까요?</v-flex> -->
        <!-- <textarea></textarea> -->
        <v-btn block color="primary" to="ExploreOpinions">영향 추가</v-btn>
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
      effect: {
        isBenefit: '',
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
