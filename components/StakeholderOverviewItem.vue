<template>
  <v-flex d-flex xs6>
    <v-card color="success" dark ripple @click.capture="onStakeholderOverviewItemClick">
      <v-card-title primary>
        <span class="name">{{stakeholder.name}}</span>
      </v-card-title>
      <v-card-text>
        <small>{{stakeholder.keywords.positive}}</small>
        <small>{{stakeholder.keywords.negative}}</small>
      </v-card-text>
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
      this.$emit('stakeholder-item-click')
    }
  }
}
</script>
<style scoped>
.name {
  cursor: pointer;
}
small {
  cursor: pointer;
}
</style>

