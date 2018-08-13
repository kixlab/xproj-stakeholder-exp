<template>
    <v-navigation-drawer
    fixed
    clipped
    class="grey lighten-4"
    app
    v-model="drawer"
    temporary
  >
    <v-list class="pa-1">
  <v-list-tile avatar>
    <v-list-tile-avatar>
      <v-icon>person</v-icon>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{user.email}}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
  </v-list>
  <v-list class="pt-0" dense>
  <v-divider></v-divider>

  <v-list-tile @click="goHome">
    <v-list-tile-action>
      <v-icon>home</v-icon>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>처음으로</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</v-list>
  </v-navigation-drawer>

</template>

<script>
export default {
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  props: {
    source: String,
    drawer: {
      validator: function (value) {
        return (value === true || value === false)
      }
    }
  },
  methods: {
    goHome: function () {
      this.$router.push('/')
    }
  }
}
</script>


