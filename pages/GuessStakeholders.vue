<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="promise" />
    <v-flex xs12>
      <v-list two-line>
        <template v-for="(item, index) in items">
          <v-list-tile :key="index" avatar ripple @click="" class='previous'>
            <v-list-tile-content>
              <v-list-tile-title>{{item.Stakeholder}}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary multiline">{{item.effect}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn-toggle v-model="item.isBenefit">
                  <v-btn outline round color="primary" class="binarybtn">혜택</v-btn>
                  <v-btn outline round color="error"class="binarybtn">손해</v-btn>
                </v-btn-toggle>
              </v-list-tile-action>
            </v-list-tile>
          </template>
          <v-list-tile class='current'>
            <v-list-tile-content>
              <v-list-tile-title><input type="text" style="text-align: center;" placeholder="사람/집단" id='newstakeholder'></v-list-tile-title>
              <v-list-tile-sub-title><v-text-field placeholder="어떤 영향을 받나요?" style="font-size:10px;" id='neweffect'></v-text-field></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn-toggle id='newbenefit'>
                  <v-btn outline round color="primary" class="binarybtn">혜택</v-btn>
                  <v-btn outline round color="error"class="binarybtn">손해</v-btn>
                </v-btn-toggle>
              </v-list-tile-action>
            </v-list-tile>  
      </v-list>

      <v-btn block color="secondary" @click="addRow">추가하기</v-btn>

      <v-btn block color="primary" @click="addEffect">다음</v-btn>
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
  methods: {
    addRow: function (items) {
      var newS = document.getElementById('newstakeholder').value
      var newE = document.getElementById('neweffect').value
      var newB = document.getElementById('newbenefit').value
      items.push({Stakeholder: newS, isBenefit: newB, effect: newE})
    },
    addEffect: function () {
      // this.$axios.$post('/effects', this.effect)
      // TODO: record user activity
      this.$router.push('CategorizeStakeholders')
    }
  },
  data () {
    return {
      items: [
        {Stakeholder: '주말에만 쉬는 워킹맘', isBenefit: 1, effect: '주말에 장보기와 여가 생활을 동시에 즐기기 어려워짐'}
      ]
    }
  }
}
</script>
<style scoped>
.score__btn {
  display: inline-block;
  min-width: 0;
}
.stakeholders{
  width:100%;
}

.binary__btn{
    width:50%;
    left:25%;
}

.previous{
  border:solid 1px lightblue;
  margin-bottom:5px;
}
.binarybtn{
  font-size:14px;
  height:24px;
  padding:1px;
}
.current{
  border:dashed 1px lightblue;
  margin-bottom:5px;
}
</style>
