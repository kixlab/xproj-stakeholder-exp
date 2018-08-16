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
  plugins: ['~/plugins/vuetify.js',
    // '~/plugins/axios',
    '~/plugins/vee-validate.js',
    {
      src: '~/plugins/localStorage.js',
      ssr: false
    }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/google-analytics'
  ],
  'google-analytics': {
    id: 'UA-123523203-1'
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/api': { target: 'https://xproj-api.hyunwoo.me/' }
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

  mode: 'spa',
  /*
  ** Build configuration
  */

  build: {
    vendor: [
      '~/plugins/vuetify.js'
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
