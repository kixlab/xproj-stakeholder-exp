export default {
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
      let newSearchString = this.search.repeat(1)
      if (!numStrs) {
        return this.search
      }
      numStrs.forEach((numStr) => {
        let hanValue = ''
        let manCount = 0 // 만단위 0이 아닌 금액 카운트.
        const numLength = numStr.length
        for (let i = 0; i < numLength; i++) {
          // 1단위의 문자로 표시.. (0은 제외)
          let strTextWord = arrNumberWord[numStr.charAt(i)]
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
      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    validateInput: function (input) {
      if (input.length < 2) {
        return '태그의 숫자가 너무 적습니다'
      }
      return input.reduce((prev, cur) => {
        if (prev !== true) {
          return prev
        } else if ((prev === true) && cur.name) {
          return true
        } else if ((prev === true) && !cur.name) {
          if (cur.length < 2) {
            return '태그 길이가 너무 짧습니다.'
          } else if (cur.length > 15) {
            return '태그 길이가 너무 깁니다.'
          } else {
            return true
          }
        }
      }, true)
    }
  }
}
