<template>
  <v-flex d-flex xs6>
    <v-card color="success" dark ripple @click.capture="onStakeholderOverviewItemClick">
      <v-card-title primary>
        <span class="name">{{stakeholder.name}}</span>
      </v-card-title>
      <v-card-text>
        <small> +: {{positiveText}}</small>
        <br>
        <small> -: {{negativeText}}</small>
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
  computed: {
    positiveText: function () {
      if (this.stakeholder.keywords.positive.length > 33) {
        return this.stakeholder.keywords.positive.slice(0, 30).concat('...')
      } else {
        return this.stakeholder.keywords.positive
      }
    },
    negativeText: function () {
      if (this.stakeholder.keywords.negative.length > 33) {
        return this.stakeholder.keywords.negative.slice(0, 30) + '...'
      } else {
        return this.stakeholder.keywords.negative
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

