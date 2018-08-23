<template>
  <v-app>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <nuxt />
        <v-footer height="auto">
          <v-layout row wrap>
            <v-spacer></v-spacer>
            <v-dialog model="dialog">
              <v-btn slot="activator" flat @click="onOpenAboutClick">
                About
              </v-btn>

              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  About
                </v-card-title>
                <v-card-text>
                  사용하시면서 불편하신 점이나 궁금하신 점이 있다면, xproject@kixlab.org로 연락주세요.

                  본 연구는 한국연구재단의 “소셜컴퓨팅 기술을 활용한 국가청렴도 개선” 과제의 일환입니다.
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="onCloseAboutClick">
                    닫기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-footer>
      </v-container>
    </v-content>
  </v-app>
  <!-- <v-app dark>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app> -->
</template>

<script>
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Footer
  },
  data: function () {
    return {
      aboutDialog: false
    }
  },
  methods: {
    onOpenAboutClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'OpenAbout',
        eventLabel: ``,
        eventValue: 0
      })
      this.aboutDialog = true
    },
    onCloseAboutClick: function () {
      console.log('closeAbout')
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'CloseAbout',
        eventLabel: ``,
        eventValue: 0
      })
      this.aboutDialog = false
    }
  }
}
// export default {
//   data () {
//     return {
//       clipped: false,
//       drawer: true,
//       fixed: false,
//       items: [
//         { icon: 'apps', title: 'Welcome', to: '/' },
//         { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
//       ],
//       miniVariant: false,
//       right: true,
//       rightDrawer: false,
//       title: 'Vuetify.js'
//     }
//   }
// }
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&subset=korean');

.container.grid-list-md.text-xs-center {
  padding: 8px;
}
* {
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
