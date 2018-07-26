// var environment = {
//   API_URL: 'https://localhost/api/',
//   API_URL_BROWSER: 'https://localhost/api/'
// }

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'stakeholder',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'stakeholder opinion exploration' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: ['~/plugins/vuetify.js', '~plugins/axios'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    // baseURL: 'https://localhost/api/',
    // browserBaseURL: 'https://localhost/api/',
    proxy: true
  },
  proxy: {
    '/api': { target: 'https://localhost', secure: false }
  },
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  // generate: {
  //   fallback: true
  // },

  // mode: 'spa',
  /*
  ** Build configuration
  */

  build: {
    vendor: [
      '~/plugins/vuetify.js',
      'lodash'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
