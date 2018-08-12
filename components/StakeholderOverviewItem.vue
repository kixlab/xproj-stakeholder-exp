<template>
  <v-flex d-flex xs6>
    <v-card color="success" dark ripple @click.capture="onStakeholderOverviewItemClick">
      <v-card-title primary>{{stakeholder.name}}</v-card-title>
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

