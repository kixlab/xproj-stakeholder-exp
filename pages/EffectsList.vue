<template>
  <v-container style="padding: 0;">
    <promise-pane :policy="policy"></promise-pane>
    <v-layout row wrap>
      <v-flex xs12>
        <opinion-revisit-pane />
      </v-flex>
      <v-flex xs12>
        <effects-pane 
          :effects="effects" 
          :count="count" 
          :onLoading="onLoading"
          @tag-high-click="onUpdateSelectedTagHigh" 
          @tag-low-click="onUpdateSelectedTagLow"
          :show-tags="false"/>
      </v-flex>
      <v-flex xs12>
        <v-btn block color="primary" @click="onShowPolicyListClick">
          다음 정책 보기
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import PromisePane from '~/components/PromisePane.vue'
import TagPane from '~/components/TagPane.vue'
import EffectsPane from '~/components/EffectsPane.vue'
import OverviewPane from '~/components/OverviewPane.vue'
import OpinionRevisitPane from '~/components/OpinionRevisitPane.vue'
import setTokenMixin from '~/mixins/setToken.js'

export default {
  fetch: async function ({app, store, params}) {
    const effects = await app.$axios.$get('/api/effects/', {
      params: {
        policy: store.state.policyId,
        include_guess: 0
      }
    })
    store.commit('setEffects', effects.results)
    store.commit('setKeywords', effects.keywords)
    store.commit('setKeywordsAll', effects.keywords)
    await store.dispatch('setTags')
  },
  components: {
    PromisePane,
    TagPane,
    EffectsPane,
    OverviewPane,
    OpinionRevisitPane
  },
  mixins: [setTokenMixin],
  data: function () {
    return {
      fab: false,
      opinionTexts: false,
      dialog: false,
      tag: null,
      show: false,
      show1: false,
      show2: false,
      count: 0,
      onLoading: false,
      onTagLoading: false,
      onTagLowLoading: false,
      effectFilter: [0, 1],
      tab: 0,
      expansionPanelValue: -1
    }
  },
  computed: {
    activeFab: function () {
      return {}
    },
    policy: function () {
      return this.$store.state.policy
    },
    effects: function () {
      return this.$store.state.effects
      // .filter(e => {
      //   return this.effectFilter.includes(e.isBenefit)
      // })
    },
    keywords: function () {
      return this.$store.state.keywords
    },
    tags: function () {
      return this.$store.state.tags
    },
    tagLows: function () {
      if (this.tagHigh) {
        return this.tagHigh.children.slice().sort((a, b) => {
          if (a.total_count < b.total_count) {
            return 1
          } else if (a.total_count > b.total_count) {
            return -1
          } else {
            return 0
          }
        })
      } else {
        return []
      }
    },
    tagHigh: function () {
      return this.$store.state.tagHigh
    },
    tagLow: function () {
      return this.$store.state.tagLow
    },
    tagHighInfo: function () {
      return this.$store.state.tagHighInfo
    },
    tagLowInfo: function () {
      return this.$store.state.tagLowInfo
    },
    filteredTags: function () {
      const ft = this.tags.filter((tag) => { return tag.total_count >= 3 })
      return ft.length > 0 ? ft : this.tags
    },
    userGroup: function () {
      return this.$store.getters.userGroup
    },
    closePositiveTags: function () {
      const tagList = this.tagHigh ? this.tagHigh.children : this.tags
      return tagList.filter((a) => {
        return a.pos_count >= a.neg_count * 2
      }).sort((a, b) => {
        return b.pos_count - a.pos_count
      }).slice(0, 3)
    },
    closeNegativeTags: function () {
      const tagList = this.tagHigh ? this.tagHigh.children : this.tags
      return tagList.filter((a) => {
        return a.pos_count * 2 <= a.neg_count
      }).sort((a, b) => {
        return b.neg_count - a.neg_count
      }).slice(0, 3)
    }
  },
  methods: {
    // onNewStakeholderClick: function () {
    //   this.$ga.event({
    //     eventCategory: this.$router.currentRoute.path,
    //     eventAction: 'NewStakeholder',
    //     eventLabel: this.policy.title,
    //     eventValue: 0
    //   })
    //   this.$router.push('/NewStakeholder')
    // },
    onUpdateSelectedTagHighByLink: function (tagTxt) {
      const tag = this.tags.find((t) => {
        return t.tag === tagTxt
      })
      this.onUpdateSelectedTagHigh(tag)
    },
    onUpdateSelectedTagHigh: async function (tag) {
      this.onLoading = true
      this.onTagLoading = true
      console.log('aaa')
      await this.$store.dispatch('setTagHigh', {tag: tag, effectFilter: this.effectFilter})
      this.onLoading = false
      this.onTagLoading = false
    },
    onTagHighReset: async function () {
      this.onLoading = true
      await this.$store.dispatch('setTagHigh', {tag: null, effectFilter: this.effectFilter})
      this.onLoading = false
    },
    onUpdateSelectedTagLow: async function (tag, isOpening, idx) {
      this.onLoading = true
      this.onTagLowLoading = true
      // if (!idx) {
      //   idx = this.tagLows.findIndex(t => {
      //     return t.tag === tag.tag
      //   })
      // }
      await this.$store.dispatch('setTagLow', {tag: tag, isOpening: isOpening, effectFilter: this.effectFilter})
      this.expansionPanelValue = idx
      this.onLoading = false
      this.onTagLowLoading = false
    },
    onUpdateSelectedTag: async function (tag) {
      this.onLoading = true
      await this.$store.dispatch('updateSelectedTag', tag)
      this.onLoading = false
    },
    // onEffectFilterChanged: async function (effectFilter, tab) {
    //   this.onLoading = true
    //   this.effectFilter = effectFilter
    //   this.tab = Number(tab) - 1
    //   this.onLoading = false
    // },
    onShowPolicyListClick: function () {
      // this.$ga.event({
      //   eventCategory: '/SelectStakeholder',
      //   eventAction: 'ShowPolicyList',
      //   eventLabel: this.policy.title,
      //   eventValue: 0
      // })
      if (!this.$store.state.userToken || !this.$store.state.user.is_participant || this.$store.state.user.step > 2) {
        this.$router.push('/ShowPolicies')
      } else {
        this.$router.push('/PostSurvey')
      }
    }
  }
}
</script>
<style>
.v-speed-dial {
  position: fixed;
}

</style>
<style scoped>
.link {
  cursor: pointer;
  word-break: keep-all;
}
.v-card__title {
  padding-bottom:0 !important;
  padding-top: 0 !important;
}

#btn_location {
  position: fixed;
  width: 100%;

  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 15px;

  /* background-color: rgb(120, 134, 219); */
  z-index: 1;
}

</style>


