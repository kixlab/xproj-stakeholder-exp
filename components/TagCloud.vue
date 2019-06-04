<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 lg9 grow ref="myCloudContainer" :style="`height: 40em;`">
      <svg ref="myCloud" style="width: 100%; height: 100%;">
        <g :transform="`translate(${svgWidth/2}, ${svgHeight/2})`"
            v-for="word in words"
            :key="word.text">
          <text 
            :fill-opacity="word.ratio"
            text-anchor="middle"
            :transform="`translate(${word.x}, ${word.y})rotate(${word.rotate})`"
            :style="`font-size: ${word.size}px; font-family: sans-serif; font-weight: ${word.weight}; fill: ${word.fill}; cursor: pointer; ${selectedKeyword && selectedKeyword.tag === word.tag ? 'stroke: #000000; stroke-width: 2px; ' : ''}`"
            @click="onSelectKeyword(word)"
            >
          {{word.text}}
          </text>
        </g>
      </svg>
    </v-flex>
    <v-flex lg3>
      <!-- <div class="triangle-obtuse" v-for="t in getHoverContext(hover.text)"
        :key="t"
        v-html="t">
                    @click="onKeywordSelected(word.tag)"

      </div> -->
      <!-- <div class="mybox"
        @drop.prevent="mybox1.push(drag)"
        @dragover.prevent="onDragover(drag)">
        가장 영향을 많이 받을 집단
        <div v-for="e in mybox1" 
          :key="e.tag"
          @click="onKeywordSelected(e.tag)"
          >
          {{e.tag}}
        </div>
      </div>
      <div class="mybox"
        @drop.prevent="mybox2.push(drag)"
        @dragover.prevent="onDragover(drag)">
        <div v-for="e in mybox2" 
          :key="e.tag"
          @click="onKeywordSelected(e.tag)"
          >
          {{e.tag}}
        </div>
      </div>
      <div class="mybox"
        @drop.prevent="mybox3.push(drag)"
        @dragover.prevent="onDragover(drag)">
        <div v-for="e in mybox3" 
          :key="e.tag"
          @click="onKeywordSelected(e.tag)"
          >
          {{e.tag}}
        </div>
      </div> -->
      <v-layout row wrap fill-height align-space-around>
        <!-- <v-flex xs2>
          <v-card dark color="grey" style="cursor: pointer;">
            <v-icon>
              chevron_right
            </v-icon>
          </v-card>
        </v-flex> -->
        <v-flex xs12 grow>
          <v-card outline
            color="blue-grey lighten-2"
            flat
            dark
            >
            <v-card-title class="title">
              기사에 많이 언급된 사람들
            </v-card-title>
            <v-card-text>
              <div v-for="t in importantTags" 
                :key="t"
                @click="onKeywordSelected(t)"
                class="mytags--article"
                style="cursor: pointer;"
                >
                <span class="mytag">{{t}}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 grow>
          <v-card dark color="green" @click="onDragover(0)" style="cursor: pointer;"
            :elevation="selectedKeyword && selectedKeyword.text ? 24 : 0">
            <v-card-title class="title">
              나와 관련있는 사람들
            </v-card-title>
            <v-card-text>
              <div v-if="mybox[0].length === 0 && selectedKeyword">
                여기를 눌러 집단을 추가해주세요!
              </div>
              <div v-else-if="mybox[0].length === 0">
                왼쪽에서 집단을 선택해보세요!
              </div>
              <div v-for="e in mybox[0]" 
                :key="e.tag"
                @click="onKeywordSelected(e.tag)"
                class="mytags"
                >
                <span class="mytag">{{e.tag}}</span>
                <v-btn class="mybtn" small icon @click.stop="removeTag(0, e)">
                  <v-icon small>
                    close
                  </v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 grow>
          <v-card dark color="light-blue" @click="onDragover(1)" style="cursor: pointer;" 
            :elevation="selectedKeyword && selectedKeyword.text ? 24 : 0">
            <v-card-title class="title">
              예상하지 못한 사람들
            </v-card-title>
            <v-card-text>
              <div v-if="mybox[1].length === 0 && selectedKeyword">
                여기를 눌러 집단을 추가해주세요!
              </div>
              <div v-else-if="mybox[1].length === 0">
                왼쪽에서 집단을 선택해보세요!
              </div>
              <div v-for="e in mybox[1]" 
                :key="e.tag"
                @click="onKeywordSelected(e.tag)"
                class="mytags"
                >
                <span class="mytag">{{e.tag}}</span>
                <v-btn class="mybtn" small icon @click.stop="removeTag(1, e)">
                  <v-icon small>
                    close
                  </v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 grow>
          <v-card dark color="red" @click="onDragover(2)" style="cursor: pointer;"
            :elevation="selectedKeyword && selectedKeyword.text ? 24 : 0">
            <v-card-title class="title">
              의견을 예상할 수 있는 사람들
            </v-card-title>
            <v-card-text>
              <div v-if="mybox[2].length === 0 && selectedKeyword">
                여기를 눌러 집단을 추가해주세요!
              </div>
              <div v-else-if="mybox[2].length === 0">
                왼쪽에서 집단을 선택해보세요!
              </div>
              <div v-for="e in mybox[2]" 
                :key="e.tag"
                >
                <span class="mytag" @click.stop="onKeywordSelected(e.tag)">{{e.tag}}</span>
                <v-btn class="mybtn" small icon @click.stop="removeTag(2, e)">
                  <v-icon small>
                    close
                  </v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import cloud from 'd3-cloud'

