export const state = () => ({
  sidebar: false,
  policyIdx: 1,
  policy: {
    title: '복합쇼핑몰에 대한 입지제한과 영업제한',
    description: '설명.............'
  },
  stakeholderGroup: [
    {
      policy: '',
      name: '엄마'
    },
    {
      policy: '',
      name: '이웃'
    }
  ],
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
  effects: [
    {
      userPolicy: '',
      stakeholder_name: '엄마',
      stakeholder_detail: '세 살 배기 아이의',
      isBenefit: true,
      description: '위대한 태양이 외면하는 겨울에는 땅은 슬픔의 계곡으로 들어가 단식하고 통곡하며 상복에 몸을 가리고 자신의 결혼식 화환이 썩도록 내버려둔다. 그리고는 태양이 키스와 함께 돌아오는 봄이 되면 다시 생동한다.',
      likes: '15'
    },
    {
      userPolicy: '',
      stakeholder_name: '이웃',
      stakeholder_detail: '애기엄마가 윗집에 사는',
      isBenefit: false,
      description: '우습게 들릴지 모르지만, 진정한 혁명가를 이끄는 것은 위대한 사랑의 감정이다, 이런 자질이 없는 혁명가는 생각할 수 없다.',
      likes: '23'
    },
    {
      userPolicy: '',
      stakeholder_name: '입주업체 직원',
      stakeholder_detail: '스타필드에서 매일 출근하는',
      isBenefit: true,
      description: '업무가 제한되어야 우리의 휴식이 보장됩니다. 다른 친구들은 다 휴가도 가고 하던데, 저는 갈래야 갈 수 없어요 :(',
      likes: '1'
    }
  ]})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setPromise (state, payload) {
    state.policy = payload
  },
  setFirstImpression (state, payload) {
    state.firstImpression = payload.firstImpression
  },
  setPromiseIdx (state, payload) {
    state.policyIdx = payload.promiseIdx
  }
}
