<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <v-list two-line>
        <stakeholder-guess-item v-for="stakeholder in stakeholders" :key="stakeholder.stakeholder"></stakeholder-guess-item>
        <v-list-tile class='current'>
          <v-list-tile-content>
            <v-list-tile-title>
              <input type="text" style="text-align: center;" placeholder="사람/집단" v-model="newStakeholder.stakeholder">
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <v-text-field placeholder="어떤 영향을 받나요?" style="font-size:10px;" v-model="newStakeholder.effect"></v-text-field>
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn-toggle v-model="newStakeholder.isBenefit">
              <v-btn outline round color="primary" class="binarybtn" :value="1">혜택</v-btn>
              <v-btn outline round color="error" class="binarybtn" :value="0">손해</v-btn>
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
import StakeholderGuessItem from '~/components/StakeholderGuessItem.vue'
export default {
  components: {
    PromisePane,
    StakeholderGuessItem
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    }
  },
  methods: {
    addRow: function (items) {
      this.stakeholders.push(this.newStakeholder)
      this.newStakeholder.stakeholder = ''
      this.newStakeholder.isBenefit = 0
      this.newStakeholder.effect = ''
    },
    addEffect: function () {
      // this.$axios.$post('/effects', this.effect)
      // TODO: record user activity
      this.stakeholders.push(this.newStakeholder)
      this.$store.commit('setPredictedStakeholder', this.stakeholders) // commiting new predicted effects
      this.$router.push('CategorizeStakeholders')
    }
  },
  data () {
    return {
      newStakeholder: {
        stakeholder: '',
        isBenefit: 0,
        effect: ''
      },
      stakeholders: [
        {
          stakeholder: '주말에만 쉬는 워킹맘',
          isBenefit: 1,
          effect: '주말에 장보기와 여가 생활을 동시에 즐기기 어려워짐'
        }
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
