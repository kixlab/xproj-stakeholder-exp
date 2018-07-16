export const state = () => ({
  sidebar: false,
  promise: '연구자와 연구기관에게 자율과 책임을, 국민에게는 혜택을 최대화하는 연구 지원체계로 혁신'
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}
