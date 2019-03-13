<template>
  <v-flex lg4 class="card__tag">
    <v-card tile ripple @click.capture="onTagClick">
      
      
      <v-card-title>
        <v-flex xs9>
        <h3 style="text-align: left;">
          <span class="card__tag__title">
            {{tag.name}}
          </span>
        </h3>
        </v-flex>
        <v-flex xs3>
          <span class="card__tag__title">총 {{tag.total_count}}개</span>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <v-flex row wrap> 
        <v-progress-linear
        v-model="pos"
        :buffer-value="ref"
        buffer
        color="blue"
        background-color="red">
        </v-progress-linear>
        <span style="color:blue;"><strong>찬성 {{tag.positive}}개</strong></span>
        vs
        <span style="color:red;"><strong>반대 {{tag.negative}}개</strong></span>

        </v-flex>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    tag: {
      validator: function (tag) {
        return ('name' in tag) && ('total_count' in tag)
      }
    },
    maxValue: {
      type: Number
    }
  },
  computed: {
    pos: function () {
      return this.tag.positive / this.maxValue * 100
    },
    ref: function () {
      return this.tag.total_count / this.maxValue * 100
    }
  },
  methods: {
    onTagClick: function () {
      this.$emit('tag-click', this.tag.name)
    }
  }
}
</script>

<style scoped>
.card__tag {
  margin-bottom: 0.5em;
}

.card__tag__title {
  cursor: pointer;
}

.v-card__title {
  padding-top:10px;
  padding-bottom: 0px;
}

.v-card__text {
  padding-top:0px;
  padding-bottom: 10px;
}


</style>
