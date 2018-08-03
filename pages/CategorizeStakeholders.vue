<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="promise" />
    <v-flex xs12>
        <p class="body-1 prompt">생각해내신 사람/집단은 다음 중 어디에 속하나요?</p>
        <v-list two-line>
          <template v-for="(stakeholder, index) in stakeholders">
          <v-list-tile :key="index">
            <v-list-tile-content>
              <v-list-tile-title style="font-size:12px;">{{stakeholder}}</v-list-tile-title>
              </v-list-tile-content>
            <v-list-tile-content>
                <v-btn-toggle id="stakeholder">
                  <v-btn outline round color="primary" class="stkbtn">복합쇼핑몰</v-btn>
                  <v-btn outline round color="primary" class="stkbtn">자영업자</v-btn>
                  <v-btn outline round color="primary" class="stkbtn">소비자</v-btn>
                  <v-btn outline round color="primary" class="stkbtn">근처 주민</v-btn>
                </v-btn-toggle>
            </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-btn block color="primary" @click="addCategory">다음</v-btn>
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
      return this.$store.state.policy
    }
  },
  methods: {
    addCategory: function () {
      // this.$axios.$post('/effects', this.effect)
      // TODO: record user activity
      this.$router.push('ExploreStakeholders')
    }
  },
  data () {
    return {
      stakeholders: ['주말에만 쉬는 워킹맘', '쇼핑몰 근처 카페 사장', '복합쇼핑몰 점포 직원']
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

.stkbtn{
    font-size:12px;
    padding:2px;

}
</style>
