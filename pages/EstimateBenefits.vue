<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <v-form>
        <!-- <v-flex class="prompt">이 공약으로 가장 큰 혜택을 받는 사람들은 누구일까요?</v-flex> -->
        이 공약으로 가장 큰 혜택을 받는 사람들은 누구인가요?
        <v-text-field>
        </v-text-field>
        그 사람들은 어떤 혜택을 받나요?
        <v-text-field>
        </v-text-field>
        <!-- <v-flex class="prompt">그 사람들은 어떤 혜택을 받을까요?</v-flex> -->
        <!-- <textarea></textarea> -->
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
