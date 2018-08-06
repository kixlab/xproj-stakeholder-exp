<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <v-form>
        <p class="body-1 prompt">이 정책은 나에게 어떤 영향을 주나요? </p>
        <v-btn-toggle v-model="myEffect.isBenefit">
          <v-btn outline round color="primary" class="binarybtn">혜택</v-btn>
          <v-btn outline round color="error" class="binarybtn">손해</v-btn>
        </v-btn-toggle>
        <p class="body-1 prompt">이 정책이 나에게 주는 영향에 대해 자세히 적어주세요.</p>
        <v-text-field multi-line v-model="myEffect.description">
        </v-text-field>
        <p class="body-1 prompt">다음에 들어갈 말을 자유롭게 적어주세요.</p>
        <p class="body-1 prompt">내가 위와 같은 영향을 받는 이유는 내가 _____이기 때문이다.</p>
        <v-text-field v-model="myEffect.stakeholder_detail">
        </v-text-field>        
        <v-btn block color="primary" @click="addEffect">다음</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  asyncData: async function ({app, store}) {
    let stakeholderGroups = await app.$axios.$get('/api/stakeholdergroups/', {
      params: {
        policy: store.state.policyIdx
      }
    })
    return {stakeholderGroups: stakeholderGroups.results}
  },
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    }
  },
  methods: {
    addEffect: function () {
      this.myEffect.policy = this.$store.state.policyIdx
      // this.$store.commit('setMyEffect', this.myEffect)
      // this.$axios.$post('/effects', this.effect)
      // TODO: record user activity
      this.$router.push('GuessEffect')
    }
  },
  data: function () {
    return {
      // TODO: Adjust effect according to the data model
      myEffect: {
        isBenefit: '',
        stakeholder_detail: '',
        stakeholder_group: 0,
        description: '',
        oneliner: '',
        likes: 0
      }
    }
  }
}
</script>
<style scoped>
.score__btn {
  display: inline-block;
  min-width: 0;
}

.binary__btn{
    width:50%;
    left:25%;
}
</style>
