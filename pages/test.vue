<template>
  <v-layout row wrap justify-center>
    <promise-pane :promise="policy"></promise-pane>
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
            <v-spacer></v-spacer>
            <v-flex xs12 sm6 offset-sm3>
            <v-card>
            <v-list two-line>
                <template v-for="(object, index) in effect">
                    <v-list-tile
                    :key="object"
                    avatar
                    ripple
                    @click="object.show = !object.show"
                    >
             <v-list-tile-content>
                <v-list-tile-title>{{ object.identity }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ object.stakeholder_detail }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ object.message }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>5hr</v-list-tile-action-text>
                <v-icon
                  v-if="selected.indexOf(index) < 0"
                  color="grey lighten-1"
                >
                  star_border
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-2"
                >
                  star
                </v-icon>
              </v-list-tile-action>
                <v-slide-y-transition>
                    <v-list-tile-action-text v-show=object.show>
                        {{object.description}}
                    </v-list-tile-action-text>
                </v-slide-y-transition>
            </v-list-tile>
            <v-divider
              v-if="index + 1 < effect.length"
              :key="index"
            ></v-divider>

          </template>
          </v-list>
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

