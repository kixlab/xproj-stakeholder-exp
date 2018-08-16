<template>
<v-layout>
  <navigation-drawer :drawer="drawer"></navigation-drawer>

  <v-toolbar dense color="indigo" @click.native="onOpenDialog" dark fixed app>
    <v-toolbar-side-icon ripple @click.stop="test"></v-toolbar-side-icon>
    <v-toolbar-title>
      <div style="cursor: pointer;">
        <!-- Length of policy name should be less than 18 Korean syllables -->
        <!-- The line must be ended with a single space -->
        <small>{{policy.title}} </small>
        <v-icon dark fixed>arrow_drop_down</v-icon>
      </div>
    </v-toolbar-title>
    
    <v-dialog
      v-model = "dialog"
      max-width = "290"
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

export default {
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  components: {
    NavigationDrawer
  },
  data: () => ({
    dialog: false,
    drawer: false
  }),
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
    test: function () {
      console.log('pushed')
      this.drawer = !this.drawer
    }
  }
}
</script>


