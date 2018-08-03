<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <v-form>
        <div>
        <v-icon>arrow_drop_up</v-icon>
        언제나 위 <strong>제목</strong>을 누르면 자세한 설명을 읽을 수 있습니다.
        <br><br>
        아래에서 내 생각과 <strong style="color:red">가장 가까운</strong> 단어를 선택해주세요.<br>
        </div>
        <v-spacer></v-spacer>
        <p class="body-1 prompt">
          <v-flex xs12>
            <v-card color="grey lighten-4">
              <v-card-text>이 정책을 시행했을 때 _____ 영향을 받을 것 같다.</v-card-text>  
            </v-card>
          </v-flex>
        </p>       
        <v-radio-group v-model="effect.effect_size">
          <v-radio label="매우 적은" value="0"></v-radio>
          <v-radio label="적은" value="1"></v-radio> 
          <v-radio label="큰" value="2"></v-radio>
          <v-radio label="매우 큰" value="3"></v-radio> 
        </v-radio-group>
        
        <v-spacer></v-spacer>
        <p class="body-1 prompt">
          <v-flex xs12>
            <v-card color="grey lighten-4">
              <v-card-text>이 정책을 시행하는 것을 _____한다.</v-card-text>  
            </v-card>
          </v-flex>
        </p>       
        <v-radio-group v-model="effect.procon">
          <v-radio label="찬성" value="0"></v-radio>
          <v-radio label="반대" value="1"></v-radio> 
        </v-radio-group>


        <v-btn v-if="effect.effect_size != 4 && effect.procon != 2" block color="primary" @click="onNextButtonClick">다음</v-btn>
        <template v-else>
          <p style="color:red">모두 고르셔야 다음으로 넘어갈 수 있습니다.</p>
          <v-btn block disabled>다음</v-btn>
        </template>
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
    },
    policyIdx: function () {
      return this.$store.state.policyIdx
    }
  },
  methods: {
    onNextButtonClick: function () {
      this.effect.policy = this.policyIdx
      this.effect.effect_size = parseInt(this.effect.effect_size)
      let to = this.effect.effect_size >= 2 ? 'ExploreOpinions' : 'EstimateBenefits' // modify here
      this.$router.push(to)
    }
  },
  data: function () {
    return {
      effect: {
        effect_size: '4',
        identity: '',
        stakeholder: '',
        stance: '2'
      }
    }
  }
}
</script>
<style scoped>

</style>
