<template>
  <v-list-tile avatar ripple class='previous'>
    <v-list-tile-content>
      <v-list-tile-title>{{stakeholder}}</v-list-tile-title>
      <v-list-tile-sub-title class="text--primary multiline">{{effect}}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn-toggle v-model="stakeholder.isBenefit">
        <v-btn outline round color="primary" class="binarybtn">혜택</v-btn>
        <v-btn outline round color="error" class="binarybtn">솝해</v-btn>
      </v-btn-toggle>
    </v-list-tile-action>
  </v-list-tile>
</template>
<script>
export default {
  props: {
    stakeholder: {
      validator: function (value) {
        return ('stakeholder' in value) && ('effect' in value)
      }
    }
  }
}
</script>
<style scoped>

</style>