export default {
  mounted: function () {
    this.$nextTick(async function () {
      this.words = this.tags.filter(t => {
        return (t.pos_count + t.neg_count) >= 3
      }).map(w => {
        return {
          text: `#${w.tag}`,
          size: 60, // Math.sqrt(w.pos_count + w.neg_count) * 10 + 3,
          tag: w.tag,
          important: this.importantTags.includes(w.tag),
          fill: this.fill(w)
        }
      })
      this.svgWidth = this.$refs.myCloudContainer.clientWidth
      this.svgHeight = this.$refs.myCloudContainer.clientHeight
    })
  },
  watch: {
    // keywords: function (newKeywords) {
    //   this.words = newKeywords.map(w => {
    //     return {
    //       text: w[0],
    //       size: w[1] * 8,
    //       type: w[2],
    //       ratio: w[3]
    //     }
    //   })
    //   const width = this.svgWidth
    //   const height = this.svgHeight
    //   cloud().size([width, height]).words(this.words)
    //     .rotate(0)
    //     .font('sans-serif')
    //     .fontSize(d => d.size)
    //     .start()
    // },
    // effects: function (newEffects) {
    //   this.words = this.keywords.map(w => {
    //     return {
    //       text: w[0],
    //       size: w[1] * 8,
    //       type: w[2],
    //       ratio: w[3]
    //     }
    //   })
    //   const width = this.svgWidth
    //   const height = this.svgHeight
    //   cloud().size([width, height]).words(this.words)
    //     .rotate(0)
    //     .font('sans-serif')
    //     .fontSize(d => d.size)
    //     .start()
    // },
    svgWidth: function (newWidth) {
      cloud().size([newWidth, this.svgHeight]).words(this.words)
        .rotate(0)
        .font('sans-serif')
        .fontSize(d => d.size)
        .fontWeight(d => d.important ? '550' : '400')
        .start()
    }
  },
  data: function () {
    return {
      words: [],
      svgWidth: 0,
      svgHeight: 0,
      hover: false,
      selectedKeyword: null,
      drag: ''
    }
  },
  methods: {
    fill: function (word) {
      if (word.pos_count >= 2 * word.neg_count) {
        return '#03A9F4'
      } else if (word.pos_count * 2 <= word.neg_count) {
        return '#F44336'
      // } else if (type === 'both') {
      //   return '#673AB7'
      } else {
        return '#607D88'
      }
    },
    onKeywordSelected: function (text) {
      this.$emit('keyword-selected', text)
    },
    getHoverContext: function (text) {
      const regex = new RegExp(`[^ ]* [^ ]+ [^ ]*${text}[^ ]* [^ ]+ [^ ]*`)
      const res = this.effects.map((e) => {
        return e.description.match(regex)
      }).filter(e => {
        return e
      }).slice(0, 5).map(d => {
        return '...' + d[0].replace(new RegExp(text, 'gi'), `<span style="font-weight: bold">${text}</span>`) + '...'
      })
      // console.log(res)
      return res
    },
    onDragover: function (i) {
      if (this.selectedKeyword) {
        this.$store.commit('addMyBox', {keyword: this.selectedKeyword, idx: i})
        // this.mybox[i].push(this.selectedKeyword)
        this.selectedKeyword = null
      }
      // console.log(drag)
    },
    onSelectKeyword: function (word) {
      if (this.selectedKeyword && (this.selectedKeyword.tag === word.tag)) {
        this.selectedKeyword = null
      } else {
        this.selectedKeyword = word
      }
    },
    removeTag: function (i, tag) {
      this.$store.commit('removeFromMyBox', {idx: i, tag: tag})
    }
  },
  computed: {
    tags: function () {
      return this.$store.state.tags
    },
    importantTags: function () {
      return this.$store.state.policy.key_stakeholders
    },
    mybox: function () {
      return this.$store.state.mybox
    }
  }
}
</script>

<style scoped>
.mybox {
  /* outline: black solid 1px; */
  height: 30%;
  margin: 3% 0 0 0;
}

.mytag {
  font-size: 1.1em;
  text-decoration: underline;
}
.v-card__title {
  word-break: keep-all;
}
/* .myshine:after {
  animation: shine 2s ease-in-out infinite;
  animation-fill-mode: forwards;
  content: "";
  position: absolute;
  top: -110%;
  left: -210%;
  width: 200%;
  height: 200%;
  opacity: 0;
  transform: rotate(30deg);
  
  background: rgba(255, 255, 255, 0.13);
  background: linear-gradient(
    to right, 
    rgba(255, 255, 255, 0.13) 0%,
    rgba(255, 255, 255, 0.13) 77%,
    rgba(255, 255, 255, 0.5) 92%,
    rgba(255, 255, 255, 0.0) 100%
  ); 
} */
.triangle-obtuse {
  position:relative;
  padding:1em;
  margin:1em 0 2em;
  width: 98%;
  /* color:#fff; */
  background:#3f51b540;
  /* css3 */
  /* background:-webkit-gradient(linear, 0 0, 0 100%, from(#f04349), to(#c81e2b));
  background:-moz-linear-gradient(#f04349, #c81e2b);
  background:-o-linear-gradient(#f04349, #c81e2b);
  background:linear-gradient(#f04349, #c81e2b); */
  /* -webkit-border-radius:10px;
  -moz-border-radius:10px; */
  border-radius:0.6em;
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
.mytags {
  width: fit-content;
  margin: auto;
}

.title {
  margin: auto;
}
.mybtn {
  margin: 0 !important;
}
@keyframes shine {
  10% {
    opacity: 1;
    top: -30%;
    left: -30%;
    transition-property: left, top, opacity;
    transition-duration: 0.7s, 0.7s, 0.15s;
    transition-timing-function: ease;
  }
  100% {
    opacity: 0;
    top: -30%;
    left: -30%;
    transition-property: left, top, opacity;
  }
}
</style>
