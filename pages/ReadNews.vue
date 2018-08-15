<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title id="header">
        <v-icon dark id="gohome" @click="gohome">home</v-icon>
        <div style="flex: 1;">
          <!-- The line must be ended with a single space -->
          <small> 기사 읽기 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
        
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          기사를 읽고, 정책을 이해해보세요!
        </v-card-text>
      </v-card>
    </v-flex>
    <v-btn block color="primary" @click="onClickComplete">다음</v-btn>
  </v-layout>
</template>
<style scoped>
#gohome {
    float: left;
    position: absolute;
}
#header {
    flex: 1;
    display: flex;
    position: relative;
}
</style>
<script>
export default {
  computed: {
    userGroup: function () {
      if (!this.$store.state.user.isParticipant) {
        console.log('fire')
        return -1
      } else {
        console.log(this.$store.getters.experimentCondition)
        return this.$store.getters.experimentCondition
      }
    },
    nextRoute: function () {
      switch (this.userGroup) {
        case 1:
        case 2:
          return 'MiniSurvey'
        case 3:
        case 4:
          return 'SelectStakeholder'
        case 5:
        case 0:
        case -1:
          return 'Identify'
      }
    }
  },
  methods: {
    gohome () {
      this.$router.push('/')
    },
    onClickComplete: function () {
      this.$router.push(this.nextRoute)
    }
  }
}
</script>