<template>
  <v-combobox
    v-model="selectedTags"
    :items="tags"
    item-text="name"
    item-value="name"
    label="선택해주세요"
    :search-input.sync="search"
    :filter="filter"
    multiple
    chips>

    <template slot="no-data">
      <v-list-tile>
        <v-list-tile-content>
          <v-chip color="blue lighten-3" label small>{{hangulSearch}}</v-chip> 새로 만드시려면 엔터 키를 눌러주세요.
        </v-list-tile-content>
      </v-list-tile>
    </template>
    <template slot="item" slot-scope="{index, item, parent}">
      <v-chip color="blue lighten-3" label small>{{item.name}}</v-chip>
      <v-spacer></v-spacer>
      {{item.refs}}개
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      validator: function (arr) {
        return arr.reduce((prev, cur) => {
          return prev && ('name' in cur) && ('refs' in cur)
        })
      }
    },
    selectedTags: {
      type: Array
    }
  },
  model: {
    prop: 'selectedTags',
    event: 'change'
  },
  computed: {
    hangulSearch: function () {
      const arrNumberWord = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
      // 10,  100,  100 자리수 한글 표시
      const arrDigitWord = ['', '십', '백', '천']
      // 만단위 한글 표시
      const arrManWord = ['', '만', '억', '조']
      // Copyright 취생몽사(http://bemeal2.tistory.com)
      if (!this.search) {
        return null
      }
      // 소스는 자유롭게 사용가능합니다. Copyright 는 삭제하지 마세요.
      const numStrs = this.search.match(/\d+/g)
      console.log(numStrs)
      let newSearchString = this.search.repeat(1)
      if (!numStrs) {
        return this.search
      }
      numStrs.forEach((numStr) => {
        console.log(numStr)
        let hanValue = ''
        let manCount = 0 // 만단위 0이 아닌 금액 카운트.
        const numLength = numStr.length
        for (let i = 0; i < numLength; i++) {
          // 1단위의 문자로 표시.. (0은 제외)
          let strTextWord = arrNumberWord[numStr.charAt(i)]
          console.log(strTextWord)
          // 0이 아닌경우만,  십/백/천 표시
          if (strTextWord !== '') {
            manCount++
            strTextWord += arrDigitWord[(numLength - (i + 1)) % 4]
          }
          // 만단위마다 표시 (0인경우에도 만단위는 표시한다)
          if (manCount !== 0 && (numLength - (i + 1)) % 4 === 0) {
            manCount = 0
            strTextWord = strTextWord + arrManWord[(numLength - (i + 1)) / 4]
          }
          hanValue += strTextWord
        }

        newSearchString = newSearchString.replace(numStr, hanValue)
      })
      // 출처: http://bemeal2.tistory.com/67 [취생몽사]
      return newSearchString
    }
  },
  methods: {
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(this.hangulSearch)
      console.log(query)
      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    }
  },
  data: function () {
    return {
      search: ''
    }
  }
}
</script>

<style>

</style>
