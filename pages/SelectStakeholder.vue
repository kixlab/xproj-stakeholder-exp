<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <!-- <p class="promise">{{promise}}</p> -->
      <p class="body-1">
        이제 이 정책의 이해당사자들이 받게 될 영향입니다.<br>
        이 정책은 우리 사회에 어떤 영향을 끼칠까요?
      </p>

      <v-layout row wrap>
          <v-flex d-flex xs6>
            <v-card color="purple" dark ripple @click="">
            <v-card-title primary class="title">복합쇼핑몰 직</v-card-title>
            <v-card-text><small>저희는 휴가 언제 가나요?</small></v-card-text>
            </v-card>          
          </v-flex>
          <v-flex d-flex xs6>
            <v-card color="purple" dark ripple @click="">
            <v-card-title primary class="title">주변 주민</v-card-title>
            <v-card-text><small>차가 많아서, 너무 복잡해요</small></v-card-text>
            </v-card>          
          </v-flex>
          <v-flex d-flex xs6>
            <v-card color="purple" dark ripple @click="">
            <v-card-title primary class="title">A</v-card-title>
            <v-card-text>B</v-card-text>
            </v-card>          
          </v-flex>
          <v-flex d-flex xs6>
            <v-card color="dark blue" dark ripple @click="">
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
      opinion: [
        {
          character: '세 살 배기 아이의',
          identity: '엄마',
          message: '우리 아이는 너무나 귀여워요!!! 사랑스러워 죽겠어요~ :)',
          specific_message: '위대한 태양이 외면하는 겨울에는 땅은 슬픔의 계곡으로 들어가 단식하고 통곡하며 상복에 몸을 가리고 자신의 결혼식 화환이 썩도록 내버려둔다. 그리고는 태양이 키스와 함께 돌아오는 봄이 되면 다시 생동한다.',
          show: false
        },
        {
          character: '애기엄마가 윗집에 사는',
          identity: '이웃',
          message: '아이 울음 소리가 너무 시끄러운 것 같아요!',
          specific_message: '우습게 들릴지 모르지만, 진정한 혁명가를 이끄는 것은 위대한 사랑의 감정이다, 이런 자질이 없는 혁명가는 생각할 수 없다.',
          show: false
        }
      ]
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

