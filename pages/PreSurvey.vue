<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title id="header">
        <v-icon dark id="gohome" @click="gohome">home</v-icon>
        <div style="flex: 1;">
          <!-- The line must be ended with a single space -->
          <small> 사용 전 설문 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
        
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      시스템 이용 전후 설문조사와, 시스템 내에서 정책 세 번에 대해 여러분의 목소리를 들려주시면
      10,000원 상당의 기프티콘을 드립니다. (약 1시간 소요) <br>
    </v-flex>
    <v-btn block color="primary" @click="onClickComplete">완료</v-btn>
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
  // TODO: fetch policy list
  computed: {
    experimentCondition: function () {
      return this.$store.getters.experimentCondition
    }
  },
  methods: {
    gohome () {
      this.$router.push('/')
    },
    onClickComplete: function () {
      switch (this.experimentCondition) {
        case 1:
        case 2:
          this.$router.push('ReadNews')
          break
        case 3:
          this.$store.commit('setPolicy', this.$store.state.policies[1])
          this.$router.push('SelectStakeholder')
          break
        case 4:
          this.$store.commit('setPolicy', this.$store.state.policies[0])
          this.$router.push('SelectStakeholder')
          break
        case 5:
          this.$store.commit('setPolicy', this.$store.state.policies[1])
          this.$router.push('Identify')
          break
        case 0:
          this.$store.commit('setPolicy', this.$store.state.policies[0])
          this.$router.push('Identify')
          break
      }
    }
  }
}
</script>