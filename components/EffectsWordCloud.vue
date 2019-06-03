<template>
  <v-layout>
    <v-flex xs8 lg8 grow ref="myCloudContainer" :style="`height: 40em;`">
      <svg ref="myCloud" style="width: 100%; height: 100%;">
        <g :transform="`translate(${svgWidth/2}, ${svgHeight/2})`">
          <text v-for="word in words"
            :key="word.text"
            :fill-opacity="Math.sqrt(word.ratio * word.ratio * word.ratio)"
            text-anchor="middle"
            :transform="`translate(${word.x}, ${word.y})rotate(${word.rotate})`"
            :style="`font-size: ${word.size}px; font-family: 'sans-serif'; fill: ${fill(word.type)}; cursor: pointer; ${selectedKeyword === word.text ? 'stroke: #000000; stroke-width: 2px; ' : ''}`"
            @click="onKeywordSelected(word.text)"
            @mouseover="hover = word"
            @mouseleave="hover = null"
            >
          {{word.text}}
          </text>
        </g>
      </svg>
    </v-flex>
    <v-flex xs4 lg4 v-if="hover">
      <div class="triangle-obtuse" v-for="t in getHoverContext(hover.text)"
        :class="t.isBenefit ? 'pos' : 'neg'"
        :key="t.description"
        v-html="t.description">
      </div>
    </v-flex>
    <v-flex xs3 lg3 v-else>
      <ul>
        <!-- <li>
          <span class="light-blue--text">긍정적 영향에서 많이 등장한 단어</span>는 파랗게 보여집니다.
        </li>
        <li>
          <span class="red--text">부정적 영향에서 많이 등장한 단어</span>는 빨갛게 보여집니다.
        </li> -->
        <li>
          다른 사람들에 비해 #{{tagHigh.tag}} 집단이 많이 사용한 단어일수록 진하게 보여집니다.
        </li>
        <li>
          단어에 마우스를 가져다 대면 단어가 사용된 문장을 보실 수 있습니다.
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
import cloud from 'd3-cloud'

export default {
  mounted: function () {
    this.$nextTick(async function () {
      this.words = this.keywords.map(w => {
        return {
          text: w[0],
          size: w[1] * 6,
          type: w[2],
          ratio: w[3]
        }
      })
      this.svgWidth = this.$refs.myCloudContainer.clientWidth
      this.svgHeight = this.$refs.myCloudContainer.clientHeight
    })
  },
  watch: {
    keywords: function (newKeywords) {
      this.words = newKeywords.map(w => {
        return {
          text: w[0],
          size: Math.sqrt(w[1] * 8),
          type: w[2],
          ratio: w[3]
        }
      })
      const width = this.svgWidth
      const height = this.svgHeight
      cloud().size([width, height]).words(this.words)
        .rotate(0)
        .font('sans-serif')
        .fontSize(d => d.size)
        .start()
    },
    effects: function (newEffects) {
      this.words = this.keywords.map(w => {
        return {
          text: w[0],
          size: w[1] * 8,
          type: w[2],
          ratio: w[3]
        }
      })
      const width = this.svgWidth
      const height = this.svgHeight
      cloud().size([width, height]).words(this.words)
        .rotate(0)
        .font('sans-serif')
        .fontSize(d => d.size)
        .start()
    },
    svgWidth: function (newWidth) {
      cloud().size([newWidth, this.svgHeight]).words(this.words)
        .rotate(0)
        .font('sans-serif')
        .fontSize(d => d.size)
        .start()
    }
  },
  props: {
    keywords: Array,
    selectedKeyword: String
  },
  data: function () {
    return {
      words: [],
      svgWidth: 0,
      svgHeight: 0,
      hover: false
    }
  },
  methods: {
    fill: function (type) {
      // if (type === 'pos') {
      //   return '#03A9F4'
      // } else if (type === 'neg') {
      //   return '#F44336'
      // } else if (type === 'both') {
      //   return '#673AB7'
      // } else {
      //   return '#607D88'
      // }
      return '#607D88'
    },
    onKeywordSelected: function (text) {
      this.$emit('keyword-selected', text)
    },
    getHoverContext: function (text) {
      // const regex = new RegExp(`[^ ]* [^ ]+ [^ ]*${text}[^ ]* [^ ]+ [^ ]*`)
      const regex = new RegExp(`[^.]*${text}[^.]*`) // sentence containing the word
      const res = this.effects.map((e) => {
        return {
          description: e.description.match(regex),
          isBenefit: e.isBenefit
        }
      }).filter(e => {
        return e.description
      }).slice(0, 5).map(d => {
        return {
          description: d.description[0].replace(new RegExp(text, 'gi'), `<span style="font-weight: bold">${text}</span>`),
          isBenefit: d.isBenefit
        }
      })
      // console.log(res)
      return res
    }
  },
  computed: {
    effects: function () {
      return this.$store.state.effects
    },
    tagHigh: function () {
      return this.$store.state.tagHigh
    }
  }
}
</script>

<style scoped>

li {
  word-break: keep-all;
}
.triangle-obtuse {
  position:relative;
  padding:1em;
  margin:1em 0 2em;
  width: 98%;
  /* color:#fff; */
  /* background:#3f51b540; */
  /* css3 */
  /* background:-webkit-gradient(linear, 0 0, 0 100%, from(#f04349), to(#c81e2b));
  background:-moz-linear-gradient(#f04349, #c81e2b);
  background:-o-linear-gradient(#f04349, #c81e2b);
  background:linear-gradient(#f04349, #c81e2b); */
  /* -webkit-border-radius:10px;
  -moz-border-radius:10px; */
  border-radius:0.6em;
}

.pos {
  background: #B3E5FC;
}

.pos:before {
  border-color: transparent #B3E5FC !important;
}

.neg {
  background: #FFCDD2;
}

.neg:before {
  border-color: transparent #FFCDD2 !important;
}

/* creates the wider right-angled triangle */
.triangle-obtuse:before {
  content:"";
  position:absolute;
  bottom:-2em; /* value = - border-top-width - border-bottom-width */
  left:25%; /* controls horizontal position */
  border:0;
  border-left-width:2em; /* vary this value to change the angle of the vertex */
  border-bottom-width:2em; /* vary this value to change the height of the triangle. must be equal to the corresponding value in :after */
  border-style:solid;
  border-color:transparent #3f51b540;
  /* reduce the damage in FF3.0 */
  display:block;
  width:0;
}

/* creates the narrower right-angled triangle */
.triangle-obtuse:after {
  content:"";
  position:absolute;
  bottom:-2em; /* value = - border-top-width - border-bottom-width */
  left:25%; /* value = (:before's left) + (:before's border-right/left-width)  - (:after's border-right/left-width) */
  border:0;
  border-left-width:0.625em; /* vary this value to change the angle of the vertex */
  border-bottom-width:2em; /* vary this value to change the height of the triangle. must be equal to the corresponding value in :before */
  border-style:solid;
  border-color:transparent #fafafa;
  /* reduce the damage in FF3.0 */
  display:block;
  width:0;
}
</style>
