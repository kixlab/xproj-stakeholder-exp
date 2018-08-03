<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <!-- <p class="promise">{{promise}}</p> -->
      <p class="body-1">
        이 정책에 <strong class="red--text">반대</strong>하신다구요?<br>
        그럼, 이 정책의 <strong class="blue--text">혜택</strong>을 먼저 보여드릴게요!
      </p>

      <v-tabs 
        fixed-tabs
        color = "grey lighten-4"
        slider-color = "black"
        height = "30"
        >

        <v-tab
          v-for = "item in items"
          :key="item.message"
          ripple
        >
          <span v-if="item.message == 'Foo'"><strong>혜택</strong></span>
          <span v-else><strong>피해</strong></span>
        </v-tab>
        
        <v-tab-item
          v-for = "n in 2"
          :key="n"
        >
          <v-flex xs12 sm6 offset-sm3
            v-for="object in opinion"
            :key="object">
            <v-spacer></v-spacer>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <div>
                    <font size="2">{{object.character}}</font>
                    &nbsp;
                    <font size="3"><strong>{{object.identity}}</strong></font>
                  </div>
                  <span>{{object.message}}</span>
                </div>
              </v-card-title>
              <v-divider light></v-divider>
              <v-card-actions>
                <v-btn flat icon color="blue lighten-2">
                  <v-icon>thumb_up</v-icon>
                </v-btn>

                <v-btn flat icon color="red lighten-2">
                  <v-icon>thumb_down</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="object.show = !object.show">
                  <v-icon>{{ object.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-slide-y-transition>
                <v-card-text v-show=object.show>
                  {{object.specific_message}}
                </v-card-text>
              </v-slide-y-transition>
            </v-card>
          </v-flex>
        </v-tab-item>
      </v-tabs>
      
      <v-btn 
        v-if = "active_button"
        color = "success"
        @click="items.push({'message': 'Bar'}),
                active_button=!active_button"
        block ripple>
        다른 것도 볼래요!
      </v-btn>
      <v-btn
        :loading="loading"
        :disabled="loading"
        color="cyan"
        @click.native="loader = 'loading'"
        ripple
      >
        여러분의 생각도 들려주세요!
      </v-btn>

      <v-btn
        :loading="loading"
        :disabled="loading"
        color="cyan"
        @click.native="loader = 'loading'"
        ripple
      >
        끝
      </v-btn>
    </v-flex>

<!--    
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
    <v-flex xs12>
      <v-btn block color="primary" to="EstimateBenefits">새 효과 추가하기</v-btn>
    </v-flex>
    -->
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

