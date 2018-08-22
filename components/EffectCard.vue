<template>
  <!-- <div>
    <v-card ripple @click.native="onShowDescriptionButtonClick">
      <v-card-title primary-title>
      <v-flex xs4 align-space-around fill-height row wrap>
        <v-card flat>
          <v-card-text>
            <small><strong>{{effect.stakeholder_detail}}</strong></small>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs8 fill-height row column wrap class="aa">
        <v-card flat>
          <v-card-text>
            <div class="left-align">
            <font size="2">{{show ? effect.description : shortDescription}}</font>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      </v-card-title>

      <v-divider light></v-divider>
      <v-card-actions>
      <template v-if="newClicked === false">
        <v-btn flat small outline color="blue lighten-2" @click.stop="onNoveltyButtonClick">
          새로워! {{effect.novelty}}
        </v-btn>
      </template>
      <template v-else>
        <v-btn dark small color="primary" @click.stop="newClicked = !newClicked">
          
        </v-btn>
      </template>      

      <template v-if="yeaClicked === false">
        <v-btn flat small outline color="red lighten-2" @click.stop="onEmpathyButtonClick">
          공감해! {{effect.empathy}}
        </v-btn>
      </template>
      <template v-else>
        <v-btn dark small color="error" @click.stop="yeaClicked = !yeaClicked">
          
        </v-btn>
      </template>     
      <v-spacer></v-spacer>
      
      <v-dialog
        v-model="dialog"
        width="500"
      >
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
            신고 사유를 적어주세요.
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

      <v-btn icon>
        <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
      <v-card-text v-show="show">
        <p id="description">{{effect.description}}</p>
      </v-card-text>
      </v-slide-y-transition>
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
  </div> -->

    <!-- <v-list-tile @click.stop="onShowDescriptionButtonClick">
      <v-list-tile-avatar>
        <v-avatar>
          <v-icon v-if="effect.isBenefit === 1"> mood </v-icon>
          <v-icon v-else> mood_bad </v-icon>
        </v-avatar>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>
          {{effect.stakeholder_detail}}
        </v-list-tile-title>
        <v-list-tile-sub-title>
          {{shortDescription}}
        </v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action @click.stop="onShowDescriptionButtonClick">
        <v-btn icon ripple>
          <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>

    <v-dialog v-model="show">
      <div>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline">{{effect.stakeholder_detail}}</h3>
              <div>{{effect.description}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat small @click.stop="onNoveltyButtonClick">
              새로워! {{effect.novelty}}
            </v-btn>
            <v-btn flat small @click.stop="onEmpathyButtonClick">
              공감해! {{effect.empathy}}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = !dialog">
              <v-icon color="red lighten-2" ripple>
                report
              </v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <div v-show="dialog">
              <v-card-text>
                <div class="dialog">
                신고 사유를 적어주세요.
                <v-textarea box v-model="reportReason"/>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false" ripple>
                  돌아가기
                </v-btn>
                <v-btn color="error" flat @click="reportEffect" ripple>
                  신고하기
                </v-btn>
              </v-card-actions>
            </div>
          </v-slide-y-transition>
        </v-card>
      </div>
    </v-dialog> -->
  <div>
    <!-- <div slot="header">
      <v-icon>sentiment_very_dissatisfied</v-icon>
      {{effect.stakeholder_detail}}
    </div> -->
    <v-card>
      <v-card-title>
        <h3>{{effect.stakeholder_detail}}</h3>
        <v-spacer/>
        <v-icon>
          {{effect.isBenefit ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied'}}
        </v-icon>
      </v-card-title>
      <v-card-text>
        <a @click="onShowDescriptionButtonClick">{{show ? effect.description : shortDescription}}</a>
      </v-card-text>
      <v-card-actions>
        <v-btn flat small @click.stop="onNoveltyButtonClick">
          새로워! {{effect.novelty}}
        </v-btn>
        <v-btn flat small @click.stop="onEmpathyButtonClick">
          공감해! {{effect.empathy}}
        </v-btn>
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
              신고 사유를 적어주세요.
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

<style>

/* #description {
  text-align: left;
  padding: 8px;
}
.v-card__title.v-card__title--primary {
  padding: 0;
}
.v-card__text {
  padding: 0;
}
.v-card__title.v-card__title--primary {
  height: 60px;
}
.v-card__actions {
  padding: 0px;
}
.left-align {
  text-align: left;
  cursor: pointer;
}
.dialog {
  padding: 8px;
} */
.v-card__text {
  text-align: left !important;
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


