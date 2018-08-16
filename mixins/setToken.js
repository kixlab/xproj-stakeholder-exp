export default {
  mounted: function () {
    if (this.$store.state.userToken) {
      this.$axios.setToken(this.$store.state.userToken, 'Token')
    }
  }
}
