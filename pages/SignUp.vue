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
      회원가입을 위해 이메일과 비밀번호를 입력해주세요.
      <v-card flat>
        <v-form>
          <v-text-field
            v-validate="'required|email'"
            v-model="email"
            :error-messages="errors.collect('email')"
            label="이메일"
            placeholder="abc@example.com"
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
          <v-btn @click="onRegisterClick" block ripple> 회원가입 후 시작 </v-btn>
        </v-form>
      </v-card>
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
          const user = await this.$axios.$put('/api/auth/user/', {
            username: this.email,
            is_participant: this.isParticipant
          })
          this.$store.commit('setUser', user)
          this.$router.push('PreSurvey')
        } catch (error) {
          this.alert = true
          this.error = error.response.data
        }
      }
    }
  }
}
</script>