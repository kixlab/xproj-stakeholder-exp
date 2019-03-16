<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12 sm12>
      이 정책으로 영향을 받는 사람은 누구일까요? 생각나는 대로 모두 적어주세요!
      <v-text-field clearable v-model="tag" append-outer-icon="add" @click:append-outer="onAddTagGuess" @keyup.enter="onAddTagGuess" />
      <v-flex>
        <v-card>
          <v-card-text>
            <template v-if="tags.length === 0">
              이해관계자를 적어주세요!
            </template>
            <v-chip v-for="tag in tags" close :key="tag">
              {{tag}}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-flex>
    <v-btn @click="onClickNextButton">이해관계자 확인하기</v-btn>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
export default {
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    }
  },
  data: function () {
    return {
      tags: [],
      tag: ''
    }
  },
  methods: {
    onClickNextButton: function () {
      this.$router.push('/TagOverview')
    },
    onAddTagGuess: function () {
      if (this.tag.length > 0) {
        this.tags.push(this.tag)
        this.tag = ''
      }
    }
  }
}
</script>

<style>

</style>
