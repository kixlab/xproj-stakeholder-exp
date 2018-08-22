<template>
  <!-- <div class="test"> -->
    <div>
      <v-flex id="title">
        <div id="title_word">
          <font size="7">정책<br>타</font>
          <font size="4">인의 </font>
          <font size="7">입</font>
          <font size="4">장</font>
        </div>
      </v-flex>

      <v-flex id="contents">
        <div id="title_word">
          정치에 참여할 기회조차 없었던 당신을 위해<br>
          "정책의 타입"과 함께<br>
          정책을 이해하고<br>
          여러분의 목소리를 사회에 들려주세요!
        </div>
      </v-flex>

      <v-flex xs12 id="btn_location">
        <v-btn @click="onParticipateButtonClick" ripple block large> 실험에 참여하기 </v-btn>
        <v-btn @click="onLookAroundButtonClick" ripple block large outline color="white"> 둘러보기 </v-btn>
      </v-flex>
    </div>
  <!-- </div> -->
</template>
<style scoped>
.container.grid-list-md.text-xs-center {
  padding: 0;
  height: 100%;
  display: flex;
  vertical-align: middle;
}
/* .cover {
  height:100%;
  padding: 6px;
  background-color:rgba(94, 26, 26, 0.5);
}
.test {
  background-image: url('https://images.pexels.com/photos/910332/pexels-photo-910332.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-size: cover;
  background-repeat:no-repeat;
  background-position:center;
  margin: 0;
  height: 100%;
  width: 100%;
} */
#btn_location {
  position: relative;
  margin-top: 10%;
}
#title {
  margin-top: 20%;
}
#contents {
  margin-top: 20%;
}
#title_word {
  color: white;
  background-color: rgba(0,0,0, 0.4);
}
</style>
<script>
export default {
  layout: 'index',
  data: function () {
    return {

    }
  },
  methods: {
    onLookAroundButtonClick () {
      this.$store.commit('logout')
      this.$ga.event({
        eventCategory: '/',
        eventAction: 'ClickLookAroundButton',
        eventLabel: '',
        eventValue: 0
      })
      this.$store.commit('setLookAround', true)
      this.$router.push('/ShowPolicies')
    },
    onParticipateButtonClick () {
      this.$ga.event({
        eventCategory: '/',
        eventAction: 'ClickParticipateButton',
        eventLabel: '',
        eventValue: 0
      })
      this.$store.commit('setLookAround', false)
      this.$router.push('/SignIn')
    }
  }
}
</script>