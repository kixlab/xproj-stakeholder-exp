<template>
  <v-layout row wrap justify-center>
    <div>
      <v-flex id="title">
        <div class="title_word">
          <span class="large_text">정책, 타</span>
          <span class="small_text">인의 </span>
          <span class="large_text">입</span>
          <span class="small_text">장</span>
        </div>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <img src="bg.gif" class="img" />
      </v-flex>
      <v-flex id="contents">
        <div class="title_description">
          <!-- 정부 정책은 과연 누구에게, 어떤 영향을 줄까요?<br>
          "정책 타입"에서 
          정책의 영향에 대해 알아보고<br>
          정부 정책이 여러분의 삶을 어떻게 바꾸는지 들려주세요! -->
          정책이 우리의 삶을 어떻게 바꾸는지 알아보세요!

        </div>
      </v-flex>

      <v-flex xs12 id="btn_location">
        <v-btn @click="onParticipateButtonClick" color="primary" ripple block large> 실험에 참여하기 </v-btn>
        <v-btn @click="onLookAroundButtonClick" ripple block large outline> 둘러보기 </v-btn>
      </v-flex>
      <v-flex xs12 style="text-align: right">
        Presented by <a @click="linkToKIXLAB">KIXLAB @ SoC KAIST</a>
      </v-flex>
    </div>
  </v-layout>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/earlyaccess/nanumpenscript.css');
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
  margin-top: 10%;
}
.title_word font{
  font-family: 'Nanum Pen Script';
}

.img {
  width: 100%;
}

.small_text {
  font-family: 'Nanum Pen Script';
  font-size: 2.5em;
}

.large_text {
  font-family: 'Nanum Pen Script';
  font-size: 4em;
}
/* .title_description {
  font-family: 'Nanum Pen Script';
  color: white;
  background-color: rgba(0,0,0, 0.4);
} */
</style>
<script>
export default {
  created: function () {
    this.$store.replaceState({
      sidebar: false,
      policyId: 1,
      policies: [
      ],
      policy: {},
      userPolicy: {
      },
      effects: [],
      userToken: null,
      user: {
        email: 'abcdef@kaist.ac.kr',
        experiment_condition: 0,
        pk: 1,
        step: 1,
        is_participant: true
      },
      tags: [],
      randomEffect: {},
      usedEffects: [],
      selectedTag: null,
      browsedTags: [],
      guessedTags: [],
      explorationDone: false
    })
  },
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
      this.$router.push('/ShowPolicies')
    },
    onParticipateButtonClick () {
      this.$ga.event({
        eventCategory: '/',
        eventAction: 'ClickParticipateButton',
        eventLabel: '',
        eventValue: 0
      })
      this.$router.push('/SignIn')
    },
    linkToKAISTSoC: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenKAISTSoC',
        eventLabel: (this.$store.state.policy && this.$store.state.policy.title) ? this.$store.state.policy.title : '',
        eventValue: 0
      })
      window.open('http://cs.kaist.ac.kr', '_blank')
    },
    linkToKIXLAB: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenKIXLAB',
        eventLabel: (this.$store.state.policy && this.$store.state.policy.title) ? this.$store.state.policy.title : '',
        eventValue: 0
      })
      window.open('https://kixlab.org', '_blank')
    }
  }
}
</script>