<template>
<v-layout>
  <navigation-drawer :drawer="drawer" @emitterdrawer="closeDrawer"></navigation-drawer>

  <v-toolbar dense color="indigo" dark fixed app clipped-left>
    <v-toolbar-side-icon ripple @click.stop="onToggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>
      <span style="cursor: pointer;" @click="onOpenDialog"> 
        <!-- Length of policy name should be less than 18 Korean syllables -->
        <!-- The line must be ended with a single space -->
        <small> {{policy.title}} </small>
        <small><v-icon dark fixed>info</v-icon></small>
      </span>
    </v-toolbar-title>
    <v-spacer/>

    <v-spacer/>
    <template v-if="isExploring">
      <v-toolbar-items>
        <v-btn icon flat @click="revisitDialog = true">
          <v-icon>
            star
          </v-icon>
        </v-btn>
        <v-btn icon flat @click="editDialog = true">
          <v-icon>
            edit
          </v-icon>
        </v-btn>
        <!-- <v-btn icon flat v-if="$router.currentRoute === 'TagOverview' || $router.currentRoute === 'EffectsList'" @click="$emit('go-next')">
          <v-icon>
            arrow_right
          </v-icon>
        </v-btn> -->
      </v-toolbar-items>
    </template>

    <v-dialog
      v-model="editDialog">
      <v-card>
        <v-card-title>
          정책에 대한 의견이 변하셨나요? 그렇다면 왜 의견을 바꾸셨는지 알려주세요!
        </v-card-title>
        <v-card-text>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="revisitDialog"
      >
      <v-card>
        <v-card-title>
          즐겨찾기한 의견을 다시 확인하실 수 있습니다.
        </v-card-title>
        <v-card-text>
          <effect-card 
            v-for="effect in pinnedEffects" 
            :key="effect.id"
            :effect="effect"
            >
          </effect-card>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{policy.title}}
        </v-card-title>

        <v-card-text>
          <span v-html="policy.description"/>
        </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="onCloseDialog"
        >
          다 읽었어요!
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</v-layout>
</template>

<script>
import NavigationDrawer from '~/components/NavigationDrawer.vue'
import EffectCard from '~/components/EffectCard.vue'
export default {
  computed: {
    user: function () {
      return this.$store.state.user
    },
    pinnedEffects: function () {
      return this.$store.state.pinnedEffects
    },
    initialStance: function () {
      return this.$store.state.initialStance
    },
    isExploring: function () {
      return this.$router.currentRoute.path === '/TagOverview' || this.$router.currentRoute.path === '/EffectsList'
    }
  },
  components: {
    NavigationDrawer,
    EffectCard
  },
  data: function () {
    return {
      dialog: false,
      drawer: false,
      reviewOpinionDialog: false,
      revisitDialog: false,
      previousStance: '',
      opinions: ['매우 부정적', '부정적', '중립', '긍정적', '매우 긍정적'],
      currentStance: this.$store.state.initialStance,
      editDialog: false,
      changedOpinion: ''
    }
  },
  props: {
    source: String,
    policy: {
      // validator: function (value) {
      //   return ('title' in value) && ('description' in value)
      // },
      type: Object,
      default: function () {
        return {
          title: '',
          description: `정책 설명`
        }
      }
    }
  },
  methods: {
    onOpenDialog: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenPolicyExplanation',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      this.dialog = true
    },
    onCloseDialog: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'ClosePolicyExplanation',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      this.dialog = false
    },
    closeDrawer: function (val) {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'CloseDrawer',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      this.drawer = val
    },
    onToggleDrawer: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: this.drawer ? 'CloseDrawer' : 'OpenDrawer',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      this.drawer = !this.drawer
    },
    onUpdateStance: function () {
      // pass
      this.reviewOpinionDialog = true
    },
    onCancelUpdateStance: function () {
      this.currentStance = this.previousStance
      this.reviewOpinionDialog = false
    },
    onSubmitUpdateStance: function () {
      // TODO: connect to db
      this.changedOpinion = ''
      this.reviewOpinionDialog = false
    }
  }
}
</script>


