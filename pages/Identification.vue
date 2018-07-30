<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="promise" />
    <v-flex xs12>
      <v-form>
        <div>
        <v-icon>arrow_drop_up</v-icon>
        언제나 위 <strong>제목</strong>을 누르면 자세한 설명을 읽을 수 있습니다.
        <br><br>
        아래에서 내 생각과 <strong>가장 가까운</strong> 단어를 선택해주세요.<br>
        </div>
        <v-space></v-space>
        <p class="body-1 prompt">
          <v-flex xs12>
            <v-card color="grey lighten-4">
              <v-card-text>이 정책을 시행했을 때 [-----] 영향을 받을 것 같다.</v-card-text>  
            </v-card>
          </v-flex>
        </p>       
        <v-radio-group v-model="effect.type">
          <v-radio label="매우 적은" value="0"></v-radio>
          <v-radio label="적은" value="1"></v-radio> 
          <v-radio label="큰" value="2"></v-radio>
          <v-radio label="매우 큰" value="3"></v-radio> 
        </v-radio-group>
        
        <v-space></v-space>
        <p class="body-1 prompt">
          <v-flex xs12>
            <v-card color="grey lighten-4">
              <v-card-text>이 정책을 시행하는 것을 [-----]한다.</v-card-text>  
            </v-card>
          </v-flex>
        </p>       
        <v-radio-group v-model="effect.procon">
          <v-radio label="찬성" value="0"></v-radio>
          <v-radio label="반대" value="1"></v-radio> 
        </v-radio-group>


        <v-btn v-if="effect.type != 4 && effect.type != 2" block color="primary" @click="onNextButtonClick">다음</v-btn>
        <v-else>
          <p style="color:red">모두 고르셔야 다음으로 넘어갈 수 있습니다.</p>
          <v-btn block disabled>다음</v-btn>
        </v-else>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
// import { db, fs } from '~/firebase.js'
export default {
  components: {
    PromisePane
  },
  computed: {
    promise: function () {
      return this.$store.state.promise
    }
  },
  methods: {
    onNextButtonClick: function () {
      let to = this.effect.type >= 2 ? 'ExploreOpinions' : 'EstimateBenefits'
      this.$router.push(to)
    }
  },
  data: function () {
    return {
      effect: {
        type: '4',
        identity: '',
        detail: '',
        procon: '2'
      }
    }
  }
}
</script>
<style scoped>

</style>
