<template>
  <v-footer app>
    <v-layout row wrap>
      <v-spacer></v-spacer>
      <v-dialog model="dialog">
        <v-btn slot="activator">
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
            <v-btn color="primary" flat @click.prevent="onCloseAboutClick">
              닫기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: function () {
    return {
      dialog: false
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
      this.dialog = true
    },
    onCloseAboutClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'CloseAbout',
        eventLabel: ``,
        eventValue: 0
      })
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
