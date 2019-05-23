export default {
  computed: {
    userGroup: function () {
      return this.$store.getters.userGroup
    },
    surveyURLs: function () {
      return {
        'pre1': 'https://forms.gle/Z8HyJQ1SgFeCUcox9',
        'pre2': 'https://forms.gle/Z8HyJQ1SgFeCUcox9',
        'post1': 'https://forms.gle/Z8HyJQ1SgFeCUcox9',
        'post2': 'https://forms.gle/Z8HyJQ1SgFeCUcox9'
      }
    },
    preSurveyURLs: function () {
      if (this.policy.id === 1) {
        return 'https://forms.gle/Z8HyJQ1SgFeCUcox9'
      } else if (this.policy.id === 2) {
        return 'https://naver.com'
      }
    }
    // postSurveyURLs: function () {
    //   if (this.policy.id === 1) {
    //     switch (this.userGroup) {
    //       case 0:
    //       case 3:
    //       case 4:
    //       case 5:
    //     }
    //   } else if (this.policy.id === 2) {
    //     switch (this.userGroup) {
    //       case 0:
    //       case 3:
    //       case 4:
    //       case 5:
    //     }
    //   }
    // }
  },
  methods: {
    goNext: function () { // userGroup: [0, 3, 4, 5] --> 0 & 4 will see the second policy first, while 3 & 5 will see the first policy first
      // if (this.userGroup === 0 || this.userGroup === 3) {
      //   this.$router.push('/ShowPolicies') // condition A
      // } else if (this.userGroup === 4 || this.userGroup === 5) {
      //   this.$router.push('/EffectsList') // condition B
      // }
      // if (this.userGroup === 0 || this.userGroup === 3) {
      //   this.$router.push('/EffectsList') // condition B
      // } else if (this.userGroup === 4 || this.userGroup === 5) {
      //   this.$router.push('/TagOverview') // condition C
      // }
      if ((this.userGroup === 8 && this.policy.id === 1) ||
      (this.userGroup === 9 && this.policy.id === 1) ||
      (this.userGroup === 10 && this.policy.id === 2) ||
      (this.userGroup === 11 && this.policy.id === 2)) {
        this.$router.push('/TagOverview')
      } else if ((this.userGroup === 8 && this.policy.id === 2) ||
      (this.userGroup === 9 && this.policy.id === 2) ||
      (this.userGroup === 10 && this.policy.id === 1) ||
      (this.userGroup === 11 && this.policy.id === 1)) {
        this.$router.push('/EffectsList')
      }
    }
  }
}
