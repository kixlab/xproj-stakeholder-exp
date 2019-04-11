<template>
  <!-- <v-layout row wrap>
    <v-flex xs12 class="card__tag">
      <v-card tile ripple @click.capture="onTagClick">
        <v-card-title>
          <v-flex xs7 style="text-align: left;">
            <span class="card__tag__title">#{{tag.tag}}</span>
          </v-flex>
          <v-flex xs5 style="text-align: right;">
            <span class="blue--text">찬 {{tag.pos_count}}</span>
            <span class=""> vs </span>
            <span class="red--text">반 {{tag.neg_count}}</span>
          </v-flex>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout> -->
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title class="myfont">#{{tag.tag}}</v-list-tile-title>
      <v-list-tile-subtitile>
        <span class="blue--text myfont">찬 {{tag.pos_count}}</span>
        <span class="myfont">vs</span>
        <span class="red--text myfont">반 {{tag.neg_count}}</span>
      </v-list-tile-subtitile>
    </v-list-tile-content>
  </v-list-tile>
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
    cls: String
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

.myfont {
  font-family: "Noto Sans KR"
}

.card__tag__title {
  cursor: pointer;
  font-size: 11pt;
  font-weight: bold; 
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
