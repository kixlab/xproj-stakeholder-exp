<template>
  <v-flex xs12 class="card__tag">
    <v-card tile ripple @click.capture="onTagClick">
      <v-card-title>
        <h3 style="text-align:left;">
          <span class="card__tag__title">
            {{tag.name}}
          </span>
        </h3>
        <v-spacer/>
        <span class="card__tag__title">{{tag.refs}}회</span>
      </v-card-title>
      <v-card-text>
        <v-progress-linear
        v-model="pos"
        :buffer-value="ref"
        buffer
        color="blue"
        background-color="red">
        </v-progress-linear>
      </v-card-text>
      <!-- <v-card-text class="effect-card__textbox">
        <a @click="onShowDescriptionButtonClick">
          <span class="effect-card__text">{{show ? effect.description : shortDescription}}</span>
        </a>
      </v-card-text> -->
      <!-- <v-card-actions>
        <v-btn small :depressed="isNoveltyVoted" :flat="!isNoveltyVoted" color="primary" @click.stop="onNoveltyButtonClick">
          참신 {{effect.novelty.length}}
        </v-btn>
        <v-btn small :depressed="isEmpathyVoted" :flat="!isEmpathyVoted" color="primary" @click.stop="onEmpathyButtonClick">
          공감 {{effect.empathy.length}}
        </v-btn>
        <v-btn small :flat="!isFishyVoted" :depressed="isFishyVoted" color="error" @click.stop="onFishyButtonClick">
          의심 {{effect.fishy.length}}
        </v-btn>

        <v-btn icon @click="onShowDescriptionButtonClick" v-if="effect.description.length > 40">
          <v-icon>{{ show ? 'expand_less' : 'expand_more' }}</v-icon>
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    tag: {
      validator: function (tag) {
        return ('name' in tag) && ('refs' in tag)
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
      return this.tag.refs / this.maxValue * 100
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
</style>
