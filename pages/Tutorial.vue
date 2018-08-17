<template>
    <v-flex xs12>
  <v-carousel
    dark hide-controls
    cycle="false"
    interval="60000">
    <v-carousel-item
      v-for="i in tutorialImg"
      :key="i"
      :src="imgURL(i)"
      style="width:100%;"
    ></v-carousel-item>
  </v-carousel>
  <!-- If it is redirected from navigation drawer, this button must be 돌아가기 -->
  <v-btn color="primary" block @click.native="goNext">다 봤어요!</v-btn>
    </v-flex>
</template>
<script>
  export default {
    beforeRouterEnter (to, from, next) {
      next(vm => {
        vm.prevRoute = from
      })
    },
    data () {
      return {
        prevRoute: ''
      }
    },
    methods: {
      imgURL: function (val) {
        switch (this.userGroup) {
          case 1:
          case 2:
            return 'tutorialA/' + val + '.PNG'
          case 3:
          case 4:
            return 'tutorialB/' + val + '.PNG'
          case 5:
          case 0:
            return 'tutorialC/' + val + '.PNG'
          case -1:
            return 'tutorialG/' + val + '.PNG'
        }
      },
      goNext: function () {
        if (this.prevRoute === '/SignUp') {
          switch (this.userGroup) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 0:
              this.$router.push('/PreSurvey')
              break
            case -1:
              this.$router.push('/ShowPolicies')
          }
        } else {
          this.$router.go(-1)
        }
      }
    },
    computed: {
      userGroup: function () {
        if (!this.$store.state.user.isParticipant) {
          return -1
        } else {
          return this.$store.getters.experimentCondition
        }
      },
      tutorialImg: function () {
        switch (this.userGroup) {
          case 1:
          case 2:
            return 6
          case 3:
          case 4:
            return 7
          case 5:
          case 0:
            return 8
          case -1:
            return 4
        }
      }
    }
  }
</script>
