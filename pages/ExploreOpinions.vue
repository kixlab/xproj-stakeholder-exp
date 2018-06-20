<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <div class="body-1">이 공약에 대해 사람들은 다음과 같이 생각합니다.</div>
      <v-card>
        <v-card-action>
          <span class="body-1">{{sort.type}}</span>
          <span class="body-1">{{sort.value}}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="showFilter =! showFilter">
            <v-icon>{{ showFilter ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-action>
        <v-slide-y-transition>
          <v-card-text v-show="showFilter">
            <v-radio-group v-model="sort.type">
              <v-radio v-for="type in availableTypes" :key="type" :value="type" :label="type"></v-radio>
            </v-radio-group>
            <v-radio-group v-model="sort.value">
              <v-radio v-for="value in availableValues" :key="value" :value="value" :label="value"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-media>
          <div class="mySVGContainer" ref="mySVGContainer">
            <svg :width="width" :height="height" ref="mySVG">
              <g class="axis axis--x">
                <path :d="`M 0 ${height} H ${width}`" stroke="black">
                </path>
              </g>
              <g class="axis axis--y">
                <path :d="`M 0 0 V ${height}`" stroke="black">
                </path>
              </g>
              <g class="bar" v-for="bar in bars" :key="bar.label">
                <rect class="bar" :x="bar.x" :y="bar.y" :width="bar.width" :height="bar.height" fill="#4E7AC7"></rect>
              </g>
            </svg>
          </div>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import * as d3 from 'd3'
import _ from 'lodash'

export default {
  mounted: function () {
    this.width = this.$refs.mySVGContainer.clientWidth
    this.height = this.$refs.mySVGContainer.clientHeight
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.width = this.$refs.mySVGContainer.clientWidth
        this.height = this.$refs.mySVGContainer.clientHeight
      })
    })
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
    barData: function () {
      if (!this.data) {
        return
      }
      let filteredData = _.filter(this.data, (d) => {
        return d[this.sort.type] === this.sort.value
      })
      return _.countBy(filteredData, 'score')
    },
    bars: function () {
      let pairs = _.toPairs(this.barData)
      return _.map(pairs, (b) => {
        return {
          label: b[0],
          x: this.x(+b[0]),
          y: this.y(b[1]),
          width: this.x.bandwidth(),
          height: this.height - this.y(b[1])
        }
      })
    },
    availableValues: function () {
      return _.uniqBy(this.data, this.sort.type).map((d) => {
        return +d[this.sort.type]
      }).sort()
    }
  },
  watch: {
    width: function () {
      this.x = d3.scaleBand().domain([1, 2, 3, 4, 5]).rangeRound([0, this.width]).padding(0.1)
      this.y = d3.scaleLinear().domain([0, 30]).rangeRound([this.height, 0])
    }
  },
  data: function () {
    return {
      data: {},
      width: 0,
      height: 0,
      sort: {
        type: 'age',
        value: 2
      },
      availableTypes: ['sex', 'age', 'job', 'kid'],
      showFilter: false,
      x: d3.scaleBand().domain([1, 2, 3, 4, 5]).rangeRound([0, this.width]).padding(0.1),
      y: d3.scaleLinear().domain([0, 30]).rangeRound([this.height, 0])
    }
  }
}
</script>
<style scoped>
.mySVGContainer {
  width: 100%;
  height: 40vh;
}

</style>
