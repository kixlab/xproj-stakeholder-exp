<template>
  <div>
    <v-card>
      <v-card-title>
        <h3 style="text-align:left;">{{effect.stakeholder_detail}}</h3>
        <v-spacer/>
        <v-icon :color="effect.isBenefit ? 'primary' : 'error'">
          {{effect.isBenefit ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied'}}
        </v-icon>
      </v-card-title>
      <v-card-text>
        <a @click="onShowDescriptionButtonClick">{{show ? effect.description : shortDescription}}</a>
      </v-card-text>
      <v-card-actions>
        <v-btn flat small outline color="primary" @click.stop="onNoveltyButtonClick">
          새로워! {{effect.novelty}}
        </v-btn>
        <v-btn flat small outline color="error" @click.stop="onEmpathyButtonClick">
          공감해! {{effect.empathy}}
        </v-btn>
        <pre>  </pre>

        <v-dialog v-model="dialog" width="500">
          <v-icon slot="activator" color="red lighten-2" ripple>
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
                @click="dialog = false"
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
        <v-spacer></v-spacer>
        <v-btn icon @click="onShowDescriptionButtonClick" v-if="effect.description.length > 40">
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

<style scoped>
.v-card__text {
  text-align: left !important;
  padding-bottom: 0;
}
.v-card__title {
  padding-bottom: 0;
}
a {
  color: black;
}
</style>

<script>
import setTokenMixin from '~/mixins/setToken.js'
export default {
  data: () => ({
    show: false,
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
        return ('stakeholder_group' in value) && ('stakeholder_detail' in value) && ('description' in value)
      }
    }
  },
  computed: {
    shortDescription: function () {
      if (this.effect.description.length > 40) {
        return this.effect.description.slice(0, 23) + '...'
      } else {
        return this.effect.description
      }
    }
  },
  methods: {
    onShowDescriptionButtonClick: function () {
      console.log(this.$router.currentRoute.path)
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
        this.$store.dispatch('incrementUserPolicyEffectsSeen')
      }
      this.show = !this.show
    },
    onNoveltyButtonClick: async function () {
      try {
        await this.$axios.$post('/api/novelty/', {
          effect: this.effect.id
        })
        this.$store.commit('incrementNoveltyCount', {
          effect: this.effect.id
        })
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'UpvoteNovelty',
          eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
          eventValue: 0
        })
        const result = await this.$axios.$get('/api/effects/', {
          params: {
            policy: this.$store.state.policyIdx,
            stakeholder_group: this.$store.getters.randomStakeholderGroup.id
          }
        })
        this.$store.commit('setEffects', result.results)
      } catch (err) {
        console.log(err)
      }
    },
    onEmpathyButtonClick: async function () {
      try {
        await this.$axios.$post('/api/empathy/', {
          effect: this.effect.id
        })
        this.$store.commit('incrementEmpathyCount', {
          effect: this.effect.id
        })
        this.$ga.event({
          eventCategory: this.$router.currentRoute.path,
          eventAction: 'UpvoteEmpathy',
          eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
          eventValue: 0
        })
        const result = await this.$axios.$get('/api/effects/', {
          params: {
            policy: this.$store.state.policyIdx,
            stakeholder_group: this.$store.getters.randomStakeholderGroup.id
          }
        })
        this.$store.commit('setEffects', result.results)
      } catch (err) {
        console.log(err)
      }
      // this.$emit('empathy-button-click')
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
        eventAction: 'Flag',
        eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
        eventValue: 0
      })
    }
  }
}
</script>


