<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="promise" />
    <v-flex xs12>
      <v-form>
        <p class="body-1 prompt">이 공약으로 혜택이나 손해를 받으시나요?</p>
        <v-radio-group v-model="effect.type" row>
          <v-radio label="해당 없음" value="">해당 없음</v-radio> 
          <v-radio label="혜택" value="benefit">혜택</v-radio>
          <v-radio label="손해" value="demerit">손해</v-radio> 
        </v-radio-group>
        <div v-if="effect.type">
          <p class="body-1 prompt">
            나는 [     ]이기 때문에 영향을 받는다.
            빈칸에 들어갈 말을 채워주세요.
          </p>
          <v-text-field v-model="effect.identity">
          </v-text-field>
          <p class="body-1 prompt">어떤 {{effect.type == 'demerit' ? '손해를' : '혜택을'}} 받으시나요? 구체적인 경험과 함께 설명해주세요.</p>
          <v-text-field multi-line v-model="effect.detail">
          </v-text-field>
        </div>
        <div v-else>
          <p class="body-1 prompt">이 공약과 직접적으로 연관된 사람 혹은 집단을 하나 적어주세요.</p>
          <v-text-field v-model="effect.identity">
          </v-text-field>
          <p class="body-1 prompt">그 집단은 어떤 영향을 받을까요?</p>
          <v-text-field multi-line v-model="effect.detail">
          </v-text-field>
        </div>
        <v-btn block color="primary" @click="onNextButtonClick">다음</v-btn>
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
      let to = this.effect.type ? 'ExploreOpinions' : 'EstimateBenefits'
      this.$router.push(to)
    }
  },
  data: function () {
    return {
      effect: {
        type: '',
        identity: '',
        detail: ''
      }
    }
  }
}
</script>
<style scoped>

</style>
