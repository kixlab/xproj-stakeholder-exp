export const state = () => ({
  sidebar: false,
  promise: '"스펙 없는 이력서", 블라인드 채용 강화를 통해 불합리한 채용관행 개선'
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}
