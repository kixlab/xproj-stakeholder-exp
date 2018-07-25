<template>
  <v-flex xs12>
    <a @click.prevent="showDetails = !showDetails">{{promise.title}}</a>
    <v-slide-y-transition>
      <div v-show="showDetails">
        {{promise.description}}
      </div>
    </v-slide-y-transition>
  </v-flex>
</template>
<script>
export default {
  props: {
    promise: {
      validator: function (value) {
        return ('title' in value) && ('description' in value)
      }
    }
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


