export const state = () => ({
  sidebar: false,
  policyIdx: 1,
  policy: {
    title: '복합쇼핑몰 입지제한 및 영업제한',
    description: '정부는 신세계 스타필드, 이케아 등 복합쇼핑몰 및 전문점에 대해 영업, 출점을 제한하는 규제법안을 추진하고 있다.<br>정부는 이 정책을 통해 재래시장 및 상점가 등 소상공인을 보호할 수 있을 것으로 내다봤다.<br>그러나 유통업계는 소비자 권리를 침해할 뿐만 아니라, 경제에 끼칠 악영향을 우려한다며 반발했다.'
  },
  stakeholderGroups: [
    // id must start from 1.
    {
      policy: '',
      id: '1',
      name: '공공부문 종사자'
    },
    {
      policy: '',
      id: '2',
      name: '민간부문 종사자'
    },
    {
      policy: '',
      id: '3',
      name: '경력자'
    },
    {
      policy: '',
      id: '4',
      name: '고등학생'
    }
  ],
  summaries: [
    {
      stakeholder_name: '공공부문 종사자',
      text: '저희는 휴가 언제 가나요?',
      likes: '3'
    },
    {
      stakeholder_name: '민간부문 종사자',
      text: '차가 많아서, 너무 복잡해요',
      likes: '5'
    },
    {
      stakeholder_name: '경력자',
      text: 'B',
      likes: '7'
    },
    {
      stakeholder_name: '고등학생',
      text: 'B',
      likes: '7'
    }
  ],
  userPolicy: {
    user: '',
    policy: '',
    effect_size: 'int',
    stance: 'int',
    is_stakeholder: true,
    stakeholder: '2'
  },
  predictedEffects: [],
  effects: [
    {
      userPolicy: '',
      stakeholder_name: '경력자',
      stakeholder_detail: '세 살 배기 아이의',
      isBenefit: true,
      description: '위대한 태양이 외면하는 겨울에는 땅은 슬픔의 계곡으로 들어가 단식하고 통곡하며 상복에 몸을 가리고 자신의 결혼식 화환이 썩도록 내버려둔다. 그리고는 태양이 키스와 함께 돌아오는 봄이 되면 다시 생동한다.',
      likes: '15'
    },
    {
      userPolicy: '',
      stakeholder_name: '공공부문 종사자',
      stakeholder_detail: '애기엄마가 윗집에 사는',
      isBenefit: false,
      description: '우습게 들릴지 모르지만, 진정한 혁명가를 이끄는 것은 위대한 사랑의 감정이다, 이런 자질이 없는 혁명가는 생각할 수 없다.',
      likes: '23'
    },
    {
      userPolicy: '',
      stakeholder_name: '공공부문 종사자',
      stakeholder_detail: '스타필드에서 매일 출근하는',
      isBenefit: true,
      description: '업무가 제한되어야 우리의 휴식이 보장됩니다. 다른 친구들은 다 휴가도 가고 하던데, 저는 갈래야 갈 수 없어요 :(',
      likes: '1'
    },
    {
      userPolicy: '',
      stakeholder_name: '경력자',
      stakeholder_detail: '애기엄마가 윗집에 사는',
      isBenefit: false,
      description: '우습게 들릴지 모르지만, 진정한 혁명가를 이끄는 것은 위대한 사랑의 감정이다, 이런 자질이 없는 혁명가는 생각할 수 없다.',
      likes: '23'
    },
    {
      userPolicy: '',
      stakeholder_name: '고등학생',
      stakeholder_detail: '애기엄마가 윗집에 사는',
      isBenefit: false,
      description: '우습게 들릴지 모르지만, 진정한 혁명가를 이끄는 것은 위대한 사랑의 감정이다, 이런 자질이 없는 혁명가는 생각할 수 없다.',
      likes: '23'
    },
    {
      userPolicy: '',
      stakeholder_name: '고등학생',
      stakeholder_detail: '애기엄마가 윗집에 사는',
      isBenefit: false,
      description: '우습게 들릴지 모르지만, 진정한 혁명가를 이끄는 것은 위대한 사랑의 감정이다, 이런 자질이 없는 혁명가는 생각할 수 없다.',
      likes: '23'
    },
    {
      userPolicy: '',
      stakeholder_name: '고등학생',
      stakeholder_detail: '애기엄마가 윗집에 사는',
      isBenefit: false,
      description: '우습게 들릴지 모르지만, 진정한 혁명가를 이끄는 것은 위대한 사랑의 감정이다, 이런 자질이 없는 혁명가는 생각할 수 없다.',
      likes: '23'
    }
  ],
  myEffect: {},
  randomStakeholderGroupIdx: 0,
  userToken: '',
  user: {
    email: 'abcdef@kaist.ac.kr',
    expr_group: '0'
  },
  selectedStakeholder: ''
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setPolicy (state, payload) {
    state.policy = payload
  },
  setPolicyIdx (state, payload) {
    state.policyIdx = payload.policyIdx
  },
  setPredictedEffects (state, payload) {
    state.predictedEffects = payload
  },
  setMyEffect (state, payload) {
    state.myEffect = payload
  },
  setEffects (state, payload) {
    state.effects = payload
  },
  setStakeholderGroups (state, payload) {
    state.stakeholderGroups = payload
  },
  setRandomStakeholderGroup (state) {
    let stakeholderLength = state.stakeholderGroups.length
    let randomNumber = Math.floor(Math.random() * stakeholderLength)
    state.randomStakeholderGroupIdx = randomNumber
  },
  setUserToken (state, payload) {
    state.userToken = payload
  },
  setUser (state, payload) {
    state.user = payload
  }
}

export const getters = {
  randomStakeholderGroup (state) {
    return state.stakeholderGroups[state.randomStakeholderGroupIdx]
  }
}
