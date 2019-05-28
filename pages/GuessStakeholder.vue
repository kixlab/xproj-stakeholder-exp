<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy"></promise-pane>
    <v-flex xs12 sm12>
      이 정책으로 영향을 받는 사람은 누구일까요? 생각나는 대로 모두 적어주세요!
      <v-text-field clearable v-model="tag" append-outer-icon="add" @click:append-outer="onAddTagGuess" @keyup.enter="onAddTagGuess" />
      <!-- <v-flex>
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
      </v-flex> -->
      <v-combobox
        :value="selectedTags"
        :items="tags"
        item-text="name"
        item-value="name"
        label="태그를 적어주세요"
        :search-input.sync="search"
        :filter="filter"
        multiple
        hide-selected
        chips
        :rules="[validateInput]"
        textarea
        validate-on-blur
        @input="onInput">

        <template slot="no-data">
          <v-list-tile>
            <v-list-tile-content>
              <v-chip color="blue lighten-3" label small>#{{hangulSearch}}</v-chip> 엔터키를 누르면 추가됩니다.
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template slot="item" slot-scope="{ index, item }">
          <v-chip color="blue lighten-3" label small>#{{item.name}}</v-chip>
          <v-spacer></v-spacer>
          {{item.total_count}}개
        </template>
        <template slot="selection" slot-scope="{ item, parent, selected }">
          <v-chip :selected="selected" label small>
            <span class="pr-2"> #{{item}} </span>
            <v-icon small @click="parent.selectItem(item)">close</v-icon>
          </v-chip>
        </template>
      </v-combobox>
      
    </v-flex>
    <v-btn @click="onClickNextButton">이해관계자 확인하기</v-btn>
  </v-layout>
</template>

<script>
import PromisePane from '~/components/PromisePane.vue'
import HangulSearchMixin from '~/mixins/hangulSearch.js'
export default {
  components: {
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    }
  },
  mixins: [HangulSearchMixin],
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
