export const state = () => ({
  sidebar: false,
  promiseIdx: 1,
  policy: {
    title: '복합쇼핑몰에 대한 입지제한과 영업제한',
    description: '설명.............'
  },
  stakeholderGroup: {
    policy: '',
    name: ''
  },
  summary: {
    stakeholder_group: '',
    text: '',
    likes: 'int'
  },
  userPolicy: {
    user: '',
    policy: '',
    effect_size: 'int',
    stance: 'int',
    is_stakeholder: true,
    stakeholder: ''
  },
  effect: {
    userPolicy: '',
    stakeholder_group: '',
    stakeholder_detail: '',
    isBenefit: true,
    description: '',
    likes: 'int'
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
