<template>
  <v-layout row wrap>
  <v-flex xs12 class="card__tag">
    <v-card tile ripple @click.capture="onTagClick" :class="cls">
      <v-card-title>
        <v-flex xs7 style="text-align: left;">
          <span class="card__tag__title">#{{tag.tag}}</span>
          <br>
          <span class="blue--text caption">긍정 {{tag.pos_count}}</span>
          <span class="caption"> vs </span>
          <span class="red--text caption">{{tag.neg_count}} 부정</span>
        </v-flex>
        <v-flex xs5 style="text-align: right;">
          <!-- <span class="blue--text caption">긍정 {{tag.pos_count}}</span>
          <span class="caption"> vs </span>
          <span class="red--text caption">{{tag.neg_count}} 부정</span> -->
          <v-icon v-if="important">
            priority_high
          </v-icon>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <!-- <v-flex row wrap> 
          <v-progress-linear
          v-model="pos"
          :buffer-value="ref"
          buffer
          color="blue"
          background-color="red">
          </v-progress-linear>
        <span style="color:blue;"><strong>찬성 {{tag.pos_count}}개</strong></span>
        vs
        <span style="color:red;"><strong>반대 {{tag.neg_count}}개</strong></span>
        </v-flex> -->
      </v-card-text>
    </v-card>
  </v-flex>
  <!-- <v-flex xs2>
    <v-btn fab flat dark small color="primary" style="margin:0;">
      <v-icon>arrow_forward</v-icon>
    </v-btn>
    <v-btn fab flat dark small color="warning" style="margin:0;">
      <v-icon>expand_more</v-icon>
    </v-btn>
  </v-flex> -->
  </v-layout>
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
    },
    cls: String,
    important: Boolean
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
.small {
 font-size: 9pt;
}

.blued {
  color: blue;
}

.reded {
  color: red;
}

.card__tag {
  margin-bottom: 0.5em;
}

.card__tag__title {
  cursor: pointer;
  font-size: 11pt;
  font-weight: 700;
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
