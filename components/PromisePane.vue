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
          title: '복합쇼핑몰에 대한 입지제한과 영업제한',
          description: `정부는 신세계 스타필드, 이케아 등 복합쇼핑몰 및 전문점에 대해 영업, 출점을 제한하는 규제법안을 추진하고 있다.<br><br>
          정부는 이 정책을 통해 <strong>재래시장 및 상점가 등 소상공인을 보호할 수 있을 것</strong>으로 내다봤다.<br><br>
          그러나 유통업계는 <strong>소비자 권리를 침해할 뿐만 아니라, 경제에 끼칠 악영향을 우려한다</strong>며 반발했다.`
        }
      }
    }
  },
  methods: {
    onOpenDialog: function () {
      this.$ga.event({
        eventCategory: 'PromisePane',
        eventAction: 'OpenPolicyExplanation',
        eventLabel: this.policy.title,
        eventValue: 0
      })
      this.dialog = true
    },
    onCloseDialog: function () {
      this.$ga.event({
        eventCategory: 'PromisePane',
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


