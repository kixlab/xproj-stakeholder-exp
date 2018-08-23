<template>
    <v-navigation-drawer
    fixed
    clipped
    class="grey lighten-4"
    app
    v-model="drawerFlag"
    temporary
  >
  <v-list class="pa-1">
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <v-icon>person</v-icon>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{userEmail}}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
  </v-list>
  <v-divider/>
<template v-if="!isGuest">
  <v-list class="pt-0" dense>

    <v-list-group
      no-action
      sub-group
      value="true"
    >
      <v-list-tile slot="activator">
        <v-list-tile-action>
          <v-icon>query_builder</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>진행상황</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-title>정책</v-list-tile-title>
        <v-list-tile-action>
            <span v-if="step>=2" style="color:blue;">{{step}} / 2</span>
            <span v-else style="color:red;">{{step}} / 2</span>

        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-title>영향 입력</v-list-tile-title>
        <v-list-tile-action>
          <span v-if="stakeholders_answered>=stakeholders_answered_min" style="color:blue;">{{stakeholders_answered}} / {{stakeholders_answered_min}}</span>
          <span v-else style="color:red;">{{stakeholders_answered}} / {{stakeholders_answered_min}}</span>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-title>(영향 읽기) 이해당사자 수</v-list-tile-title>
        <v-list-tile-action>
          <span v-if="stakeholders_seen>=stakeholders_seen_min" style="color:blue;">{{stakeholders_seen}} / {{stakeholders_seen_min}}</span>
          <span v-else style="color:red;">{{stakeholders_seen}} / {{stakeholders_seen_min}}</span>
        </v-list-tile-action>
      </v-list-tile>
    </v-list-group>
  </v-list>

  <v-divider/>
  <v-list class="pt-0" dense>

  <v-list-tile @click="dialog=true">
    <v-list-tile-action>
      <v-icon>pan_tool</v-icon>
    </v-list-tile-action>

    <v-list-tile-content>

    <v-dialog
      v-model="dialog"
      width="500"
      full-width
    >
      <v-list-tile-title slot="activator">포기하기</v-list-tile-title>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          color="red"
          primary-title
        > 주의
        </v-card-title>

        <v-card-text>
          <h2 strong style="color:red;"> 정말 포기하시겠습니까? </h2>
          실험 도중 포기는 실험 참가자의 고유한 권리입니다.<br>
          지금 포기하시면 여태까지 시스템에 입력하셨던 사용자의 정보가 안전히 폐기되며, 처음으로 돌아가게 됩니다.

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="primary"
            flat outline ripple
            @click="dialog=false"
          > 돌아가기 </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            flat outline ripple
            @click="giveUp"
          >
            포기하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-list-tile-content>
  </v-list-tile>  
  <v-list-tile @click="tutorial">
    <v-list-tile-action>
      <v-icon>directions</v-icon>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>튜토리얼</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>  
  </v-list>
  </template>
  <template v-else>
    <v-list class="pt-0" dense>
      <v-list-tile @click="tutorial">
        <v-list-tile-action>
          <v-icon>directions</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>튜토리얼</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>  
    </v-list>
  </template>
  <v-spacer></v-spacer>
  <v-list>
    <v-list-tile @click="drawerFlag = false">
    <v-list-tile-action>
      <v-icon>cross</v-icon>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>닫기</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>  
  </v-list>
</v-navigation-drawer>
</template>

<style scoped>
.grey.lighten-2 {
  background-color: pink !important;
}
</style>

<script>
export default {
  computed: {
    user: function () {
      return this.$store.state.user
    },
    userEmail: function () {
      if (this.user.email != null) {
        return this.user.email
      }
      return '둘러보기'
    },
    userGroup: function () {
      if (!this.$store.state.user.is_participant) {
        return -1
      } else {
        return this.$store.getters.experimentCondition
      }
    },
    step: function () {
      return this.$store.state.user.step
    },
    stakeholders_answered: function () {
      return this.$store.state.userPolicy.stakeholders_answered
    },
    stakeholders_seen: function () {
      return this.$store.state.userPolicy.stakeholders_seen
    },
    effects_seen: function () {
      return this.$store.state.userPolicy.effects_seen
    },
    stakeholders_answered_min: function () {
      switch (this.userGroup) {
        case 1:
        case 2:
        case 3:
        case 4:
        case -1:
          return 0
        case 5:
        case 0:
          return 3
      }
    },
    stakeholders_seen_min: function () {
      switch (this.userGroup) {
        case 1:
        case 2:
        case -1:
          return 0
        case 3:
        case 4:
        case 5:
        case 0:
          return 3
      }
    },
    effects_seen_min: function () {
      switch (this.userGroup) {
        case 1:
        case 2:
        case -1:
          return 0
        case 3:
        case 4:
        case 5:
        case 0:
          return 9
      }
    },
    isGuest: function () {
      return !this.$store.state.userToken || !this.$store.state.user.is_participant
    },
    drawerFlag: {
      get: function () {
        return this.drawer
      },
      set: function (val) {
        this.$emit('emitterdrawer', val)
      }
    }
  },
  props: {
    drawer: Boolean,
    source: String
  },
  methods: {
    goHome: function () {
      this.$router.push('/')
    },
    giveUp: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'GiveUp',
        eventLabel: `${this.$store.state.policyIdx}`,
        eventValue: 0
      })
      this.$router.push('/')
    },
    tutorial: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SeeTutorial',
        eventLabel: `${this.$store.state.policyIdx}`,
        eventValue: 0
      })
      this.$router.push('/Tutorial')
    }
  },
  data: function () {
    return {
      dialog: false
    }
  }
}
</script>


