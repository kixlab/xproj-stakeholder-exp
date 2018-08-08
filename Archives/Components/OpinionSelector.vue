<template>
  <v-card>
    <v-card-actions>
      <span class="body-1">{{sort.type}}:</span>
      <span class="body-1">{{sort.value}}</span>
      <v-spacer></v-spacer>
      <v-btn icon @click.prevent="showFilter =! showFilter">
        <v-icon>{{ showFilter ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="showFilter">
        <v-layout row wrap>
          <v-flex xs6>
            <v-radio-group :input-value="sort.type" @change="onSortTypeChanged">
              <v-radio v-for="type in availableTypes" :key="type" :value="type" :label="String(type)"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs6>
            <v-radio-group v-model="sort.value" @change="showFilter=false">
              <v-radio v-for="value in availableValues" :key="value" :value="value" :label="String(value)"></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
    availableTypes: Array,
    availableValues: Array,
    sort: {
      type: Object,
      required: true,
      validator: function (sort) {
        return !(_.isUndefined(sort.type) || _.isUndefined(sort.value))
      }
    }
  },
  model: {
    prop: 'sort',
    event: 'change'
  },
  data: function () {
    return {
      showFilter: false
    }
  },
  methods: {
    onSortTypeChanged: function (type) {
      this.$emit('change', {type: type, value: ''})
    }
  }
}
</script>
<style scoped>
</style>


