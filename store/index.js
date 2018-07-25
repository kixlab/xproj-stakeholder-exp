export const state = () => ({
  sidebar: false,
  promiseIdx: 1,
  promise: {},
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
