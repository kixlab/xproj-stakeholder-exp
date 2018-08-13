<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title style="margin: 0 auto;">
        <div>
          <!-- Length of policy name should be less than 18 Korean syllables -->
          <!-- The line must be ended with a single space -->
          <small> 어서오세요! </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      안녕하세요!<br>
      데꿀멍을 통해 정책이 우리의 삶에 끼치는 영향을 알아보세요!
      <v-spacer />
      <v-spacer />
      <v-btn @click="onLookAroundButtonClick" ripple> 구경하기 </v-btn>
      <v-btn @click="onParticipateButtonClick" ripple> 참여하기 </v-btn>
    </v-flex>

  </v-layout>
</template>
<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&subset=korean');

</style>
<script>
export default {
  data: function () {
    return {

    }
  },

  methods: {
    onLookAroundButtonClick () {
      this.$ga.event({
        eventCategory: 'index',
        eventAction: 'ClickLookAroundButton',
        eventLabel: '',
        eventValue: 0
      })
      this.$store.commit('setLookAround', true)
      this.$router.push('ShowPolicies')
    },
    onParticipateButtonClick () {
      this.$ga.event({
        eventCategory: 'index',
        eventAction: 'ClickParticipateButton',
        eventLabel: '',
        eventValue: 0
      })
      this.$router.push('SignIn')
    }
  }
}
</script>