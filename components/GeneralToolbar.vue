<template>
<v-layout>
  <navigation-drawer :drawer="drawer" @emitterdrawer="closeDrawer"></navigation-drawer>

  <v-toolbar dense color="indigo" dark fixed app>
    <v-toolbar-side-icon ripple @click.stop="onToggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title style="margin: 0 auto;">
      <small> {{pagename}} </small>
      <!-- <v-icon dark>tag_faces</v-icon> -->
    </v-toolbar-title>
    
  </v-toolbar>
</v-layout>
</template>

<script>
import NavigationDrawer from '~/components/NavigationDrawer.vue'

export default {
  components: {
    NavigationDrawer
  },
  data: () => ({
    drawer: false
  }),
  props: {
    source: String,
    pagename: String
  },
  methods: {
    closeDrawer: function (val) {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'CloseDrawer',
        eventLabel: this.$store.state.policy.title ? this.$store.state.policy.title : '',
        eventValue: 0
      })
      this.drawer = val
    },
    onToggleDrawer: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: this.drawer ? 'OpenDrawer' : 'CloseDrawer',
        eventLabel: this.$store.state.policy.title ? this.$store.state.policy.title : '',
        eventValue: 0
      })
      this.drawer = !this.drawer
    }
  }
}
</script>


