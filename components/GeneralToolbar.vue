<template>
<v-layout>
  <navigation-drawer :drawer="drawer" @emitterdrawer="closeDrawer"></navigation-drawer>

  <v-toolbar dense color="indigo" dark fixed app>
    <v-toolbar-side-icon ripple @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
      this.drawer = val
    }
  }
}
</script>


