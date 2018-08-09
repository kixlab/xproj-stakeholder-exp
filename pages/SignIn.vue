<template>
  <v-layout row wrap justify-center>
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title style="margin: 0 auto;">
        <div>
          <!-- Length of policy name should be less than 18 Korean syllables -->
          <!-- The line must be ended with a single space -->
          <small> 로그인 </small>
          <v-icon dark>tag_faces</v-icon>
        </div>
      </v-toolbar-title>
    </v-toolbar>
    <v-flex xs12>
      참여해주셔서 고맙습니다.
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
            required
            ></v-text-field>
          <v-btn @click="onLoginClick" ripple> 로그인 </v-btn>
          <v-btn @click="register" ripple> 회원가입 </v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<style scoped>
#lala {
  margin: 0 auto;
  cursor: pointer;
}
</style>
<script>
export default {
  data: function () {
    return {
      email: '',
      password: '',
      dictionary: {
        attributes: {
          email: '이 ',
          password: '비밀번호 '
          // custom attributes
        }
      }
    }
  },

  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },

  methods: {
    onLoginClick () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('setUser', {
            email: this.email
          })
          this.$ga.set({
            userId: this.email
          })
          this.$axios.setToken(false)
          this.$axios.$post('/api/auth/login/', {
            email: this.email,
            password: this.password
          }).then((result) => {
            this.$axios.setToken(result.key, 'Token')
            this.$store.commit('setUserToken', result.key)
            this.$router.push('ShowPolicies')
          })
        }
      })
    },
    register () {
      this.$router.push('SignUp')
    }
  }
}
</script>