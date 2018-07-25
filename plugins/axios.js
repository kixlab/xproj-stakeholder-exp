import https from 'https'

// FOR DEVELOPMENT PURPOSE ONLY
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default function ({ $axios, store }) {
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  $axios.onRequest(config => {
    if (process.env.dev) {
      config.httpsAgent = agent
    }
  })
}
