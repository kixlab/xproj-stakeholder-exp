<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" dark fixed app>
      <v-toolbar-title style="margin: 0 auto;">
        <div>
          <!-- Length of policy name should be less than 18 Korean syllables -->
          <!-- The line must be ended with a single space -->
          <small> 회원가입 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
      </v-toolbar-title>
    </v-toolbar>



    <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">실험 참가 동의</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2">계정 정보 입력</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>

      <v-stepper-content step="1">

        <v-card>
          <v-card-title class="headline grey lighten-3">실험 및 보상 지급 안내</v-card-title>
          <v-card-text style="text-align: left;">
        <strong style="color:red;"> 아래 내용을 꼼꼼히 읽은 뒤, 문서 제일 끝에서 동의 여부를 선택해주십시오. </strong>
        <br><br>
        <v-divider/>
        <strong><font size="5">1. 인간대상 연구 동의서 </font></strong><br><br>
        <strong>1. 연구의 배경 및 목적</strong><br>
        정부 정책은 다양한 이해 당사자에게 다양한 방법으로 영향을 미칩니다. 따라서, 시민이 정책의 효과를 제대로 판단하기 위해서는 각 이해 당사자가 받는 정책의 영향을 이해할 필요가 있습니다. 본 연구에서는 시민 참여를 통해 정책이 다양한 사회적 집단에 주는 영향을 쉽게 이해할 수 있는 방법을 탐색하고 있습니다.<br>
        구체적으로, 본 연구에서는 1) 각 사용자가 정부 정책이 이해 관계자에게 주는 영향을 공유하고, 2) 이를 바탕으로 다른 사용자가 정책을 이해하도록 돕는 온라인 플랫폼을 개발하고자 합니다. 플랫폼 사용 과정에서 시민의 정책에 대한 이해도와 인식이 높아질 것을 기대합니다.<br>
        <br>
        <strong>2. 예상 참여시간 및 참여 중단</strong><br>
        본 인터페이스 사용에 시간적 제한은 없습니다.<br>
        <br>
        <strong>3. 본 연구에 참여하게 됨으로써 받게 되는 검사 및 절차</strong><br>
        본 연구는 만 20세 이상 만 64세 이하 대한민국 국민을 대상으로 합니다. 인터페이스 사용 시 수집된 웹 기록은 연구용 서버에 저장되며 이외에 실험을 전후로 이행되는 특별한 검사 및 절차는 없습니다.
        이나 불편사항은 없습니다.<br>
        <br>
        <strong>4. 이 연구에 참여함으로써 기대되는 이익</strong><br>
        해당 인터페이스가 다루는 사회적, 정치적 지식에 대한 새로운 접근을 경험하실 수 있습니다. 또한, 연구를 통해 얻은 정보는 추후 관련 연구에 도움이 됩니다.<br>
        <br>
        <strong>5. 신분의 비밀보장 및 개인정보 보호(자료의 열람 권한 설정 및 보관, 관리, 폐기, 임상시험 결과 발표 시 피험자의 신원 보호)</strong><br>
        개인 정보 보호를 위해 모든 데이터는 익명으로 처리되며, 추후 연구결과를 발표하게 될 시에 결과 내용에 연구대상자의 신원이 드러나는 식별정보는 포함되지 않을 것입니다. 수집된 정보는 외부에서 접근이 제한된 서버에 저장이 되며, 참여연구원에 의해서만 처리 및 가공되어 연구 결과를 도출하는 용도로만 이용될 것입니다. 수집된 정보는 연구 기간 종료 후 전량 파기 조치하고, 만일 데이터 수집 기간 동안 참가자로부터 수집 중단 및 데이터 이용 중단 요구가 있을 경우 참가를 중단하고 해당 참가자의 데이터는 모두 파기할 것입니다.<br>
        <br>
        <strong>6. 연구와 관련된 손상이 발생하였을 경우 피험자에게 주어질 보상이나 치료방법</strong><br>
        본 연구는 연구 참가자에게 어떤 조작을 가하거나 육체적인 활동을 요구하지 않습니다. 만약 이 연구에 의한 손상이 발생했다고 판단될 경우 그에 상응하는 보상을 할 것입니다.<br>
        <br>
        <strong>7. 연구 참가 거부 및 중단</strong><br>
        본 실험에 참가 여부를 결정하는 것은 피험자에 달려있습니다. 피험자는 언제든지 연구에 참여하지 않기로 결정할 수 있고 또한 중도에 그만둘 수 있습니다. 피험자가 본 연구에 참여하지 않아도 아무런 불이익을 받지 않습니다. 인터페이스 사용 중 불편을 느끼고 연구 참가를 중단하고 싶다면 언제든지 중지할 수 있습니다. 그리고 수집된 데이터의 이용 중단을 요구할 경우 연구진은 수집 데이터 일체를 파기할 것입니다.<br>
        <br>
        <strong>8. 본 연구를 위해 피험자가 준수해야 하는 사항</strong><br>
        본 연구를 오염시키기 위한 악의적인 목적으로 인터페이스 사용에 임하지 말아야 합니다. 연구원이 피험자가 악의적인 목적을 가지고 있다고 판단한다면, 관련 데이터를 파기할 수 있습니다.<br>
        <br>
        <strong>9. 연구에 대한 추가적인 정보를 얻고자 하거나 연구와 관련이 있는 손상이 발생한 경우에 접촉해야 하는 사람과 연락처</strong><br>
        본 연구의 참여와 관련하여 문의 및 불만 사항이 있으신 경우에는 언제든지 연구진에게 연락 하여 주시기 바랍니다.<br>
        <br>
        연구 책임자:<br>
        김주호, 카이스트 전산학부 조교수, 042-350-3570<br>
        <br>
        연락 담당자:<br>
        김현우, 카이스트 전산학부, <a href="#">khw0726@kaist.ac.kr</a><br>
        <br>
        <v-divider/>
        <br>
        <strong>
        본인은 이 동의서를 읽고 이해하였으며 본인은 자발적으로 본 연구에 참여함을 확인합니다.<br>
        <br>
        또한, 본인은 <br>
          1. 본인과 연구자 및 KAIST 사이에 본인의 연구 참여결정에 영향을 줄 수 있는 어떠한 관계도 없고, <br>
          2. 만 20세 이상, 만 64세 이하의 대한민국 국민이며, <br>
          3. 인지 기능에 문제가 있지 아니함을 확인합니다. <br>
        <br>
        <v-divider/>
        <br>
        <font size="5">2. 개인정보 제공 및 활용 동의 안내 </font><br>
        실험 참가자에 대한 참여 보상(기프티콘) 지급을 위해 다음과 같은 정보를 실험 참여 후 설문에서 수집할 예정입니다.
        아래 항목에 대해 응답하지 않는 경우 실험 보상을 지급받을 수 없습니다.<br><br>
        
        - 이름<br>
        - 생년월일<br>
        - 성별<br>
        - 휴대폰번호<br>
        - 이메일 주소<br>
        - 거주지 주소 (읍/면/동까지)<br><br>

        수집된 정보는 참여연구원에 의해서만 열람, 처리되며 참여 보상을 지급하는 용도로만 사용됩니다.<br><br>
          </strong>
          <v-divider/><br>
          <v-checkbox v-model="agreement" color="primary" hide-detials>
            <span slot="label" style="color: black;"> <font size="2">
              위 '인간대상 연구 동의서' 및 '개인정보 제공 및 활용 동의 안내'를 읽었으며, 그 내용에 동의합니다.
            </font></span>
          </v-checkbox>
          </v-card-text>
        </v-card>

        <v-btn flat @click="onCancelClick" color="red">취소</v-btn>
        <v-btn @click="onNextClick" ripple color="primary"> 계정 정보 입력 </v-btn>
        
      </v-stepper-content>

      <v-stepper-content step="2">
      <v-flex xs12 id="accountinfo">
      <v-alert v-model="alert" type="error" dismissible>
        {{formattedError}}
      </v-alert>
      <p><strong>계정 정보를 입력해주세요.</strong></p>
      <v-card flat>
        <v-form>
          <v-text-field
            v-validate="'required|email'"
            v-model="email"
            :error-messages="errors.collect('email')"
            label="이메일"
            placeholder="abc@example.com"
            type="email"
            name="email"
            required
          ></v-text-field>   
          <v-text-field
            v-validate="'required|min:8'"
            v-model="password"
            :error-messages="errors.collect('password')"
            type="password"
            label="비밀번호"
            placeholder="password"
            name="password"
            ref="password"
            required
            ></v-text-field>
          <v-text-field
            v-validate="'required|min:8|confirmed:password'"
            v-model="password2"
            :error-messages="errors.collect('password_confirm')"
            type="password"
            label="비밀번호 다시 입력"
            placeholder="password again"
            data-vv-name="password_confirm"
            required
            ></v-text-field>
        </v-form>
      </v-card>
      </v-flex>
        <v-btn flat @click="e1=1">뒤로</v-btn>
        <v-btn
          color="primary"
          @click="onRegisterClick"
        >
          완료
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
    </v-stepper>


    <v-dialog
      v-model="dialog"
      absolute
      max-width="400"
      temporary
      >
    <v-card>
      <v-card-title class="headline red lighten-3">주의</v-card-title>
      <v-card-text>
        <strong style="color: cornflowerblue; text-decoration:underline;">인간대상 연구 동의서</strong>에 동의하지 않을 경우, 설문조사가 생략되어
        실험 참가 보상이 지급되지 않으며, <strong style="color: red;">시스템 사용 도중 결정을 번복할 수 없습니다.</strong> <br>
        (그러나 동의한 사람은 시스템 사용 도중 동의를 철회할 수 있습니다.)<br><br>
        보상없이 이 시스템을 이용하여 정책을 이해하고 싶으신 분은 계속 하셔도 좋습니다.<br><br>
        <h2 style="text-align:center;"> 계속 하시겠습니까? </h2>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          class="white--text"
          color="error"
          @click="onGoBackClick"
        >
          돌아가기
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="white--text"
          color="primary"
          @click="onContinueClick"
        >
          계속
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>



  </v-layout>
