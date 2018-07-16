<template>
  <v-flex xs12>
    <a @click.prevent="showDetails = !showDetails">{{promise}}</a>
    <v-slide-y-transition>
      <div v-show="showDetails">
        설명이 있어야 좋을까요....
      </div>
    </v-slide-y-transition>
  </v-flex>
</template>
<script>
export default {
  props: {
    promise: String
  },
  data: function () {
    return {
      showDetails: false
    }
  }
}
</script>
<style scoped>
a {
  cursor: pointer;
}
</style>


