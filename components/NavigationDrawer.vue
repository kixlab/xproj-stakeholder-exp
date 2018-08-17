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
      <v-list-tile>
        <v-list-tile-title>(영향 읽기) 영향 수</v-list-tile-title>
        <v-list-tile-action>
          <span v-if="articles_seen>=articles_seen_min" style="color:blue;">{{articles_seen}} / {{articles_seen_min}}</span>
          <span v-else style="color:red;">{{articles_seen}} / {{articles_seen_min}}</span>
        </v-list-tile-action>
      </v-list-tile>
    </v-list-group>
  </v-list>

  <v-divider/>
  <v-list class="pt-0" dense>
<!--   <v-list-tile @click="goHome">
    <v-list-tile-action>
      <v-icon>home</v-icon>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>처음으로</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile> -->

  <v-list-tile @click="giveUp">
    <v-list-tile-action>
      <v-icon>pan_tool</v-icon>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>포기하기</v-list-tile-title>
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
</v-navigation-drawer>

</template>
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
      return 'guest'
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
    articles_seen: function () {
      return this.$store.state.userPolicy.articles_seen
    },
    stakeholders_answered_min: function () {
      switch (this.userGroup) {
        case 1:
        case 2:
        case 3:
        case 4:
          return 0
        case 5:
        case 0:
        case -1:
          return 3
      }
    },
    stakeholders_seen_min: function () {
      switch (this.userGroup) {
        case 1:
        case 2:
          return 0
        case 3:
        case 4:
        case 5:
        case 0:
        case -1:
          return 3
      }
    },
    articles_seen_min: function () {
      switch (this.userGroup) {
        case 1:
        case 2:
          return 0
        case 3:
        case 4:
        case 5:
        case 0:
        case -1:
          return 9
      }
    },
    isGuest: function () {
      return !this.$store.state.userToken
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
        eventLabel: ``,
        eventValue: 0
        })
      this.$router.push('/')
    },
    tutorial: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SeeTutorial',
        eventLabel: `${this.effect.id},${this.effect.stakeholder_detail}`,
        eventValue: 0
        })
      this.$router.push('/Tutorial')
    }
  }
}
</script>


