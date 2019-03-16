<template>
  <v-flex lg4 class="card__tag">
    <v-card tile ripple @click.capture="onTagClick">
      
      
      <v-card-title>
        <v-flex xs6>
        <h3 style="text-align: left;">
          <span class="card__tag__title">
            #{{tag.tag}}
          </span>
        </h3>
        </v-flex>
        <v-flex xs6>
          <span style="color:blue;"><strong>찬성 {{tag.pos_count}}개</strong></span>
          vs
          <span style="color:red;"><strong>반대 {{tag.neg_count}}개</strong></span>
          <!--span class="card__tag__title">총 {{tag.total_count}}개</span-->
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
        <!--
        <span style="color:blue;"><strong>찬성 {{tag.pos_count}}개</strong></span>
        vs
        <span style="color:red;"><strong>반대 {{tag.neg_count}}개</strong></span>
-->
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
        return ('tag' in tag) && ('total_count' in tag)
      }
    },
    maxValue: {
      type: Number
    }
  },
  computed: {
    pos: function () {
      return this.tag.pos_count / this.maxValue * 100
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

.v-progress-linear {
  margin: 3px 0;
}
</style>
