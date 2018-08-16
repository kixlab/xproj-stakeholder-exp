<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title style="margin: 0 auto;">
        <div>
          <!-- Length of policy name should be less than 18 Korean syllables -->
          <!-- The line must be ended with a single space -->
          <small> 회원가입 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
      </v-toolbar-title>
    </v-toolbar>
    <v-alert v-model="alert" type="error" dismissible>
      {{error}}
    </v-alert>
    <v-flex xs12>
      <br>
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
        <v-checkbox v-model="agreement" color="primary" hide-detials @click="dialog=true">
          <span slot="label" @click.stop.prevent="dialog=true">본 <a href="#">인간대상 연구 동의서</a>를 읽었으며, 그 내용에 동의합니다. </span>
        </v-checkbox>
        <v-dialog
          v-model="dialog"
          absolute
          max-width="400"
          persistent
          >
        <v-card>
          <v-card-title class="headline grey lighten-3">인간대상 연구 동의서</v-card-title>
          <v-card-text>
        <strong style="color:red;"> 아래 내용을 꼼꼼히 읽은 뒤, 문서 제일 끝에서 동의 여부를 선택해주십시오. </strong>
        <br><br>
        <strong>1. 연구의 배경 및 목적</strong><br>
        우리나라 정부는 국가 청렴도의 중요성을 인식하고 국가청렴도를 개선하기 위해 여러 제도를 도입하고 있습니다. 그러나 이러한 정부의 노력에도 불구하고 국민이 체감하는 국가청렴도는 매우 낮은 수준에 머물러 있습니다. 이러한 낮은 청렴도를 해결하는 근본적인 방법은 국가 정책 및 정보에 대한 시민의 높은 관심 및 참여로, 본 연구에서는 소셜컴퓨팅을 활용한 시민 참여형 국가 청렴도 개선 플랫폼을 개발하고자 합니다.
        본 연구에서 개발하는 플랫폼의 주목적은 정부의 정책/예산 집행에 대한 사용자의 의견을 수집, 통계적 기법을 통해 의견을 시각화하며, 그 과정에서 시민의 관심 및 참여가 증가하도록 하는 것입니다. 연구진은 시민참여형 활동을 매개로 새로운 정부-시민간 소통의 채널의 구축하여 정부를 향한 청렴도 인식을 개선하고자 합니다. 또한, 플랫폼 사용 과정에서 시민의 정책/예산에 대한 이해도와 인식이 높아지고 이로 인해 정책 및 예산의 투명성이 높아질 것으로 기대됩니다.<br>
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
        김주호, 카이스트 전산학과 조교수, 042-350-3570<br>
        <br>
        연락 담당자:<br>
        김현우, 카이스트 전산학과, <a href="#">khw0726@kaist.ac.kr</a><br>
        <br>
        <v-divider/>
        <br>
        <strong>
        본인은 이 동의서를 읽고 이해하였으며 본인은 자발적으로 본 연구에 참여함을 확인합니다.<br>
        <br>
        또한, 본인은 <br>
          1. 본인과 연구자 및 KAIST 사이에 본인의 연구 참여결정에 영향을 줄 수 있는 어떠한 관계도 없고, <br>
          2. 만 20세 이상, 만 64세 이하의 대한민국 국민이며, <br>
          3. 요양원 같은 수용 시설에 거주하거나, 인지 기능에 문제가 있지 아니하며, <br>
          4. 장애인이 아님을 확인합니다. <br>
          </strong>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              class="white--text"
              color="error"
              @click="agreement = false, dialog = false"
            >
              동의하지 않음
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="white--text"
              color="primary"
              @click="agreement = true, dialog = false"
            >
              동의
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn @click="onRegisterClick" block ripple color="primary"> 회원가입 후 시작 </v-btn>
      <v-dialog
        v-model="dialog2"
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
            @click="dialog2 = false"
          >
            돌아가기
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="primary"
            @click="onContinueClick"
          >
            시작하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  data: function () {
    return {
      email: '',
      password: '',
      password2: '',
      isParticipant: false,
      dialog: false,
      dialog2: false,
      agreement: false,
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

  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },

  methods: {
    // error as {"password1":["비밀번호가 너무 일상적인 단어입니다.","비밀번호가 전부 숫자로 되어 있습니다."]}
    async onRegisterClick () {
      const result = await this.$validator.validateAll()
      if (result && this.agreement) {
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
          const user = await this.$axios.$put('/api/auth/user/', {
            username: this.email,
            is_participant: this.agreement,
            step: 1
          })
          this.$store.commit('setUser', user)
          this.$router.push('/Tutorial')
        } catch (error) {
          this.alert = true
          this.error = error.response.data
        }
      } else if (result && !this.agreement) {
        this.dialog2 = true
      }
    },
    async onContinueClick () {
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
        const user = await this.$axios.$put('/api/auth/user/', {
          username: this.email,
          is_participant: this.agreement,
          step: 1
        })
        this.$store.commit('setUser', user)
        this.$router.push('/Tutorial')
      } catch (error) {
        this.alert = true
        this.error = error.response.data
      }
    }
  }
}
</script>