</template>

<style scoped>
.v-stepper {
  width: 100%
}
.v-stepper__content {
  padding: 0;
}
</style>

<script>
export default {
  data: function () {
    return {
      email: '',
      password: '',
      password2: '',
      dialog: false,
      agreement: false,
      e1: 1,
      dictionary: {
        attributes: {
          email: '이메일 ',
          password: '비밀번호 ',
          password_confirm: '비밀번호 '
          // custom attributes
        }
      },
      alert: false,
      error: ''
    }
  },
  computed: {
    formattedError: function () {
      if (this.error) {
        if (this.error.email) {
          return this.error.email[0]
        } else if (this.error.password1) {
          return this.error.password1[0]
        }
      } else {
        return ''
      }
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },

  methods: {
    // error as {"password1":["비밀번호가 너무 일상적인 단어입니다.","비밀번호가 전부 숫자로 되어 있습니다."]}
    async onNextClick () {
      /* Event should be added */
      if (!this.agreement) {
        this.dialog = true
      } else {
        this.e1 = 2
      }
    },
    onCancelClick () {
      /* Event should be added */
      this.$router.push('/')
    },
    async onRegisterClick () {
      const result = await this.$validator.validateAll()
      if (result) {
        this.$axios.setToken(null)
        try {
          const res = await this.$axios.$post('/api/auth/signup/', {
            username: this.email,
            email: this.email,
            password1: this.password,
            password2: this.password2
          })
          this.$axios.setToken(res.key, 'Token')
          this.$store.commit('setUserToken', res.key)
          this.$ga.set({
            userId: this.email
          })
          this.$ga.event({
            eventCategory: this.$router.currentRoute.path,
            eventAction: 'RegisterAsParticipant',
            eventLabel: this.email,
            eventValue: 0
          })
          const user = await this.$axios.$put('/api/auth/user/', {
            username: this.email,
            is_participant: this.agreement,
            step: 1,
            presurvey_done: false
          })
          this.$store.commit('setUser', user)
          this.$router.push('/Tutorial')
        } catch (error) {
          this.alert = true
          this.error = error.response.data
        }
      }
    },
    /*     agreeInformedConsent: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'AgreeInformedConsent',
        eventLabel: this.email,
        eventValue: 0
      })
      this.agreement = true
      this.dialog = false
    },
    disagreeInformedConsent: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'DisagreeInformedConsent',
        eventLabel: this.email,
        eventValue: 0
      })
      this.agreement = false
      this.dialog = false
    }, */
    onGoBackClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'GoBackFromContinuingAsNonParticipant',
        eventLabel: this.email,
        eventValue: 0
      })
      this.dialog = false
    },
    async onContinueClick () {
      /* Event should be added */
      this.dialog = false
      this.e1 = 2
    }
  }
}
</script>
