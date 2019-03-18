export default {
  computed: {
    userGroup: function () {
      return this.$store.getters.userGroup
    }
  },
  methods: {
    goNext: function () { // userGroup: [0, 3, 4, 5] --> 0 & 4 will see the second policy first, while 3 & 5 will see the first policy first
      if (this.userGroup === 0 || this.userGroup === 3) {
        this.$router.push('/ShowPolicies') // condition A
      } else if (this.userGroup === 4 || this.userGroup === 5) {
        this.$router.push('/EffectsList') // condition B
      }
      // if (this.userGroup === 0 || this.userGroup === 3) {
      //   this.$router.push('/EffectsList') // condition B
      // } else if (this.userGroup === 4 || this.userGroup === 5) {
      //   this.$router.push('/TagOverview') // condition C
      // }
    }
  }
}
