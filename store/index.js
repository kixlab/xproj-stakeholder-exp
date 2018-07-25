export const state = () => ({
  sidebar: false,
  promiseIdx: 1,
  promise: {
    title: '복합쇼핑몰에 대한 입지제한과 영업제한 도입',
    description: '설명.............'
  },
  firstImpression: 0
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setPromise (state, payload) {
    state.promise = payload
  },
  setFirstImpression (state, payload) {
    state.firstImpression = payload.firstImpression
  },
  setPromiseIdx (state, payload) {
    state.promiseIdx = payload.promiseIdx
  }
}
