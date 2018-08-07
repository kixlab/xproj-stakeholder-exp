<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title style="margin: 0 auto;">
        <div>
          <!-- Length of policy name should be less than 18 Korean syllables -->
          <!-- The line must be ended with a single space -->
          <small> 회원가입 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      안녕하세요!
      데꿀멍을 통해 정책이 우리의 삶에 끼치는 영향을 알아보세요!
    </v-flex>
  </v-layout>
</template>
<style scoped>
#lala {
  margin: 0 auto;
  cursor: pointer;
}
</style>