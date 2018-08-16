<template>
  <!-- <div class="test"> -->
    <div>
      <v-flex id="title">
        <div id="title_word"><font size="7">다른 사람 얘기</font></div>
      </v-flex>

      <v-flex xs12 id="btn_location">
        <v-btn @click="onLookAroundButtonClick" ripple block large> 구경하기 </v-btn>
        <v-btn @click="onParticipateButtonClick" ripple block large> 실험에 참여하기 </v-btn>
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
  margin-top: 60%;
}
#title {
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