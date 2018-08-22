<template>
  <v-flex xs12>
    <v-carousel
      v-if="$vuetify.breakpoint.smAndDown"
      dark hide-controls
      :cycle="false"
      interval="60000">
      <v-carousel-item
        v-for="i in tutorialImg"
        :key="i"
        :src="imgURL(i)"
      ></v-carousel-item>
    </v-carousel>
    <v-carousel
      v-else
      light
      :cycle="false"
      interval="60000">
      <v-carousel-item
        v-for="i in tutorialImg"
        :key="i"
        :src="imgURL(i)"
      ></v-carousel-item>
    </v-carousel>
    <!-- If it is redirected from navigation drawer, this button must be 돌아가기 -->
    <v-btn color="primary" block @click.native="goNext">다 봤어요!</v-btn>
  </v-flex>
</template>
<script>
  export default {
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.prevRoute = from.path
      })
    },
    data () {
      return {
        prevRoute: ''
      }
    },
    methods: {
      imgURL: function (val) {
        console.log(val)
        switch (this.userGroup) {
          case 1:
          case 2:
            return '/tutorialA/' + val + '.PNG'
          case 3:
          case 4:
            return '/tutorialB/' + val + '.PNG'
          case 5:
          case 0:
            return '/tutorialC/' + val + '.PNG'
          case -1:
            return '/tutorialG/' + val + '.PNG'
        }
      },
      goNext: function () {
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'FinishTutorial',
          eventLabel: this.prevRoute,
          eventValue: 0
        })
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
          this.$router.push(this.prevRoute)
        }
      }
    },
    computed: {
      userGroup: function () {
        if (!this.$store.state.user.is_participant) {
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
            return 8
          case 5:
          case 0:
            return 9
          case -1:
            return 8
        }
      }
    }
  }
</script>
<style>
.v-jumbotron__image {
  /* max-width: 100%; */
  max-width: 90vw;
  object-fit: contain; 
  max-height: 100%
  /* min-width: 0px; */
}

.v-carousel__controls__item {
  width: 10px !important;
}
</style>
