<template>
  <v-layout>
    <promise-pane :policy="policy" />

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
      opinionTexts: false,
      active_button: true,
      items: [
        {message: 'Foo'}
      ],
      effect: [
        {
          stakeholder_detail: '세 살 배기 아이의',
          identity: '엄마',
          description: '위대한 태양이 외면하는 겨울에는 땅은 슬픔의 계곡으로 들어가 단식하고 통곡하며 상복에 몸을 가리고 자신의 결혼식 화환이 썩도록 내버려둔다. 그리고는 태양이 키스와 함께 돌아오는 봄이 되면 다시 생동한다.',
          isBenefit: false,
          show: false
        },
        {
          stakeholder_detail: '애기엄마가 윗집에 사는',
          identity: '이웃',
          description: '우습게 들릴지 모르지만, 진정한 혁명가를 이끄는 것은 위대한 사랑의 감정이다, 이런 자질이 없는 혁명가는 생각할 수 없다.',
          isBenefit: true,
          show: false
        }
      ],
      selected: [2]
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
    },
    toggle (index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    }
  }
}
</script>

