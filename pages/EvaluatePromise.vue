<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <p class="promise">공약</p>
    </v-flex>
    <v-flex xs12>
      <v-form>
        <p class="prompt">이 공약은 우리 사회에 도움이 될까요? </p>
        <v-btn v-for="i in 5" :key="i" primary>{{i}}</v-btn>
        <p class="prompt">왜 그렇게 생각하시나요?</p>
        <v-text-field></v-text-field>
        <v-btn block color="primary" to="EstimateDemerits">다음</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
}
</script>
<style scoped>

</style>
