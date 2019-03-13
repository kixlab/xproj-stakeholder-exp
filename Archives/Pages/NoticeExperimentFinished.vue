<template>
  <v-layout row wrap justify-center>
    <general-toolbar pagename="실험 종료 안내"/>
        
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
          기프티콘 지급을 위한 '정책 타입 - 타인의 입장' 사용 실험은 모두 종료되었습니다!
        </v-card-text>
      </v-card>
      <p style="text-align: left;">
        <br>
        기프티콘과 상관 없이 사용해보고 싶으신 분께서는, '다음' 버튼을 누르시면 계속 사용해보실 수 있습니다. <br>
        <br>
        혹시 실험에 참여하셨지만, 기프티콘을 받지 못하신 분께서는 <a href="mailto:xproject@kixlab.org">xproject@kixlab.org</a>로 연락 주세요! <br>
        <br>
        '정책 타입 - 타인의 입장'에 관심 가져주셔서 감사합니다. <a href="http://kixlab.org">카이스트 인터랙션 연구실</a>에서 진행 중인 다른 연구도 많은 관심 가져주세요! <br>
      </p>
    </v-flex>
    <!-- The survey link must be added. -->
    <v-btn block color="primary" @click="toLogin">다음</v-btn>
  </v-layout>
</template>
<script>
import GeneralToolbar from '~/components/GeneralToolbar.vue'

export default {
  // TODO: fetch policy list
  components: {
    GeneralToolbar
  },
  data: function () {
    return {
      isSurveyClicked: false,
      code: '',
      answer: '청바지'
    }
  },
  methods: {
    toLogin: function () {
      this.$router.push('/SignIn')
    }
  }
}
</script>