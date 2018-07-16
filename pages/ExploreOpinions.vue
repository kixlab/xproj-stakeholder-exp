<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="promise"></promise-pane>
    <v-flex xs12>
      <!-- <p class="promise">{{promise}}</p> -->
      <p class="body-1">이 공약에 대해 사람들은 이렇게 생각합니다. 앞에서 선택한 집단이 어떻게 생각할 지 알아보세요!</p>
      <opinion-selector v-model="sort" :available-types="availableTypes" :available-values="availableValues"></opinion-selector>
    </v-flex>
    <v-flex xs12>
      <opinion-chart :bar-data="barData" @bar-click="onBarClick"></opinion-chart>
    </v-flex>
    <v-slide-y-transition>
      <v-flex xs12 v-show="opinionTexts">
        <v-card>
          <v-card-actions>
            이 공약에 대한 의견입니다.
            <v-spacer></v-spacer>
            <v-btn icon @click="opinionTexts = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
          <div v-for="text in opinionTexts" :key="text">{{text}}</div>
        </v-card>
      </v-flex>
    </v-slide-y-transition>
  </v-layout>
</template>
<script>
import * as d3 from 'd3'
import _ from 'lodash'
import OpinionChart from '~/components/OpinionChart.vue'
import OpinionSelector from '~/components/OpinionSelector.vue'
import PromisePane from '~/components/PromisePane.vue'
export default {
  components: {
    OpinionChart,
    OpinionSelector,
    PromisePane
  },
  mounted: function () {
    d3.csv('/data.csv', function (d) {
      return {
        age: +d.AGE_10,
        sex: +d.SEX,
        job: +d.JOB,
        kid: +d.Q1,
        score: +d.Q3,
        text: d.Q16
      }
    }).then((data) => {
      this.data = data
    })
  },
  computed: {
    promise: function () {
      return this.$store.state.promise
    },
    filteredData: function () {
      if (!this.data) {
        return
      }
      return _.filter(this.data, (d) => {
        return d[this.sort.type] === this.sort.value
      })
    },
    barData: function () {
      return _.countBy(this.filteredData, 'score')
    },
    availableValues: function () {
      return _.uniqBy(this.data, this.sort.type).map((d) => {
        return +d[this.sort.type]
      }).sort()
    }
  },
  data: function () {
    return {
      data: {},
      sort: {
        type: 'age',
        value: 2
      },
      availableTypes: ['sex', 'age', 'job', 'kid'],
      opinionTexts: false
    }
  },
  methods: {
    onBarClick: function (index) {
      let data = this.filteredData.filter((d) => {
        return d.score === +index
      })
      console.log(data)
      this.opinionTexts = data.map((d) => {
        return d.text
      })
    }
  }
}
</script>
<style scoped>

</style>
