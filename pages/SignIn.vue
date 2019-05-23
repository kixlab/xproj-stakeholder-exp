<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" dark fixed app>
      <v-toolbar-title style="margin: 0 auto;">
        <div>
          <!-- Length of policy name should be less than 18 Korean syllables -->
          <!-- The line must be ended with a single space -->
          <small> 로그인 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
      </v-toolbar-title>
    </v-toolbar>
    <v-alert type="error" v-model="error" dismissible>
      이메일과 비밀번호를 다시 한 번 확인해주세요. 
    </v-alert>
    <v-flex xs12>
      참여해주셔서 감사합니다.<br>
      참여를 위해 먼저 로그인 해주세요.
      계정이 없으시다면, 회원가입 버튼을 클릭하셔서 계정을 만들어주세요!
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
            required
            @keyup.enter="onLoginClick"
            ></v-text-field>
          <v-btn @click="onLoginClick" ripple> 로그인 </v-btn>
          <v-btn @click="register" ripple> 회원가입 </v-btn>
        </v-form>
      </v-card>
      <br>
      <div v-if="isMobile">
        <p style="text-align: left;">
          혹시 카카오톡이나 페이스북 등 앱을 통해 들어오셨다면, 아래 그림을 따라 다른 브라우저로 접속해주세요!
        </p>
        <img src="noinapp.png" width="100%" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: function () {
    return {
      email: '',
      password: '',
      dictionary: {
        attributes: {
          email: '이메일 ',
          password: '비밀번호 '
          // custom attributes
        }
      },
      error: ''
    }
  },

  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },
  computed: {
    isMobile: function () {
      if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    async onLoginClick () {
      const result = await this.$validator.validateAll()
      if (result) {
        this.$axios.setToken(false)
        try {
          const tokenRes = await this.$axios.$post('/api/auth/login/', {
            email: this.email,
            password: this.password
          })
          this.$axios.setToken(tokenRes.key, 'Token')
          this.$store.commit('setUserToken', tokenRes.key)
          this.$ga.set({
            userId: this.email
          })
          this.$ga.event({
            eventCategory: this.$router.currentRoute.path,
            eventAction: 'Login',
            eventLabel: this.email,
            eventValue: 0
          })
          const user = await this.$axios.$get('/api/auth/user/')
          // console.log(user.is_participant)
          // console.log(user.presurvey_done)
          this.$store.commit('setUser', user)
          // if (user.is_participant && !(user.presurvey_done)) {
          //   this.$router.push('/Tutorial')
          // } else {
          //   this.$router.push('/ShowPolicies')
          // }
          this.$router.push('/ShowPolicies')
        } catch (err) {
          this.error = err.response.data
        }
      }
    },
    register () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'Register',
        eventLabel: '',
        eventValue: 0
      })
      this.$router.push('/SignUp')
    }
  }
}
</script>