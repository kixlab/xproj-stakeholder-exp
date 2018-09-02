<template>
  <div class="card__effect">
    <v-card :color="cardColor">
      <v-card-title>
        <v-flex xs10 style="text-align: left;">
        <strong><font size="3">{{effect.stakeholder_detail}}</font></strong>
        </v-flex>
        <v-flex xs2 style="text-align: right;">
          <v-icon :color="effect.isBenefit ? 'primary' : 'error'">
            {{effect.isBenefit ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied'}}
          </v-icon>
        </v-flex>
        <v-flex xs12 style="text-align: left;">
          <font size="2"><span style="text-align:left; color:blue;" v-for="tag in effect.tags" :key="tag">#{{tag}}&nbsp;&nbsp;</span></font>
        </v-flex>
      </v-card-title>      
      <v-card-text class="effect-card__textbox">
        <a @click="onShowDescriptionButtonClick">
          <span class="effect-card__text">{{expanded || show ? effect.description : shortDescription}}</span>
        </a>
      </v-card-text>
      <v-card-actions>
        <v-btn small :depressed="isNoveltyVoted" :outline="!isNoveltyVoted" color="primary" @click.stop="onNoveltyButtonClick">
          참신 {{effect.novelty.length}}

        </v-btn>
        <v-btn small :outline="!isEmpathyVoted" :depressed="isEmpathyVoted" color="primary" @click.stop="onEmpathyButtonClick">
          공감 {{effect.empathy.length}}

        </v-btn>
        <v-btn small :depressed="isFishyVoted" :outline="!isFishyVoted" color="error" @click.stop="onFishyButtonClick">
          의심 {{effect.fishy.length}}

        </v-btn>
        <v-spacer/>

        <v-dialog v-model="dialog" width="500">
          <v-icon slot="activator" color="red lighten-2" ripple @click="onShowReportDialog">
            report
          </v-icon>

          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
            <div class="dialog">
              신고하기
            </div>
            </v-card-title>

            <v-card-text>
              <div class="dialog">
              신고 사유를 간단히 적어주세요.<br>
              (욕설, 모욕, 성희롱 등 기타 부적절한 언행)
              <v-textarea box v-model="reportReason"/>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="onCloseReportDialog"
                ripple
              >
                돌아가기
              </v-btn>
              <v-btn
                color="error"
                flat
                @click="reportEffect"
                ripple
              >
                신고하기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-spacer v-if="!expanded"></v-spacer>
        <v-btn icon @click="onShowDescriptionButtonClick" v-if="!expanded && effect.description.length > 40">
          <v-icon>{{ show ? 'expand_less' : 'expand_more' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      bottom
      :timeout="3000"
    >
      접수되었습니다.
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        닫기
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import setTokenMixin from '~/mixins/setToken.js'
export default {
  data: () => ({
    show: false,
    showTooltip: false,
    dialog: false,
    snackbar: false,
    newClicked: false,
    yeaClicked: false,
    reportReason: ''
  }),
  mixins: [setTokenMixin],
  props: {
    source: String,
    effect: {
      validator: function (value) {
        return ('tags' in value) && ('description' in value)
      }
    },
    expanded: Boolean
  },
  computed: {
    shortDescription: function () {
      if (this.effect.description.length > 40) {
        return this.effect.description.slice(0, 23) + '...'
      } else {
        return this.effect.description
      }
    },
    isNoveltyVoted: function () {
      return this.effect.novelty.includes(this.$store.state.user.pk)
    },
    isEmpathyVoted: function () {
      return this.effect.empathy.includes(this.$store.state.user.pk)
    },
    isFishyVoted: function () {
      return this.effect.fishy.includes(this.$store.state.user.pk)
    },
    cardColor: function () {
      if (!this.effect.is_guess && this.effect.source !== 'guess') {
        return 'blue lighten-5'
      } else {
        return 'white'
      }
    }
  },
  methods: {
    onShowDescriptionButtonClick: function () {
      if (this.show) {
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'CloseDescription',
          eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
          eventValue: 0
        })
      } else {
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'OpenDescription',
          eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
          eventValue: 0
        })
        // this.$store.dispatch('incrementUserPolicyEffectsSeen')
      }
      this.show = !this.show
    },
    onNoveltyButtonClick: async function () {
      // this.$ga.event({
      //   eventCategory: this.$router.currentRoute.path,
      //   eventAction: this.isNoveltyVoted ? 'CancelUpvoteNovelty' : 'UpvoteNovelty',
      //   eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
      //   eventValue: 0
      // })
      // try {
      //   await this.$axios.$post('/api/novelty/', {
      //     effect: this.effect.id
      //   })
      //   this.$store.commit('incrementNoveltyCount', {
      //     effect: this.effect.id
      //   })
      // } catch (err) {
      //   if (err.response.status === 409) {
      //     this.$store.commit('decreaseNoveltyCount', {
      //       effect: this.effect.id
      //     })
      //   }
      // } finally {
      //   const result = await this.$axios.$get('/api/effects/', {
      //     params: {
      //       policy: this.$store.state.policyId,
      //       stakeholder_group: this.$store.getters.randomStakeholderGroup.id
      //     }
      //   })
      //   this.$store.commit('setEffects', result.results)
      // },
      this.$emit('novelty-button-click')
    },
    onEmpathyButtonClick: async function () {
      // this.$ga.event({
      //   eventCategory: this.$router.currentRoute.path,
      //   eventAction: this.isEmpathyVoted ? 'CancelUpvoteEmpathy' : 'UpvoteEmpathy',
      //   eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
      //   eventValue: 0
      // })
      // try {
      //   await this.$axios.$post('/api/empathy/', {
      //     effect: this.effect.id
      //   })
      //   this.$store.commit('incrementEmpathyCount', {
      //     effect: this.effect.id
      //   })
      // } catch (err) {
      //   if (err.response.code === 409) {
      //     this.$store.commit('decreaseEmpathyCount', {
      //       effect: this.effect.id
      //     })
      //   }
      // } finally {
      //   const result = await this.$axios.$get('/api/effects/', {
      //     params: {
      //       policy: this.$store.state.policyId,
      //       stakeholder_group: this.$store.getters.randomStakeholderGroup.id
      //     }
      //   })
      //   this.$store.commit('setEffects', result.results)
      // }
      this.$emit('empathy-button-click', this.effect)
    },
    onFishyButtonClick: async function () {
      // this.$ga.event({
      //   eventCategory: this.$router.currentRoute.path,
      //   eventAction: this.isFishyVoted ? 'CancelUpvoteFishy' : 'UpvoteFishy',
      //   eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
      //   eventValue: 0
      // })
      // try {
      //   await this.$axios.$post('/api/fishy/', {
      //     effect: this.effect.id
      //   })
      //   this.$store.commit('incrementFishyCount', {
      //     effect: this.effect.id
      //   })
      // } catch (err) {
      //   if (err.response.code === 409) {
      //     this.$store.commit('decreaseFishyCount', {
      //       effect: this.effect.id
      //     })
      //   }
      // } finally {
      //   const result = await this.$axios.$get('/api/effects/', {
      //     params: {
      //       policy: this.$store.state.policyId,
      //       stakeholder_group: this.$store.getters.randomStakeholderGroup.id
      //     }
      //   })
      //   this.$store.commit('setEffects', result.results)
      // }
      this.$emit('fishy-button-click', this.effect)
    },
    onShowReportDialog: function () {
      this.dialog = true
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenReportDialog',
        eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
        eventValue: 0
      })
    },
    onCloseReportDialog: function () {
      this.dialog = false
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'CancelReportDialog',
        eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
        eventValue: 0
      })
    },
    reportEffect: async function () {
      this.dialog = false
      this.snackbar = true
      // Report to server
      await this.$axios.$post('/api/flag/', {
        effect: this.effect.id,
        reason: this.reportReason
      })
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'AddNewReport',
        eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
        eventValue: 0
      })
    },
    onShowTooltipClick: function () {
      this.showTooltip = true
      setTimeout(() => { this.showTooltip = false }, 2000)
    }
  }
}
</script>
<style scoped>
.card__effect {
  margin-bottom: 0.5em;
}
.v-card__text {
  text-align: left !important;
  padding-bottom: 0;
}
.v-card__title {
  padding-bottom: 0;
}
.effect-card__text {
  color: black;
}
.effect-card__textbox {
  text-align: left !important;
}
.v-btn--small {
  min-width: 70px;
  padding: 0 !important;
}

a {
  color: black;
}
</style>


