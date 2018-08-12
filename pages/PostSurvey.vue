<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title id="header">
        <v-icon dark id="goback" @click="goback">arrow_back</v-icon>
        <div style="flex: 1;">
          <!-- The line must be ended with a single space -->
          <small> 사용 후 설문 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
        
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      <h1>수고 많으셨습니다!</h1>
      이제 마지막입니다.
      사용 후 설문조사를 완료하시면 10,000원 상당의 기프티콘을 드립니다.
    </v-flex>
  </v-layout>
</template>
<style scoped>
#goback {
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
  methods: {
    goback () {
      this.$router.push('showPolicies')
    }
  }
}
</script>