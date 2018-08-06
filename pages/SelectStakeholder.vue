<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
      <p class="body-1">
        이 정책은 우리 사회에 어떤 영향을 끼칠까요?<br>
        이 정책의 이해당사자들은 어뗜 영향을 받을까요?
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
import PromisePane from '~/components/PromisePane.vue'
export default {
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    effects: function () {
      return this.$store.state.effects
    }
  },
  data: function () {
    return {
      data: {},
      sort: {
        type: 'age',
        value: 2
      },
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

