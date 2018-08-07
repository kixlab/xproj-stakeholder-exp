import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko.js'

const config = {
  locale: 'ko',
  dictionary: {
    ko
  }
}

Vue.use(VeeValidate, config)
Validator.localize('ko')
/* const dict = {
  attributes: {
    email: '이메일 '
  }
}

Validator.localize('ko', dict)
*/
