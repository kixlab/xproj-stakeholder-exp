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
      설문 없이 시스템을 둘러보며 정책을 알아가실 분은 '건너뛰기' 버튼을 눌러주세요!
    </v-flex>
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
  methods: {
    gohome () {
      this.$router.push('/')
    }
  }
}
</script>