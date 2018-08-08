<template>
  <v-card>
    <v-card-media>
      <div class="mySVGContainer" ref="mySVGContainer">
        <svg :width="svgWidth" :height="svgHeight" ref="mySVG">
          <g class="axis axis--x">
            <path :d="`M ${margin.left} ${svgHeight - margin.bottom} h ${width}`" stroke="black">
            </path>
          </g>
          <g class="axis axis--y">
            <path :d="`M ${margin.left} ${margin.top} v ${height}`" stroke="black">
            </path>
          </g>
          <g class="bar" v-for="bar in bars" :key="bar.label">
            <rect class="bar" :x="bar.x" :y="bar.y" :width="bar.width" :height="bar.height" fill="#4E7AC7" @click="onBarClick(bar.label)"></rect>
          </g>
        </svg>
      </div>
    </v-card-media>
  </v-card>
</template>
<script>
import * as d3 from 'd3'
import _ from 'lodash'
export default {
  props: {
    barData: Object
  },
  mounted: function () {
    this.svgWidth = this.$refs.mySVGContainer.clientWidth
    this.svgHeight = this.$refs.mySVGContainer.clientHeight
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.svgWidth = this.$refs.mySVGContainer.clientWidth
        this.svgHeight = this.$refs.mySVGContainer.clientHeight
      })
    })
  },
  computed: {
    bars: function () {
      let pairs = _.toPairs(this.barData)
      return _.map(pairs, (b) => {
        return {
          label: b[0],
          x: this.x(+b[0]) + this.margin.left,
          y: this.y(b[1]) + this.margin.top,
          width: this.x.bandwidth(),
          height: this.height - this.y(b[1])
        }
      })
    }
  },
  watch: {
    svgWidth: function () {
      this.margin.top = Math.floor(this.svgHeight * 0.02)
      this.margin.bottom = Math.floor(this.svgHeight * 0.02)
      this.margin.left = Math.floor(this.svgWidth * 0.02)
      this.margin.right = Math.floor(this.svgWidth * 0.02)
      this.width = this.svgWidth - this.margin.left - this.margin.right
      this.height = this.svgHeight - this.margin.top - this.margin.bottom
      this.x = d3.scaleBand().domain([1, 2, 3, 4, 5]).rangeRound([0, this.width]).padding(0.1)
      this.y = d3.scaleLinear().domain([0, 30]).rangeRound([this.height, 0])
    }
  },
  data: function () {
    return {
      svgWidth: 0,
      svgHeight: 0,
      x: d3.scaleBand().domain([1, 2, 3, 4, 5]).rangeRound([0, this.width]).padding(0.1),
      y: d3.scaleLinear().domain([0, 30]).rangeRound([this.height, 0]),
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      width: 0,
      height: 0
    }
  },
  methods: {
    onBarClick: function (label) {
      this.$emit('bar-click', label)
    }
  }
}
</script>

<style scoped>
.mySVGContainer {
  width: 100%;
  height: 40vh;
}

.bar:hover {
  fill: #16193b;
}
</style>
