<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <!-- <p class="promise">{{promise}}</p> -->
      <p class="body-1">
        이 정책은 우리 사회에 어떤 영향을 끼칠까요?<br>
        이 정책의 이해당사자들은 어뗜 영향을 받을까요?
      </p>

      <v-layout row wrap>
        <template v-for="stakeholder in summaries">
          <v-flex d-flex xs6 :key="stakeholder">
            <v-card color="purple" dark ripple @click="1==1">
            <v-card-title primary class="title">{{stakeholder.stakeholder_name}}</v-card-title>
            <v-card-text><small>{{stakeholder.text}}</small></v-card-text>
            </v-card>          
          </v-flex>
        </template>       
          <v-flex d-flex xs6>
            <v-card color="dark blue" dark ripple @click="1==1">
            <v-card-text><small>혹시 영향을 받을<br>다른 사람들도 있을까요?</small></v-card-text>
            </v-card>          
          </v-flex>          
      </v-layout>
    
    </v-flex>
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
    policy: function () {
      return this.$store.state.policy
    },
    effect: function () {
      return this.$store.state.effect
    },
    summaries: function () {
      return this.$store.state.summaries
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
    },
    next () {
      this.items.push({message: 'Baz'})
    }

  }
}
</script>

