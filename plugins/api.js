// import Vue from 'vue'

// let ApiAddress = {
//   install: function (Vue, options) {
//     Vue.apiAddress = 'https://127.0.0.1/api/'
//   }
// }

// Vue.use(ApiAddress)

export default ({app}, inject) => {
  app.apiAddress = ''
}
