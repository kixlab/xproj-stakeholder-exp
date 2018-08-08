<template>
  <v-flex d-flex xs6>
    <v-card color="purple" dark ripple @click.capture="onStakeholderOverviewItemClick">
      <v-card-title primary class="title">{{stakeholder.name}}</v-card-title>
      <v-card-text><small>{{stakeholder.keywords}}</small></v-card-text>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  props: {
    stakeholder: {
      validator: function (obj) {
        return ('name' in obj) && ('keywords' in obj)
      }
    }
  },
  methods: {
    onStakeholderOverviewItemClick: function () {
      console.log('fired')
      this.$emit('stakeholder-item-click', this.stakeholder.id)
    }
  }
}
</script>
<style scoped>

</style>

