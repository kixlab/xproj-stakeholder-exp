<template>
  <v-layout row wrap justify-center>
    <v-form xs12>
      <p class="prompt">이 공약으로 혜택이나 손해를 받으시나요?</p>
      <!-- <v-btn-toggle v-model="toggle_exclusive"> -->
        <v-btn color="error">손해</v-btn> <v-btn>해당 없음</v-btn> <v-btn color="success">혜택</v-btn>
      <!-- </v-btn-toggle> -->
      <p class="prompt">어떤 혜택을/손해를 받으시나요?</p>
      <v-text-field>
      </v-text-field>
      <p class="prompt">어떤 사람들이 혜택을/손해를 받을까요?</p>
      <v-text-field>
      </v-text-field>
      <v-btn block color="primary" to="EstimateDemerits">다음</v-btn>
    </v-form>
  </v-layout>
</template>
<script>
export default {
  data: function () {
    return {
      toggle_exclusive: []
    }
  }
}
</script>
<style scoped>

</style>
