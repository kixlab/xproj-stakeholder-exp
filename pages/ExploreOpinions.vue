<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12>
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
          <effect-card v-for="effect in effects" :key="effect.description" :effect="effect"></effect-card>
        </v-tab-item>
      </v-tabs>
      
      <v-btn 
        v-if = "active_button"
        color = "success"
        @click="items.push({'message': 'Bar'}),
                active_button=!active_button"
        block ripple
      >
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
  </v-layout>
</template>
<script>
import EffectCard from '~/components/EffectCard.vue'
import PromisePane from '~/components/PromisePane.vue'
export default {
  components: {
    EffectCard,
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
    next () {
      this.items.push({message: 'Baz'})
    }
  }
}
</script>

