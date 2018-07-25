export const state = () => ({
  sidebar: false,
  promiseIdx: 1,
  promise: {}
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setPromise (state, payload) {
    state.promise = payload
  }
}
